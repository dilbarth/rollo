var selectedChannel = 1;

exports.getSelectedChannel = function () {
	return selectedChannel;
};

exports.setSelectedChannel = function (channel) {
	selectedChannel = channel;
	return selectedChannel;
};

exports.rolloUp = function () {
	console.log("Moving UP rollo of channel " + exports.getSelectedChannel());
	return exports.getSelectedChannel();
};

exports.rolloDown = function (channel) {
	console.log("Moving DOWN rollo of channel " + exports.getSelectedChannel());
	return exports.getSelectedChannel();
};

exports.rolloStop = function (channel) {
	console.log("STOPping rollo of channel " + exports.getSelectedChannel());
	return exports.getSelectedChannel();
};
