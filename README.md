# btwatch
Detect of bluetooth devices get in or out of reach with `l2ping` and `node.js`

## Instalation
`npm install btwatch`

## Dependencies
Bluetooth library must be installed and turned on:

1. `apt-get install bluez`
2. `hciconfig hci0 up` (it can be at cron too: `@reboot sudo hciconfig hci0 up`)

And must be paired with watched mac address object:

1. find object: `hcitool scan`
2. pair object: `rfcomm connect 0 <objectMacAddress> 10`

## Methods

### BTWatch.watch(*macAddress*)
Start watching specified mac address.

### BTWatch.unwatch(*macAddress*)
End watching specified mac address.

### BTWatch.inRange(*macAddress*)
Check and return if specified mac address is in reach.

### BTWatch.on('change', *callback(inRange, macAddress)*)
Called if any of watched mac address changes its reach.

### BTWatch.on('change::*specifiedMacAddress*', *callback(inRange, macAddress)*)
Called if watched mac address *specifiedMacAddress* changes its reach.

## Example
```javascript
var BTWatch = require('btwatch');
var objectMacAddr = '00:F7:6F:01:02:03';

if (BTWatch.inRange(objectMacAddr)) {
  console.log('Mac address %s is in range', objectMacAddr);
} else {
  console.log('Mac address %s isnt in range', objectMacAddr);
}

BTWatch.watch(objectMacAddr);
BTWatch.on('change', function (inRange, macAddress) {
  if (inRange) {
    console.log('Mac address %s is now in range', objectMacAddr);
  } else {
    console.log('Mac address %s now leave from range', objectMacAddr);
  }
});
```
