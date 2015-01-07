GetOpt = require('node-getopt');

getOpt = new GetOpt([
  ['c' , 'count=ARG' , 'number of pulses'],
  [''  , 'pulse=ARG' , 'length of a pulse in ms'],
  [''  , 'pause=ARG' , 'length of pause between 2 pulses in ms'],
  ['p' , 'pin=ARG'   , 'pin to be toggled'],
  ['h' , 'help'      , 'display this help']
]);

// Use custom help template instead of default help
// [[OPTIONS]] is the placeholder for options list
getOpt.setHelp(
  "Usage: node toggle-to-ground.js [OPTION]\n" +
  "Specified pin will be set to true on startup.\n" +
  "\n" +
  "[[OPTIONS]]\n"
);

//debugger;

getOpt.bindHelp().parseSystem();

console.log(getOpt.parsedOption);

var rolloControl = require('./rollo-control.js');

console.log('Selected Channel = ' + rolloControl.getSelectedChannel());

rolloControl.rolloUp(2);

rolloControl.rolloDown(4);

rolloControl.rolloStop(5);

console.log('Selected Channel = ' + rolloControl.getSelectedChannel());
