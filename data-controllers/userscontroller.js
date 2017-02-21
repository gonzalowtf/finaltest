var User= require('../models/user');
var Problem = require('../models/problem');
module.exports.create = function (req, res) {
  var user = new User(req.body);   // here the body parser works
  user.save(function (err, result) {
    res.json(result);
  });
}

module.exports.list = function (req, res) {
	var loggin = req.params.number;
	if(loggin == 0){
  User.find({username:req.params.usr,password: req.params.pass}, function (err, results) {
      res.json(results);
      
    });
  }
  else{
  	User.find({username:req.params.usr}, function (err, results) {
      res.json(results);
      
    });
  }
}
module.exports.delete = function (req,res){
  var uid = req.params.id;
  var name = req.params.username;
  User.remove({_id:uid},function(err,results){
          if(err){
              console.log("err on delete");
            }

        });
   Problem.remove({user:name},function(err,results){
          if(err){
              console.log("err on delete");
            }

        });
}