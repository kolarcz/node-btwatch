# node-btwatch
Detect of bluetooth devices get in or out of reach by `l2ping` and `node.js`
## Instalation
`npm install node-btwatch`
## Methods
### BTWatch.watch
Start watching specified mac address.
### BTWatch.unwatch
End watching specified mac address.
### BTWatch.inRange
Check and return if specified mac address is in reach.
### BTWatch.on('change', *callback(inRange, macAddress)*)
Called if any of watched mac address changes its reach.
### BTWatch.on('change::*specifiedMacAddress*', *callback(inRange, macAddress)*)
Called if watched mac address *specifiedMacAddress* changes its reach.
