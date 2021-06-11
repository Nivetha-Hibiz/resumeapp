const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: true })
router.use(bodyParser.json());
var csv = require('csv');
var app = express();
const fs = require("fs");

var colleges; 


fs.readFile('controllers/database.csv', (err, data) => {
  

console.log("[cAPi] : File read !");

	csv.parse(data, function(err, data){

	colleges = data;

	console.log("[cAPi] : CSV Loaded !");
    
  });

});




router.get('/colleges/total', function (req, res) {

	
	var result = [];	
	

	for(var i = 1 ; i < colleges.length; i++){

			
			if(!result.includes(colleges[i][1])) {
				result.push(colleges[i][1]);	
				console.log(colleges[i][1]);
			  }
						
		}
	
	res.send(JSON.stringify(result));

})


router.post('/colleges/state', function (req, res) {


	console.log(req.body.state);
	var state = req.body.state.toLowerCase();
	
	
	var result = [];	
	

	for(var i = 1 ; i < colleges.length; i++){

		if(colleges[i][1].toLowerCase().indexOf(state)>=0){		

				
			
			if(!result.includes(colleges[i][2])) {
				result.push(colleges[i][2]);	
				console.log(colleges[i][2]);
			  }
						
		}
	}

	

	

	res.send(JSON.stringify(result));

})


router.post('/colleges/district', function (req, res) {

	var district = req.body.district.toLowerCase();
	
	var result = [];	
	

	for(var i = 1 ; i < colleges.length; i++){

		if(colleges[i][2].toLowerCase().indexOf(district)>=0){	

			
			
						
			result.push(colleges[i]);				
		}
	}

	

		res.send(JSON.stringify(result));

	

	

	

})






module.exports = router;
