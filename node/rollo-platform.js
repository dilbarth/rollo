var gpio; // = require('rpi-gpio');
if (process.arch == 'arm') {
	gpio = require('rpi-gpio');
}
else {
	console.log("Requiring simulated gpio!!!");
	gpio = require('./rollo-sim-gpio.js');
}

var PIN_BTN_K1 = 11;
var PIN_BTN_K2 = 13;
var PIN_BTN_K3 = 15;
var PIN_BTN_UP = 16;
var PIN_BTN_STOP = 18;
var PIN_BTN_DOWN = 22;

var outputChannels = [PIN_BTN_K1, PIN_BTN_K2, PIN_BTN_K3,
					  PIN_BTN_UP, PIN_BTN_STOP, PIN_BTN_DOWN];
var selectedChannel = 1;

var PULSE_LENGTH = 70;
var PULSE_LENGTH_LONG = 500;

exports.setup = function(callback) {
	var counter = 0;
	outputChannels.forEach(function(val, index, array) {
		gpio.setup(val, gpio.DIR_OUT, function() {
			gpio.write(val, 1, function(err) {
				if (err) throw err;
				counter++;
				//console.log("pin " + val + " initialized. counter = " + counter);
				if (counter >= outputChannels.length)
					callback();
			});
		});		
	});
};

exports.close = function(callback) {
	//console.log("hardware closing...");
	exports.setSelectedChannel(1, function() {
		gpio.destroy(function() {
			console.log('All pins unexported');
			callback();
		});
	});
};

exports.getSelectedChannel = function () {
	return selectedChannel;
};

exports.setSelectedChannel = function (channel, callback) {
	var moveCount = channel - selectedChannel;
	if (moveCount == 0) {
		callback();
		return;
	}
	if (moveCount > 0) {
		exports.channelUp(moveCount, callback);
	}
	else {
		exports.channelDown(-moveCount, callback);
	}
	
	selectedChannel = channel;
	return selectedChannel;
};

exports.channelDown = function(channelCount, callback) {
	keyPress(PIN_BTN_K1, channelCount, callback);
};

exports.channelUp = function(channelCount, callback) {
	keyPress(PIN_BTN_K3, channelCount, callback);
};

exports.rolloUp = function (channel, callback) {
	console.log("Moving UP rollo of channel " + exports.getSelectedChannel());
	rolloControl(PIN_BTN_UP, channel, callback);
};

exports.rolloDown = function (channel, callback) {
	console.log("Moving DOWN rollo of channel " + exports.getSelectedChannel());
	rolloControl(PIN_BTN_DOWN, channel, callback);
};

exports.rolloStop = function (channel, callback) {
	console.log("STOPping rollo of channel " + exports.getSelectedChannel());
	rolloControl(PIN_BTN_STOP, channel, callback);
};

function rolloControl(pin, channel, callback)
{
	exports.setSelectedChannel(channel, function() {
		setTimeout(function() {
			keyPress(pin, 1, function() {
				setTimeout(callback, PULSE_LENGTH_LONG);
			});
		}, PULSE_LENGTH_LONG);
	});
};

function keyPress(pin, pressCount, callback) {
	console.log("keyPress - pin: " + pin + "  pressCount: " + pressCount);
	
	gpio.write(pin, 0, function(err) {
		if (err) throw err;
	});
	pressCount--;
			
	setTimeout(function() {
		gpio.write(pin, 1, function(err) {
			if (err) throw err;
			
			setTimeout(function() {
				if (pressCount > 0) {
					keyPress(pin, pressCount, callback);
				}
				else {
					callback();
				}
			}, PULSE_LENGTH);
		});
	}, PULSE_LENGTH);
}
