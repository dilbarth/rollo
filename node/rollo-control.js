var hardware = require('./rollo-simulated-platform.js');
// if (process.platform == 'darwin') {
// 	hardware = require('./rollo-simulated-platform.js');

exports.getSelectedChannel = function () {
	return hardware.getSelectedChannel();
};

exports.setSelectedChannel = function (channel) {
	return hardware.setSelectedChannel(channel);
};

exports.rolloUp = function (channel) {
	hardware.setSelectedChannel(channel);
	return hardware.rolloUp();
};

exports.rolloDown = function (channel) {
	hardware.setSelectedChannel(channel);
	return hardware.rolloDown();
};

exports.rolloStop = function (channel) {
	hardware.setSelectedChannel(channel);
	return hardware.rolloStop();
};
