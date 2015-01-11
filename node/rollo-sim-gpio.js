// var fs           = require('fs');
var util         = require('util');
var EventEmitter = require('events').EventEmitter;
// var async        = require('async');
// var debug        = require('debug')('rpi-gpio');


function Gpio() {
//     var currentPins;
//     var exportedInputPins  = {};
//     var exportedOutputPins = {};
//     var getPinForCurrentMode = getPinRpi;
//     var pollFrequency = 5007;

    this.DIR_IN   = 'in';
    this.DIR_OUT  = 'out';
//     this.MODE_RPI = 'mode_rpi';
//     this.MODE_BCM = 'mode_bcm';

    /**
     * Set pin reference mode. Defaults to 'mode_rpi'.
     *
     * @param {string} mode Pin reference mode, 'mode_rpi' or 'mode_bcm'
     */
    this.setMode = function(mode) {
//         if (mode === this.MODE_RPI) {
//             getPinForCurrentMode = getPinRpi;
//         } else if (mode === this.MODE_BCM) {
//             getPinForCurrentMode = getPinBcm;
//         } else {
//             throw new Error('Cannot set invalid mode');
//         }

        this.emit('modeChange', mode);
    };

    /**
     * Set a custom polling frequency for watching pin changes
     *
     * @param {number} value The frequency to poll at, in milliseconds
     */
    this.setPollFrequency = function(value) {
        if (typeof value === 'number') {
            pollFrequency = value;
        }
    };

    /**
     * Setup a channel for use as an input or output
     *
     * @param {number}   channel   Reference to the pin in the current mode's schema
     * @param {string}   direction The pin direction, either 'in' or 'out'
     * @param {function} onSetup   Optional callback
     */
    this.setup = function(channel, direction, onSetup /*err*/) {
        if (arguments.length === 2 && typeof direction == 'function') {
            onSetup = direction;
            direction = this.DIR_OUT;
        }

        direction = direction || this.DIR_OUT;
        onSetup = onSetup || function() {};

        if (!channel) {
            return process.nextTick(function() {
                onSetup(new Error('Channel must be a number'));
            });
        }

        if (direction !== this.DIR_IN && direction !== this.DIR_OUT) {
            return process.nextTick(function() {
                onSetup(new Error('Cannot set invalid direction'));
            });
        }

//         var pinForSetup;
//         async.waterfall([
//             setRaspberryVersion,
//             function(next) {
//                 pinForSetup = getPinForCurrentMode(channel);
//                 if (!pinForSetup) {
//                     return next(new Error('Channel ' + channel + ' does not map to a GPIO pin'));
//                 }
//                 debug('set up pin %d', pinForSetup);
//                 isExported(pinForSetup, next);
//             },
//             function(isExported, next) {
//                 if (isExported) {
//                     return unexportPin(pinForSetup, next);
//                 }
//                 return next(null);
//             },
//             function(next) {
//                 exportPin(pinForSetup, next);
//             },
//             function(next) {
//                 this.emit('export', channel);
//                 createListener.call(this, channel, pinForSetup);
// 
//                 if (direction === this.DIR_IN) {
//                     exportedInputPins[pinForSetup] = true;
//                 } else {
//                     exportedOutputPins[pinForSetup] = true;
//                 }
// 
//                 setDirection(pinForSetup, direction, next);
//             }.bind(this)
//         ], onSetup);
onSetup(null);
    };

    /**
     * Write a value to a channel
     *
     * @param {number}   channel The channel to write to
     * @param {boolean}  value   If true, turns the channel on, else turns off
     * @param {function} cb      Optional callback
     */
    this.write = this.output = function(channel, value, cb /*err*/ ) {
//         var pin = getPinForCurrentMode(channel);
// 
//         if (!exportedOutputPins[pin]) {
//             var message;
//             if (exportedInputPins[pin]) {
//                 message = 'Pin has been exported for input so cannot be written to';
//             } else {
//                 message = 'Pin has not been exported';
//             }
// 
//             return process.nextTick(function() {
//                 cb(new Error(message));
//             });
//         }
// 
//         value = (!!value && value !== '0') ? '1' : '0';
//         fs.writeFile(PATH + '/gpio' + pin + '/value', value, cb || function () {});
cb(null);
    };

    /**
     * Read a value from a channel
     *
     * @param {number}   channel The channel to read from
     * @param {function} cb      Callback which receives the channel's boolean value
     */
    this.read = this.input = function(channel, cb /*err,value*/) {
//         var pin = getPinForCurrentMode(channel);
// 
//         if (!exportedInputPins[pin]) {
//             return process.nextTick(function() {
//                 cb(new Error('Pin has not been exported'));
//             });
//         }
// 
//         fs.readFile(PATH + '/gpio' + pin + '/value', 'utf-8', function(err, data) {
//             data = (data + '').trim() || '0';
//             return cb(err, data === '1');
//         });
cb(null, 0);
    };

    /**
     * Unexport any pins setup by this module
     *
     * @param {function} cb Optional callback
     */
    this.destroy = function(cb) {
//         var tasks = Object.keys(exportedOutputPins)
//             .concat(Object.keys(exportedInputPins))
//             .map(function(pin) {
//                 return function(done) {
//                     unexportPin(pin, done);
//                 }
//             });
// 
//         async.parallel(tasks, cb);
cb(null);
    };

    /**
     * Reset the state of the module
     */
    this.reset = function() {
//         exportedOutputPins = {};
//         exportedInputPins  = {};
//         this.removeAllListeners();
// 
//         currentPins = undefined;
//         getPinForCurrentMode = getPinRpi;
//         pollFrequency = 5007;
    };

    // Init
    EventEmitter.call(this);
    this.reset();


//     Private functions requring access to state
//     function setRaspberryVersion(cb) {
//         if (currentPins) {
//             return cb(null);
//         }
// 
//         fs.readFile('/proc/cpuinfo', 'utf8', function(err, data) {
//             if (err) return cb(err);
// 
//             Match the last 4 digits of the number following "Revision:"
//             var match = data.match(/Revision\s*:\s*[0-9a-f]*([0-9a-f]{4})/);
//             var revisionNumber = parseInt(match[1], 16);
//             var pinVersion = (revisionNumber < 4) ? 'v1' : 'v2';
// 
//             debug(
//                 'seen hardware revision %d; using pin mode %s',
//                 revisionNumber,
//                 pinVersion
//             );
// 
//             currentPins = PINS[pinVersion];
// 
//             return cb(null);
//         });
//     };
// 
//     function getPinRpi(channel) {
//         return currentPins[channel] + '';
//     };
// 
//     function getPinBcm(channel) {
//         channel = parseInt(channel, 10);
//         return [
//             3,
//             5,
//             7,
//             8,
//             10,
//             11,
//             12,
//             13,
//             15,
//             16,
//             18,
//             19,
//             21,
//             22,
//             23,
//             24,
//             26,
//             29,
//             31,
//             32,
//             33,
//             35,
//             36,
//             37,
//             38,
//             40
//         ].indexOf(channel) !== -1 ? (channel + '') : null;
//     };
// 
//     function createListener(channel, pin) {
//         debug('listen for pin %d', pin);
//         var Gpio = this;
//         fs.watchFile(
//             PATH + '/gpio' + pin + '/value',
//             { persistent: true, interval: pollFrequency },
//             function(current, previous) {
//                 if (current.mtime > previous.mtime) {
//                     Gpio.read(channel, function(err, value) {
//                         debug(
//                             'failed to read value after a change on channel %d',
//                             channel
//                         );
//                         Gpio.emit('change', channel, value);
//                     });
//                 }
//             }
//         );
//     };
}
util.inherits(Gpio, EventEmitter);

// function setDirection(pin, direction, cb) {
//     debug('set direction %s on pin %d', direction.toUpperCase(), pin);
//     fs.writeFile(PATH + '/gpio' + pin + '/direction', direction, function(err) {
//         if (cb) return cb(err);
//     });
// }
// 
// function exportPin(pin, cb) {
//     debug('export pin %d', pin);
//     fs.writeFile(PATH + '/export', pin, function(err) {
//         if (cb) return cb(err);
//     });
// }
// 
// function unexportPin(pin, cb) {
//     debug('unexport pin %d', pin);
//     fs.unwatchFile(PATH + '/gpio' + pin + '/value');
//     fs.writeFile(PATH + '/unexport', pin, function(err) {
//         if (cb) return cb(err);
//     });
// }
// 
// function isExported(pin, cb) {
//     fs.exists(PATH + '/gpio' + pin, function(exists) {
//         return cb(null, exists);
//     });
// }

module.exports = new Gpio;
