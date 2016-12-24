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
  Problem.remove({_id:pid},function(err,results){
          if(err){
              console.log("err on delete");
            }

        });
  }
module.exports.update = function (req, res) {
  var pid = req.params.id;
  //console.log(pid + " problem id recived on server");
  Problem.findById(pid, function (err, results) {
      if(err){
        console.log("err on update");
      } 
      //console.log(req.body);
      if(req.body.type == "decisor"){
            if(req.body.action == "edit"){
            //console.log("decisor info update request");
            var len = results.decisors.length;
            //console.log("decisor q:"+len);
            for(i =0; i < len;i++ ){
                if(results.decisors[i]._id ==req.body._id ){
                  //console.log(results.decisors[i].name);
                  results.decisors[i].name = req.body.name;
                  //console.log(results.decisors[i].name);
                  results.decisors[i].surname = req.body.surname;
                  results.decisors[i].fuzzyRating = findDecisorRating(req.body.fuzzyRating);
                  //console.log(results.decisors[i].fuzzyRating);
                  results.decisors[i].fuzzyValue1 = req.body.fuzzyValue1;
                  results.decisors[i].fuzzyValue2 = req.body.fuzzyValue2;
                  results.decisors[i].fuzzyValue3 = req.body.fuzzyValue3;
                  results.save(function (err, result) {
                     res.json(result);
                      //console.log("decisor successfully updated"); 
                   });
                }
              }
                       }
           if(req.body.action == "erase"){
             var len = results.decisors.length;
            //console.log("decisor q:"+len);
            for(i=0;i<len;i++){
              if(results.decisors[i]._id ==req.body._id ){
                console.log("match");

                // aca falta la eliminacion
                 results.save(function (err, result) {
                     res.json(result);
                      //console.log("decisor successfully updated"); 
                   });
              }
            }
           }            
           
      }
      else
        if(req.body.type == "criteria"){
          //console.log("decisor info update request");
            var len = results.criterias.length;
            //console.log("decisor q:"+len);
            for(i =0; i < len;i++ ){
                if(results.criterias[i]._id ==req.body._id ){
                  //console.log(results.decisors[i].name);
                  results.criterias[i].name = req.body.name;
                  //console.log(results.decisors[i].name);
                  results.criterias[i].fuzzyRating = findCriteriaRating(req.body.fuzzyRating);
                  //console.log(results.decisors[i].fuzzyRating);
                  results.criterias[i].fuzzyValue1 = req.body.fuzzyValue1;
                  results.criterias[i].fuzzyValue2 = req.body.fuzzyValue2;
                  results.criterias[i].fuzzyValue3 = req.body.fuzzyValue3;
                  results.save(function (err, result) {
                     res.json(result);
                      //console.log("decisor successfully updated"); 
                   });
                }

                       }
        }
        else
          if(req.body.type =="alternative"){
             //console.log("decisor info update request");
            var len = results.alternatives.length;
            //console.log("decisor q:"+len);
            for(i =0; i < len;i++ ){
                if(results.alternatives[i]._id ==req.body._id ){
                  //console.log(results.decisors[i].name);
                  results.alternatives[i].name = req.body.name;
                  //console.log(results.decisors[i].name);
                  results.alternatives[i].fuzzyRating = findAlternativeRating(req.body.fuzzyRating);
                  //console.log(results.decisors[i].fuzzyRating);
                  results.alternatives[i].fuzzyValue1 = req.body.fuzzyValue1;
                  results.alternatives[i].fuzzyValue2 = req.body.fuzzyValue2;
                  results.alternatives[i].fuzzyValue3 = req.body.fuzzyValue3;
                  results.save(function (err, result) {
                     res.json(result);
                      //console.log("decisor successfully updated"); 
                   });
                }

                       }
          }
      else{
      results.name= req.body.name;
      //console.log(req.body.name + "just a problem name change request");
      results.save(function (err, result) {
        res.json(result);
        //console.log("data successfully updated"); 
      });
      }
      /*results.save(function (err, result) {
        res.json(result);
        //console.log("data successfully updated"); 
      });*/
  });
}
/*module.exports.updateDecisor = function (req, res) {
  var pid = req.params.id;
  //console.log(pid + " problem id recived on server");
  Problem.findById(pid, function (err, results) {
      if(err){
        console.log("err on update");
      } 
      //console.log(req.body.name);
      
      results.decisors[req.body.index] = req.body
      //console.log(req.body.name);
      results.save(function (err, result) {
        res.json(result);
        console.log("decisor info successfully updated"); 
      });
  });
}
*/

function findDecisorRating(fuzzyRating){
        var rating = "";
        if(fuzzyRating == "(2,5,8)"){
          rating = "Important";
        }
        if(fuzzyRating == "(0,0,4)"){
          rating = "Normal";
        }
        if(fuzzyRating == "(5,8,10)"){
          rating = "Very Important";
        }
        if(fuzzyRating == "(8,10,10)"){
          rating = "Most Important";
        }
          return rating;
}
function findCriteriaRating(fuzzyRating){
        var rating = "";
        if(fuzzyRating == "(0,1,2)"){
          rating = "Same Importance";
        }
        if(fuzzyRating == "(1,2,3)"){
          rating = "Weak Importance";
        }
        if(fuzzyRating == "(2,3,4)"){
          rating = "Light Importance";
        }
        if(fuzzyRating == "(3,4,5)"){
          rating = "Importance between light and accentuated";
        }
        if(fuzzyRating == "(3,5,7)"){
          rating = "Importance Accentuated";
        }
        if(fuzzyRating == "(5,6,7)"){
          rating = "Strong Importance";
        }
        if(fuzzyRating == "(6,7,8)"){
          rating = "Very Strong Importance";
        }
        if(fuzzyRating == "(7,8,9)"){
          rating = "Extremely Strong Importance";
        }
        if(fuzzyRating == "(8,9,10)"){
          rating = "Absolute Importance";
        }
          return rating;
}
function findAlternativeRating(fuzzyRating){
        var rating = "";
        if(fuzzyRating == "(0,0,1)"){
          rating = "Extremely Low";
        }
        if(fuzzyRating == "(0,1,3)"){
          rating = "Very Low";
        }
        if(fuzzyRating == "(1,3,5)"){
          rating = "Low";
        }
        if(fuzzyRating == "(3,5,7)"){
          rating = "Medium";
        }
        if(fuzzyRating == "(5,7,9)"){
          rating = "High";
        }
        if(fuzzyRating == "(7,9,10)"){
          rating = "Very High";
        }
        if(fuzzyRating == "(9,10,10)"){
          rating = "Extremely High";
        }
        
          return rating;
}