var hardware = require('./rollo-rpi-platform.js');
// if (process.arch == 'arm') {
// 	hardware = require('./rollo-rpi-platform.js');
// }
// else {
// 	hardware = require('./rollo-simulated-platform.js');
// }

exports.setup = function(callback) {
	hardware.setup(function() {
		callback();
	});	
};

exports.close = function(callback) {
	//console.log("rollo-control closing...");
	hardware.close(function() {
		callback();
	});
};

exports.getSelectedChannel = function () {
	return hardware.getSelectedChannel();
};

exports.setSelectedChannel = function(channel, callback) {
	return hardware.setSelectedChannel(channel, callback);
};

exports.rolloUp = function (channel, callback) {
	hardware.rolloUp(channel, callback);
};

exports.rolloDown = function (channel, callback) {
	hardware.rolloDown(channel, callback);
};

exports.rolloStop = function (channel, callback) {
	hardware.rolloStop(channel, callback);
};
