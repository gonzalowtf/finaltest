var User= require('../models/user');



module.exports.up = function(req,res){
User.findOne({username: req.body.username,password:req.body.password},function(err,results){
		req.session.userId = results._id;
		console.log("alta");
		res.send("iniciado session");
	});
}