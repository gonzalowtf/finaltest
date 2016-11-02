var express = require("express"),
	app = express(),
	http = require("http"),
	server = http.createServer(app),
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
app.use('/metodo', express.static(__dirname + '/metodo'));


server.listen(port,function(err){
	if(err){
		console.log("could not start server");
	}
	else{
		console.log("server running at localhost:3000 or online port");
	}
});	