(function(){

	var app = angular.module('fuzzy',[]);
	app.service('serveProblemName', [function () 
		{
			return {
				name: "",
				id: ""
			};
		}]);
	app.controller("ProblemsController",['$scope','$http','serveProblemName',function($scope,$http,serveProblemName){
		//$scope.problemss = problems;
		$scope.refresh = function(){
			var Problem = $http.get('/api/problems');
		Problem.then(function (results){
			
			$scope.problemss = results.data;
			
		});
		};
		$scope.refresh();
		
		
		$scope.problemss = [];
		$scope.problemName = function(pname,idp){
			$scope.pName =pname;
			serveProblemName.name = $scope.pName;
			serveProblemName.id = idp;
		};
		
		
		$scope.problemss = [];

		$scope.decisorId = function(decisorid,decisorname,decisorsurname,decisorfuzzyrating){
			$scope.did = decisorid;
			$scope.dname = decisorname;
			$scope.dsurname = decisorsurname;
			$scope.dfuzzyrating = decisorfuzzyrating;
		}
		$scope.criteriaId = function(criteriaid,criterianame,criteriafuzzyrating){
			$scope.cid = criteriaid;
			$scope.cname = criterianame;
			$scope.cfuzzyrating = criteriafuzzyrating;
		}
		$scope.alternativeId = function(alternativeid,alternativename,alternativefuzzyrating){
			$scope.aid = alternativeid;
			$scope.aname = alternativename;
			$scope.afuzzyrating = alternativefuzzyrating;
		}
		
	}]);

	app.controller("Tables",function(){

		this.selected = 1;
		this.problem = "";
		this.isSelected = function(tab){
			this.selected = tab;
			console.log(this.selected);
		};
		
		
	});

	app.controller("NewProblem",['$scope','$http' ,function($scope,$http){
		this.review = {};
		this.review.nd = 4;
		this.review.nc = 4;
		this.review.na = 8;
		
		this.newP = function(){
			//console.log(this.review.nd);
			$http.post('/api/problems',{
					name: this.review.name,
					nd: this.review.nd,
					nc: this.review.nc,
					na: this.review.na,
					decisors : generateD(this.review.nd),
					criterias : generateC(this.review.nc),
					alternatives: generateA(this.review.na)
					
				}
				);

			$scope.problemss.push(
				{
					name: this.review.name,
					nd: this.review.nd,
					nc: this.review.nc,
					na: this.review.na,
					decisors : generateD(this.review.nd),
					criterias : generateC(this.review.nc),
					alternatives: generateA(this.review.na)
					
				}
				);
				
			$scope.refresh();
			this.review.name = '';
			toast1();
						
		};


	}]);

	app.controller("EditDecisor",['$scope','$http','serveProblemName',function($scope,$http,serveProblemName){

			
			this.review = {};
			$scope.pName = serveProblemName;
			this.editD = function(){
				var v1 = findV1Decisor(this.review.rating);
				var v2 = findV2Decisor(this.review.rating);
				var v3 = findV3Decisor(this.review.rating);
				var len = $scope.problemss.length;
				$scope.refresh();
				 for(i =0;i<len;i++){
						var key = $scope.problemss[i]._id;
						if(key == $scope.pName.id ){
							if(this.review.name == null){
							this.review.name = $scope.dname;
								}
						if(this.review.surname == null){
							this.review.surname = $scope.dsurname;
							}
							var len2 = $scope.problemss[i].decisors.length;
							//$scope.did
							$scope.refresh();
							for(j= 0;j<len2;j++){
								if($scope.did == $scope.problemss[i].decisors[j]._id){
									$http.put('/api/problems/' +$scope.pName.id ,{
									type: "decisor",
									action: "edit",
									_id:  $scope.did,
									name: this.review.name,
									surname: this.review.surname,
									fuzzyRating : this.review.rating,
									fuzzyValue1 : v1,
									fuzzyValue2 : v2,
									fuzzyValue3 : v3
							});
							 $scope.refresh();
							toast3();
							this.review = {};
							}
							}
						}
					}
				
					
			}




	}]);
	app.controller("EditCriteria",['$scope','$http','serveProblemName',function($scope,$http,serveProblemName){

			
			this.review = {};
			$scope.pName = serveProblemName;
			this.editC = function(){
				var v1 = findV1Criteria(this.review.rating);
				var v2 = findV2Criteria(this.review.rating);
				var v3 = findV3Criteria(this.review.rating);
				var len = $scope.problemss.length;
				$scope.refresh();
				 for(i =0;i<len;i++){
						var key = $scope.problemss[i]._id;
						if(key == $scope.pName.id ){
							if(this.review.name == null){
							this.review.name =$scope.cname;
								}
							var len2 = $scope.problemss[i].criterias.length;
							//$scope.did
							$scope.refresh();
							for(j= 0;j<len2;j++){
								if($scope.cid == $scope.problemss[i].criterias[j]._id){
									$http.put('/api/problems/' +$scope.pName.id ,{
									type: "criteria",
									action: "edit",
									_id:  $scope.cid,
									name: this.review.name,
									fuzzyRating : this.review.rating,
									fuzzyValue1 : v1,
									fuzzyValue2 : v2,
									fuzzyValue3 : v3
							});
							 $scope.refresh();
							toast7();
							this.review = {};
							
								}
							}
						}
					}
				
					
			}




	}]);
	app.controller("EditAlternative",['$scope','$http','serveProblemName',function($scope,$http,serveProblemName){

			
			this.review = {};
			$scope.pName = serveProblemName;
			this.editA = function(){
				var v1 = findV1Alternative(this.review.rating);
				var v2 = findV2Alternative(this.review.rating);
				var v3 = findV3Alternative(this.review.rating);
				var len = $scope.problemss.length;
				$scope.refresh();
				 for(i =0;i<len;i++){
						var key = $scope.problemss[i]._id;
						if(key == $scope.pName.id ){
							if(this.review.name == null){
							this.review.name = $scope.aname;
								}
							var len2 = $scope.problemss[i].alternatives.length;
							//$scope.did
							$scope.refresh();
							for(j= 0;j<len2;j++){
								if($scope.aid == $scope.problemss[i].alternatives[j]._id){
									$http.put('/api/problems/' +$scope.pName.id ,{
									type: "alternative",
									action : "edit",
									_id:  $scope.aid,
									name: this.review.name,
									fuzzyRating : this.review.rating,
									fuzzyValue1 : v1,
									fuzzyValue2 : v2,
									fuzzyValue3 : v3
							});
							 $scope.refresh();
							toast8();
							this.review = {};
								}
							}
						}
					}
				
					
			}




	}]);
	app.controller("EraseProblem",['$scope','$http','serveProblemName',function($scope,$http,serveProblemName){

			
			
			$scope.pName = serveProblemName;
			$scope.eraseP = function(){
					
					var id = $scope.pName.id;
					$http.delete('/api/problems/'+id);
					$scope.refresh();
					toast5();
					$scope.refresh();
					
									

			}
	}]);
	app.controller("EditProblem",['$scope','$http','serveProblemName',function($scope,$http,serveProblemName){

				
			$scope.pName = serveProblemName;
			$scope.editP= function(){
					var id = $scope.pName.id;
					var req ={name:$scope.pName.name};
					$http.put('/api/problems/'+id,req);
					toast6();
					$scope.refresh();
					var len = $scope.problemss.length;
					for(i =0;i<len;i++){
						var key = $scope.problemss[i].id;
						if(key == $scope.pName.id ){
							$scope.problemss[i].push({name: $scope.pName.name});
						}
					}
					$scope.refresh();
					$scope.pName.name = "";
			}
	}]);


	app.controller("EraseDecisor",['$scope','$http','serveProblemName',function($scope,$http,serveProblemName){

			
			
			$scope.pName = serveProblemName;
			this.eraseD = function(){
					$scope.refresh();
					var len = $scope.problemss.length;
					for(i =0;i<len;i++){
						var key = $scope.problemss[i]._id;
						if(key == $scope.pName.id ){
							var len2 = $scope.problemss[i].decisors.length;
							//$scope.did
							$scope.refresh();
							for(j= 0;j<len2;j++){
								if($scope.did == $scope.problemss[i].decisors[j]._id){
									$http.put('/api/problems/' +$scope.pName.id ,{
									type: "decisor",
									action : "erase",
									_id:  $scope.did,
									
							});
							 	$scope.refresh();
								toast2();
								break;

							
								}
							}
						}
					}
									
									

			}
	}]);

app.controller("EraseCriteria",['$scope','$http','serveProblemName',function($scope,$http,serveProblemName){
			$scope.pName = serveProblemName;
			this.eraseC = function(){
					$scope.refresh();
					var len = $scope.problemss.length;
					for(i =0;i<len;i++){
						var key = $scope.problemss[i]._id;
						if(key == $scope.pName.id ){
							var len2 = $scope.problemss[i].criterias.length;
							//$scope.did
							$scope.refresh();
							for(j= 0;j<len2;j++){
								if($scope.cid == $scope.problemss[i].criterias[j]._id){
									$http.put('/api/problems/' +$scope.pName.id ,{
									type: "criteria",
									action : "erase",
									_id:  $scope.cid,
									
							});
							 	$scope.refresh();
								toast9();
								break;

							
								}
							}
						}
					}
									
									

			}
	}]);	
app.controller("EraseAlternative",['$scope','$http','serveProblemName',function($scope,$http,serveProblemName){
			$scope.pName = serveProblemName;
			this.eraseA = function(){
					$scope.refresh();
					var len = $scope.problemss.length;
					for(i =0;i<len;i++){
						var key = $scope.problemss[i]._id;
						if(key == $scope.pName.id ){
							var len2 = $scope.problemss[i].alternatives.length;
							//$scope.did
							$scope.refresh();
							for(j= 0;j<len2;j++){
								if($scope.aid == $scope.problemss[i].alternatives[j]._id){
									$http.put('/api/problems/' +$scope.pName.id ,{
									type: "alternative",
									action : "erase",
									_id:  $scope.aid,
									
							});
							 	$scope.refresh();
								toast10();
								break;

							
								}
							}
						}
					}
									
									

			}
	}]);


	function generateD(nd){
		var data = [];
		var des =0;
		while(des < nd){
			data.push({
				name: "d"+(des+1),
				surname: "",
				fuzzyRating: "Important",
				fuzzyValue1 : 2,
				fuzzyValue2 : 5,
				fuzzyValue3: 8 
			});
			des=des+1;
		} 
		
		
		return data;
	}
	function generateC(nc){
		var data = [];
		var cri =0;
		while(cri < nc){
			data.push({
				name: "c"+(cri+1),
				fuzzyRating: "Same Importance",
				fuzzyValue1 : 0,
				fuzzyValue2 : 1,
				fuzzyValue3: 2 
			});
			cri=cri+1;
		} 
		
		
		return data;
	}
	function generateA(na){
		var data = [];
		var alt =0;
		while(alt < na){
			data.push({
				name: "a"+(alt+1),
				fuzzyRating: "Medium",
				fuzzyValue1 : 3,
				fuzzyValue2 : 5,
				fuzzyValue3: 7
			});
			alt=alt+1;
		} 
		
		
		return data;
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
	
	

})();