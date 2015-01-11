GetOpt = require('node-getopt');

getOpt = new GetOpt([
  ['c' , 'channel=ARG' , 'channel to be processed'],
  ['u' , 'up'          , 'rollo shall go up'],
  ['s' , 'stop'        , 'rollo shall stop'],
  ['d' , 'down'        , 'rollo shall go down'],
  ['h' , 'help'        , 'display this help']
]);

// Use custom help template instead of default help
// [[OPTIONS]] is the placeholder for options list
getOpt.setHelp(
  "Usage: node rollo-node-client.js [OPTION]\n" +
  "\n" +
  "[[OPTIONS]]\n"
);

//debugger;

getOpt.bindHelp().parseSystem();

console.log(getOpt.parsedOption);

var channel = parseInt(getOpt.parsedOption.options.channel);
if (isNaN(channel)) channel = 5;

var rolloControl = require('./rollo-control.js');

function terminate() {
	rolloControl.close(function() {
		process.exit(0);
	});
}

rolloControl.setup(function() {
	if (getOpt.parsedOption.options.stop) {
		rolloControl.rolloStop(channel, terminate);
	}
	else if (getOpt.parsedOption.options.up) {
		rolloControl.rolloUp(channel, terminate);
	}
	else if (getOpt.parsedOption.options.down) {
		rolloControl.rolloDown(channel, terminate);
	}
});

// setTimeout(function() {
// 	//console.log("closing...");
// 	rolloControl.close(function() {
// 		process.exit(0);
// 	});
// }, 1000);
