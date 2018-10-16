var EventEmitter = require('events').EventEmitter;
var Spawn = require('child_process').spawn;


function BTWatch () {
  EventEmitter.call(this);
  this.macAddresses = {};
}


BTWatch.prototype = {

  __proto__: EventEmitter.prototype,

  maxPingAttempts: 5,
  maxPingSeconds: 5,

  set: function (maxPingAttempts, maxPingSeconds) {
    if (maxPingAttempts !== undefined) {
      if (maxPingAttempts !== parseInt(maxPingAttempts, 10) || maxPingAttempts <= 0) {
        throw new Error('maxPingAttempts param needs to be integer and bigger than 0');
      } else {
        this.maxPingAttempts = maxPingAttempts;
      }
    }
    if (maxPingSeconds !== undefined) {
      if (maxPingSeconds !== parseInt(maxPingSeconds, 10) || maxPingSeconds <= 0) {
        throw new Error('maxPingSeconds param needs to be integer and bigger than 0');
      } else {
        this.maxPingSeconds = maxPingSeconds;
      }
    }
  },

  watch: function (macAddress) {
    if (typeof this.macAddresses[macAddress] === 'undefined') {
      this.macAddresses[macAddress] = '?';
      this.check_(macAddress);
    }
  },

  unwatch: function (macAddress) {
    delete this.macAddresses[macAddress];
  },

  check_: function (macAddress) {
    this.inRangeCheck_(macAddress, function (macAddress, inRange) {
      if (typeof this.macAddresses[macAddress] !== 'undefined') {
        if (this.macAddresses[macAddress] !== inRange) {
          this.macAddresses[macAddress] = inRange;
          this.emit('change::all', this.macAddresses);
          this.emit('change::' + macAddress, inRange, macAddress);
          this.emit('change', inRange, macAddress);
        }
        setTimeout(function(){this.check_(macAddress);}.bind(this), inRange ? 5000 : 0);
      }
    }.bind(this));
  },

  inRangeCheck_: function (macAddress, callback, prevCntFails) {
    prevCntFails = prevCntFails || 0;

    var ls = Spawn('l2ping', ['-c', '1', '-t', String(this.maxPingSeconds), macAddress]);
    var result = '';

    ls.stdout.on('data', function (data) {
      result += data;
    });

    ls.on('close', function () {
      var inRange = Boolean(String(result).match(' time '));

      if (inRange) {
        callback(macAddress, true);
      } else if(++prevCntFails < this.maxPingAttempts) {
        this.inRangeCheck_(macAddress, callback, prevCntFails);
      } else {
        callback(macAddress, false);
      }
    }.bind(this));
  },

  inRange: function (macAddress) {
    return this.macAddresses[macAddress];
  }

};


module.exports = new BTWatch();
