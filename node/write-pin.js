var gpio = require('rpi-gpio');

//process.argv.forEach(function (val, index, array) {
//  console.log(index + ': ' + val);
//});

if (process.argv.length < 4) {
    // arg0: node; arg1:js-file
    console.log('I need 2 arguments: channel and value, like: 7 1 or 7 0');
    process.exit();
}

var pin = parseInt(process.argv[2], 10);
var value = parseInt(process.argv[3], 10) != 0;

console.log('Writing to pin ' + pin + ' value ' + value);

gpio.setup(pin, gpio.DIR_OUT, write);

function write() {
    gpio.write(pin, value, function(err) {
        if (err) throw err;
        console.log('Written to pin');
        process.exit();
    });
}

