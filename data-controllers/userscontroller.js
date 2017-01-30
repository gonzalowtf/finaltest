var User= require('../models/user');

module.exports.create = function (req, res) {
  var user = new User(req.body);   // here the body parser works
  user.save(function (err, result) {
    res.json(result);
  });
}

module.exports.list = function (req, res) {
  User.find({}, function (err, results) {
      res.json(results);
    });
  
}