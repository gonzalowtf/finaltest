var express = require("express"),
	app = express(),
	http = require("http"),
	server = http.createServer(app),
	mongoclient = require('mongodb').MongoClient,
	mongoose = require('mongoose'),
	assert = require('assert'),
	bodyparser = require('body-parser'),
	port = process.env.PORT || 3000;


app.use(bodyparser());

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



server.listen(port,function(err){
	if(err){
		console.log("could not start server");
	}
	else{
		console.log("server running at localhost:3000 or online port");
	}
});


var url = 'mongodb://localhost:27017/datafuzzy';	




mongoclient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  db.close();
});



mongoose.connect(url);