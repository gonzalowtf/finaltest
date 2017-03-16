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
	session = require("express-session"),
	cookieParser = require('cookie-parser'),
	cookieSession = require('cookie-session')
  morgan = require('morgan'),
	expressValidator = require('express-validator'),
  MongoStore = require('connect-mongo')(session),
  //csrf = require('csurf'),
  passport = require('passport'),
  flash = require('connect-flash'),
	port = process.env.PORT || 3000;



//var csrfProtecction = csrf();
//app.use(csrfProtecction);
app.use(morgan('combined'));

var User= require('./models/user');

    //app.use(csrfProtecction());
		app.use(bodyparser());
		app.use(bodyparser.json());
		app.use(bodyparser.urlencoded({extended : false}));
		app.use(expressValidator());
		app.use(cookieParser());
		/*app.use(cookieSession({
			key : "fuzzy.sess",
			secret: "fuzzy secret"
		}));*/
		app.use(session({
			secret: "asdasdasdnasdnan7868767868767867sd",
      resave: false,
      saveUninitialized:false,
      store : new MongoStore({
        mongooseConnection : mongoose.connection
      })
      //cookie:{maxAge: 867400}

		}));
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(function(req,res,next){
      res.locals.isLogged = req.isAuthenticated;
      res.locals.session = req.session;
      next();

    });


app.use('/files', express.static(__dirname + '/files'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/fonts', express.static(__dirname + '/fonts'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/method', express.static(__dirname + '/method'));
app.use('/models', express.static(__dirname + '/models'));
app.use('/data-controllers', express.static(__dirname + '/data-controllers'));

//app.use(bodyparser.json());


//------------------------------------ manejo de sesiones----------------------



//-----------------------------------------------------------------------------



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


app.get('/', function(req, res) {
          //console.log(req.url);  actual direction
          res.sendfile(__dirname + '/index.html');
          //res.end("hello world!");

      });
			app.post('/sessions', function(req,res,next){


				if(req.body.destroy == 0){
			User.findOne({username: req.body.username,password:req.body.password},function(err,results){
					req.session.user_id = results._id;
					req.session.username = results.username;
					req.session.save();
			    res.status(200).send(req.session);
					res.end();
				});
			}
			else{
			  if(req.body.destroy == 1){
			    req.session.destroy();
					flag = false;

			  }

			}
			//next();

			});



app.get('/method', function(req, res) {
          //console.log(req.url);  actual direction
          var retry = 1;

							if(req.session.username){
		          	res.sendfile(__dirname + '/method/method.html');

		      		}

								//res.sendfile(__dirname + '/method/loading.html');
							else{
      						res.sendfile(__dirname + '/method/loggin.html');
      			}



      });
app.get('/login', function(req, res) {
          //console.log(req.url);  actual direction
          console.log('session login?' + req.session.username);
          console.log('session login?' + req.session.user_id);
          if(req.session.username){
          	  res.sendfile(__dirname + '/method/method.html');

          }
          else{
          res.sendfile(__dirname + '/method/loggin.html');
          //res.end("hello world!");
      		}
      });
app.get('/signup', function(req, res,next) {
          //console.log(req.url);  actual direction
          console.log('session signup?' + req.session.username);
          console.log('session signup?' + req.session.user_id);
          if(req.session.username){
          	  res.sendfile(__dirname + '/method/method.html');

          }
          else{
          res.sendfile(__dirname + '/method/signup.html');
          //res.end("hello world!");
      		}
      });
app.get('/sessions',function(req,res){
        if(req.session.username){
             User.findOne({username: req.session.username,_id: req.session.user_id},function(err, results){
              if(err){
                console.log(" Error !!! line 83" + err);
              }
              console.log(results);
              //res.sendfile(__dirname + '/method/method.html');
							res.json(results);
             });

      		}
      	else{
      		res.sendfile(__dirname + '/method/loggin.html');
          //res.end("hello world!");
      			}
});
//----------------------------------------------------------------------------------
//---------------------getting , posting and deleting ---------------------


app.get('/api/problems/:usr', pController.list);
app.post('/api/problems', pController.create);
app.delete('/api/problems/:id',pController.delete);
app.put('/api/problems/:id',pController.update);
//app.put('/api/problems/:id/decisors/:id',pController.updateDecisor);
//---------------------------------users---------------------------------
app.get('/api/users/:usr/:pass/:number', uController.list);
app.post('/api/users', uController.create);
app.delete('/api/users/:id/:username',uController.delete);
//app.put('/api/users/:id',uController.update);
//-------------------------------------------------------------------------
// -------------------------------Sessions---------------------------------
