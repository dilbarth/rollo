var gpio = require('rpi-gpio');
Getopt = require('node-getopt');

getopt = new Getopt([
  ['c' , 'count=ARG' , 'number of pulses'],
  [''  , 'pulse=ARG' , 'length of a pulse in ms'],
  [''  , 'pause=ARG' , 'length of pause between 2 pulses in ms'],
  ['p' , 'pin=ARG'   , 'pin to be toggled'],
  ['h' , 'help'      , 'display this help']
]);

// Use custom help template instead of default help
// [[OPTIONS]] is the placeholder for options list
getopt.setHelp(
  "Usage: node toggle-to-ground.js [OPTION]\n" +
  "Specified pin will be set to true on startup.\n" +
  "\n" +
  "[[OPTIONS]]\n"
);

getopt.bindHelp().parseSystem();

console.log(getopt.parsedOption);

var pulseCount = parseInt(getopt.parsedOption.options.count);
if (isNaN(pulseCount)) pulseCount = 1;
var pulseLength = parseInt(getopt.parsedOption.options.pulse);
if (isNaN(pulseLength)) pulseLength = 10;
var pauseLength = parseInt(getopt.parsedOption.options.pause);
if (isNaN(pauseLength)) pauseLength = 10;
var pin = parseInt(getopt.parsedOption.options.pin);
if (isNaN(pin)) pin = 11;
var value = true;

var period = pulseLength + pauseLength;
var count = 0;

console.log("PulseCount:  " + pulseCount);
console.log("PulseLength: " + pulseLength);
console.log("PauseLength: " + pauseLength);
console.log("Pin:         " + pin);

//getopt.showHelp();
//process.argv.forEach(function (val, index, array) {
//  console.log(index + ': ' + val);
//});

gpio.setup(pin, gpio.DIR_OUT, function() {
	setInterval(processPeriod, period);
	// initial period
	processPeriod();
});

function processPeriod() {
	gpio.write(pin, 0, function(err) {
		if (err) throw err;
	});
			
	setTimeout(function() {
		gpio.write(pin, 1, function(err) {
			if (err) throw err;
			pulseCount--;
			if (pulseCount <= 0) {
				process.exit(0);
			}
		});
	}, pauseLength);
}
	
// function write(p, v) {
// 	console.log('writing ' + v + ' to pin ' + pin);
//     gpio.write(p, v, function(err) {
//         if (err) throw err;
//     });
// }
