var Problem= require('../models/problem');

module.exports.create = function (req, res) {
  var problem = new Problem(req.body);
  problem.save(function (err, result) {
    res.json(result);
  });
}

module.exports.list = function (req, res) {
  Problem.find({}, function (err, results) {
    res.json(results);
  });
}