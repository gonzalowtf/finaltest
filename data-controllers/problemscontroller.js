var Problem= require('../models/problem');

module.exports.create = function (req, res) {
  var problem = new Problem(req.body);   // here the body parser works
  problem.save(function (err, result) {
    res.json(result);
  });
}

module.exports.list = function (req, res) {
  Problem.find({}, function (err, results) {
    res.json(results);
  });
}
module.exports.delete = function (req, res) {
  var pid = req.params.id;
  //console.log(pid + " problem id recived on server");
  Problem.remove({_id:pid}, function (err, results) {
    //console.log("data successfully erased");    
  });
}
module.exports.update = function (req, res) {
  var pid = req.params.id;
  //console.log(pid + " problem id recived on server");
  Problem.findById(pid, function (err, results) {
      if(err){
        console.log("err on update");
      } 
      //console.log(req.body.name);
      results.name= req.body.name;
      //console.log(req.body.name);
      results.save(function (err, result) {
        res.json(result);
        //console.log("data successfully updated"); 
      });
  });
}