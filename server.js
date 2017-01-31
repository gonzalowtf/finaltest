var express = require("express"),
	app = express(),
	http = require("http"),
	server = http.createServer(app),
	mongoclient = require('mongodb').MongoClient,
	mongoose = require('mongoose'),
	assert = require('assert'),
	bodyparser = require('body-parser'),
	pController = require('./data-controllers/problemscontroller.js'),
	uController = require('./data-controllers/userscontroller.js'),
	port = process.env.PORT || 3000;




app.get('/', function(req, res) {
          //console.log(req.url);  actual direction
     
          res.sendfile(__dirname + '/index.html');  
          //res.end("hello world!");    
      
      });

app.use('/files', express.static(__dirname + '/files'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/fonts', express.static(__dirname + '/fonts'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/method', express.static(__dirname + '/method'));
app.use('/models', express.static(__dirname + '/models'));
app.use('/data-controllers', express.static(__dirname + '/data-controllers'));
app.use(bodyparser());
//app.use(bodyparser.json());





//------------------------Server listening at port 3000--------------------
server.listen(port,function(err){
	if(err){
		console.log("could not start server");
	}
	else{
		console.log("server running at localhost:3000 or online port");
	}
});

//--------------------------------------------------------------------------
//------------------------------Data Base Connection--------------------------


var url = 'mongodb://localhost:27017/datafuzzy';	
var url2 = "mongodb://hutter:cancer29@ds133438.mlab.com:33438/datafuzzy"; 


/*
// connection with mongoclient
mongoclient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server with mongoclient");

  db.close();
});
*/


// connection with mongoose



mongoose.connect(url2,function(err){
	assert.equal(null, err);
  console.log("Connected successfully to server with mongoose");
});



//----------------------------------------------------------------------------------
//---------------------getting , posting and deleting ---------------------


app.get('/api/problems/:usr', pController.list);
app.post('/api/problems', pController.create);
app.delete('/api/problems/:id',pController.delete);
app.put('/api/problems/:id',pController.update);
//app.put('/api/problems/:id/decisors/:id',pController.updateDecisor);
//---------------------------------users---------------------------------
app.get('/api/users', uController.list);
app.post('/api/users', uController.create);
//app.delete('/api/users/:id',uController.delete);
//app.put('/api/users/:id',uController.update);
//-------------------------------------------------------------------------