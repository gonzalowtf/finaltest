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
              if(results.decisors[i]._id ==req.body._id){
                for(j=0;j<results.selectionsCriterias.length;j++){
                  if(results.selectionsCriterias[j].decisorId ==req.body._id ){
                      results.selectionsCriterias.splice(j,1);
                  }
                  
                }
                for(j=0;j<results.selectionsAlternatives.length;j++){
                  if(results.selectionsAlternatives[j].decisorId ==req.body._id ){
                      results.selectionsAlternatives.splice(j,1);
                  }
                  
                }
                results.decisors.splice(i,1);
                results.nd = results.nd -1;
                results.save(function (err, result) {
                     res.json(result);
                      //console.log("decisor successfully updated"); 
                   });

                 break;
              }
            }
           }
            if(req.body.action == "add"){
                  
                  var newD = {
                    name: req.body.name,
                    surname :req.body.surname,
                    fuzzyRating : findDecisorRating(req.body.fuzzyRating),
                    fuzzyValue1 : req.body.fuzzyValue1,
                    fuzzyValue2 : req.body.fuzzyValue2,
                    fuzzyValue3 : req.body.fuzzyValue3

                  };
                  //console.log(newD);
                  results.decisors.push(newD);
                  results.nd = results.nd +1;
                  results.save(function (err, result) {
                     res.json(result);
                      //console.log("decisor successfully added"); 
                   });

                         
           
                }
    }
      else
        if(req.body.type == "criteria"){
          //console.log("decisor info update request");
          if(req.body.action == "edit"){
            var len = results.criterias.length;
            //console.log("decisor q:"+len);
            for(i =0; i < len;i++ ){
                if(results.criterias[i]._id ==req.body._id ){
                  //console.log(results.decisors[i].name);
                  results.criterias[i].name = req.body.name;
                  //console.log(results.decisors[i].name);
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
          if(req.body.action == "erase"){
             var len = results.criterias.length;
            //console.log("decisor q:"+len);
            for(i=0;i<len;i++){
              if(results.criterias[i]._id ==req.body._id){
                for(j=0;j<results.selectionsCriterias.length;j++){
                for(z=0;z<results.selectionsCriterias[j].comparations.length;z++){
                    if(results.selectionsCriterias[j].comparations[z]._id ==req.body._id ){
                      results.selectionsCriterias[j].comparations.splice(z,1);
                        }
                  }
                
                  if(results.selectionsCriterias[j].criteriaId ==req.body._id ){
                      results.selectionsCriterias.splice(j,1);
                  }
                  
                  
                
                }
                results.criterias.splice(i,1);
                results.nc = results.nc -1;
                               
                results.save(function (err, result) {
                     res.json(result);
                      //console.log("decisor successfully updated"); 
                   });

                 break;
              }
            }

          }
          if(req.body.action == "add"){
                  
                  var newC = {
                    name: req.body.name,
                    fuzzyRating : findCriteriaRating(req.body.fuzzyRating),
                    fuzzyValue1 : req.body.fuzzyValue1,
                    fuzzyValue2 : req.body.fuzzyValue2,
                    fuzzyValue3 : req.body.fuzzyValue3

                  };
                  //console.log(newC);
                  results.criterias.push(newC);
                  results.nc = results.nc +1;
                  results.save(function (err, result) {
                     res.json(result);
                      //console.log("criteria successfully added"); 
                   });

                         
           
                }
        }
        else
          if(req.body.type =="alternative"){
             //console.log("decisor info update request");
             if(req.body.action == "edit"){
            var len = results.alternatives.length;
            //console.log("decisor q:"+len);
            for(i =0; i < len;i++ ){
                if(results.alternatives[i]._id ==req.body._id ){
                  //console.log(results.decisors[i].name);
                  results.alternatives[i].name = req.body.name;
                  //console.log(results.decisors[i].name);
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

            if(req.body.action == "erase"){
                 var len = results.alternatives.length;
            //console.log("decisor q:"+len);
            for(i=0;i<len;i++){
              if(results.alternatives[i]._id ==req.body._id){
                for(j=0;j<results.selectionsAlternatives.length;j++){
                  if(results.selectionsAlternatives[j].alternativeId ==req.body._id ){
                      results.selectionsAlternatives.splice(j,1);
                  }
                  
                }
                results.alternatives.splice(i,1);
                results.na = results.na -1;
                results.save(function (err, result) {
                     res.json(result);
                      //console.log("decisor successfully updated"); 
                   });

                 break;
              }
            }
            }
             if(req.body.action == "add"){
                  
                  var newA = {
                    name: req.body.name,
                    fuzzyRating : findAlternativeRating(req.body.fuzzyRating),
                    fuzzyValue1 : req.body.fuzzyValue1,
                    fuzzyValue2 : req.body.fuzzyValue2,
                    fuzzyValue3 : req.body.fuzzyValue3

                  };
                  //console.log(newA);
                  results.alternatives.push(newA);
                  results.na = results.na +1;
                  results.save(function (err, result) {
                     res.json(result);
                      //console.log("alternative successfully added"); 
                   });

                         
           
                }
          }
          else
          if(req.body.type =="selectionsCriterias"){
            if(req.body.action == "edit"){
              //console.log(req.body.decisorId);
              //console.log(req.body.criteriaId);
              //console.log(req.body.comparations);
              for(i =0;i< results.selectionsCriterias.length;i++){
                    if(results.selectionsCriterias[i].criteriaId == req.body.criteriaId){
                      if(results.selectionsCriterias[i].decisorId == req.body.decisorId){
                        results.selectionsCriterias.splice(i,1);
                        /*results.save(function (err, result) {
                            res.json(result);
                            console.log("erased match" + result);
                                                  });*/
                        break;
                      } 
                    }
                  }
                  

            
              var newCComparations = {
                    decisorId :req.body.decisorId,
                    criteriaId: req.body.criteriaId,
                    comparations: req.body.comparations
              };
            results.selectionsCriterias.push(newCComparations);
            results.save(function (err, result) {
                     res.json(result);
                   });
            }
          }
          else
            if(req.body.type =="selectionsAlternatives"){
            if(req.body.action == "edit"){
              //console.log(req.body.decisorId);
              //console.log(req.body.alternativeId);
               for(i =0;i< results.selectionsAlternatives.length;i++){
                    if(results.selectionsAlternatives[i].alternativeId == req.body.alternativeId){
                      if(results.selectionsAlternatives[i].criteriaId ==  req.body.criteriaId){
                      if(results.selectionsAlternatives[i].decisorId == req.body.decisorId){
                        results.selectionsAlternatives.splice(i,1);
                        /*results.save(function (err, result) {
                            res.json(result);
                            console.log("erased match" + result);
                                                  });*/
                        break;
                      }
                      } 
                    }
                  }
              var newAChoose = {
                    decisorId :req.body.decisorId,
                    criteriaId: req.body.criteriaId,
                    alternativeId: req.body.alternativeId,
                    fuzzyRating: req.body.fuzzyRating,
                    fuzzyValue1 :req.body.fuzzyValue1,
                    fuzzyValue2 : req.body.fuzzyValue2,
                    fuzzyValue3 : req.body.fuzzyValue3


              };
              console.log(newAChoose);
            results.selectionsAlternatives.push(newAChoose);
            results.save(function (err, result) {
                     res.json(result);
                      console.log("escribio");
                   });
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
function getCComparations(coll){
  for(i =0;i< coll.length ;i++){
     coll[i].criteriaId = coll[i]._id;
     coll[i].fuzzyRating = findCriteriaRating(coll[i].fuzzyRating);
  }
  return coll;
}
function getAComparations(coll){
  for(i =0;i< coll.length ;i++){
     coll[i].alternativeId = coll[i]._id;
     coll[i].fuzzyRating = findAlternativeRating(coll[i].fuzzyRating);
  }
  return coll;
}
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
        if(fuzzyRating == "*"){
          rating = "*";
        }
        if(fuzzyRating == "(-1,-1,-1)"){
          rating = "*";
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
function findV1Decisor(fuzzyRating){
    if(fuzzyRating == "(0,0,4)"){
      return 0;
    }
    if(fuzzyRating == "(2,5,8)"){
          return 2;
        }
        if(fuzzyRating == "(5,8,10)"){
          return 5;
        }
        if(fuzzyRating == "(8,10,10)"){
          return 8;
        }
  }
  function findV2Decisor(fuzzyRating){
    if(fuzzyRating == "(0,0,4)"){
      return 0;
    }
    if(fuzzyRating == "(2,5,8)"){
          return 5;
        }
        if(fuzzyRating == "(5,8,10)"){
          return 8;
        }
        if(fuzzyRating == "(8,10,10)"){
          return 10;
        }
  }
  function findV3Decisor(fuzzyRating){
    if(fuzzyRating == "(0,0,4)"){
      return 4;
    }
    if(fuzzyRating == "(2,5,8)"){
          return 8;
        }
        if(fuzzyRating == "(5,8,10)"){
          return 10;
        }
        if(fuzzyRating == "(8,10,10)"){
          return 10;
        }
  }
 function findV1Criteria(fuzzyRating){
  if(fuzzyRating == "(0,1,2)"){
          return 0;
        }
        if(fuzzyRating == "(1,2,3)"){
      return 1;       
     }
        if(fuzzyRating == "(2,3,4)"){
          return 2;
        }
        if(fuzzyRating == "(3,4,5)"){
          return 3;
        }
        if(fuzzyRating == "(3,5,7)"){
          return 3;
        }
        if(fuzzyRating == "(5,6,7)"){
          return 5;
        }
        if(fuzzyRating == "(6,7,8)"){
          return 6;
        }
        if(fuzzyRating == "(7,8,9)"){
         return 7;
        }
        if(fuzzyRating == "(8,9,10)"){
         return 8;
        }
 }
 function findV2Criteria(fuzzyRating){
  if(fuzzyRating == "(0,1,2)"){
          return 1;
        }
        if(fuzzyRating == "(1,2,3)"){
      return 2;       
     }
        if(fuzzyRating == "(2,3,4)"){
          return 3;
        }
        if(fuzzyRating == "(3,4,5)"){
          return 4;
        }
        if(fuzzyRating == "(3,5,7)"){
          return 5;
        }
        if(fuzzyRating == "(5,6,7)"){
          return 6;
        }
        if(fuzzyRating == "(6,7,8)"){
          return 7;
        }
        if(fuzzyRating == "(7,8,9)"){
         return 8;
        }
        if(fuzzyRating == "(8,9,10)"){
         return 9;
        }
 }

 function findV3Criteria(fuzzyRating){
  if(fuzzyRating == "(0,1,2)"){
          return 2;
        }
        if(fuzzyRating == "(1,2,3)"){
      return 3;       
     }
        if(fuzzyRating == "(2,3,4)"){
          return 4;
        }
        if(fuzzyRating == "(3,4,5)"){
          return 5;
        }
        if(fuzzyRating == "(3,5,7)"){
          return 7;
        }
        if(fuzzyRating == "(5,6,7)"){
          return 7;
        }
        if(fuzzyRating == "(6,7,8)"){
          return 8;
        }
        if(fuzzyRating == "(7,8,9)"){
         return 9;
        }
        if(fuzzyRating == "(8,9,10)"){
         return 10;
        }
 }
 function findV1Alternative(fuzzyRating){
  if(fuzzyRating == "(0,0,1)"){
          return 0;
        }
        if(fuzzyRating == "(0,1,3)"){
          return 0;
        }
        if(fuzzyRating == "(1,3,5)"){
          return 1;
        }
        if(fuzzyRating == "(3,5,7)"){
          return 3;
        }
        if(fuzzyRating == "(5,7,9)"){
          return 5;
        }
        if(fuzzyRating == "(7,9,10)"){
          return 7;
        }
        if(fuzzyRating == "(9,10,10)"){
          return 9;
        }
 }
  function findV2Alternative(fuzzyRating){
  if(fuzzyRating == "(0,0,1)"){
          return 0;
        }
        if(fuzzyRating == "(0,1,3)"){
          return 1;
        }
        if(fuzzyRating == "(1,3,5)"){
          return 3;
        }
        if(fuzzyRating == "(3,5,7)"){
          return 5;
        }
        if(fuzzyRating == "(5,7,9)"){
          return 7;
        }
        if(fuzzyRating == "(7,9,10)"){
          return 9;
        }
        if(fuzzyRating == "(9,10,10)"){
          return 10;
        }
 }
 function findV3Alternative(fuzzyRating){
  if(fuzzyRating == "(0,0,1)"){
          return 1;
        }
        if(fuzzyRating == "(0,1,3)"){
          return 3;
        }
        if(fuzzyRating == "(1,3,5)"){
          return 5;
        }
        if(fuzzyRating == "(3,5,7)"){
          return 7;
        }
        if(fuzzyRating == "(5,7,9)"){
          return 9;
        }
        if(fuzzyRating == "(7,9,10)"){
          return 10;
        }
        if(fuzzyRating == "(9,10,10)"){
          return 10;
        }
 }