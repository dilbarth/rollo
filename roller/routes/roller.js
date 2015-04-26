var express = require('express');
var router = express.Router();

// GET users listing.
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

// POST to Roller Up 
router.post('/up', function(req, res) {
    // var db = req.db;
    // db.collection('userlist').insert(req.body, function(err, result){
    //     res.send(
    //         (err === null) ? { msg: '' } : { msg: err }
    //     );
    // });
	//console.log("Up".blue);
	console.log("UP requested!")
	res.send({ msg: "going up" });
});

// POST to Roller Down
router.post('/down', function(req, res) {
    // var db = req.db;
    // db.collection('userlist').insert(req.body, function(err, result){
    //     res.send(
    //         (err === null) ? { msg: '' } : { msg: err }
    //     );
    // });
	//console.log("Down".green);
	console.log("DOWN requested!")
	res.send({ msg: "going down" });
});

module.exports = router;
