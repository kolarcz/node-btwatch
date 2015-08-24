# node-btwatch
Detect of bluetooth devices get in or out of reach by `l2ping` and `node.js`

## Instalation
`npm install node-btwatch`

## Dependencies
Bluetooth library must be installed and turned on:

1. `apt-get install bluez`
2. `hciconfig hci0 up`

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
