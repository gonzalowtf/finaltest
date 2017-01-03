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
			for(i =0; i< $scope.problemss.length;i++){
				//console.log($scope.problemss[i].criterias);
				$scope.criterias = $scope.problemss[i].criterias;
				$scope.decisors =$scope.problemss[i].decisors;

			}

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
		$scope.getCName = function(pid,id){
			var name = "";
			for(i =0; i< $scope.problemss.length;i++){
				//console.log(pid);
				//console.log($scope.problemss[i]._id);
				if(pid ==$scope.problemss[i]._id){
					//console.log("in");
					for(j=0;j<$scope.problemss[i].criterias.length;j++){
						if(id ==$scope.problemss[i].criterias[j]._id){
								//console.log("in 2");
								name = $scope.problemss[i].criterias[j].name;
								break;
									}
					}
					
				}
				
			}
			return name;
		};
		$scope.getAName = function(pid,id){
			var name = "";
			for(i =0; i< $scope.problemss.length;i++){
				//console.log(pid);
				//console.log($scope.problemss[i]._id);
				if(pid ==$scope.problemss[i]._id){
					//console.log("in");
					for(j=0;j<$scope.problemss[i].alternatives.length;j++){
						if(id ==$scope.problemss[i].alternatives[j]._id){
								//console.log("in 2");
								name = $scope.problemss[i].alternatives[j].name;
								break;
									}
					}
					
				}
				
			}
			return name;
		};
		$scope.decisorId = function(decisorid,decisorname,decisorsurname,decisorfuzzyrating){
			$scope.did = decisorid;
			$scope.dname = decisorname;
			$scope.dsurname = decisorsurname;
			$scope.dfuzzyrating = decisorfuzzyrating;
		}
		$scope.criteriaId = function(criteriaid,criterianame){
			$scope.cid = criteriaid;
			$scope.cname = criterianame;

			for(i =0; i< $scope.problemss.length;i++){
				//console.log($scope.problemss[i].criterias);
				$scope.criterias = $scope.problemss[i].criterias;
				$scope.decisors =$scope.problemss[i].decisors;
				$scope.selectionsCriterias =$scope.problemss[i].selectionsCriterias;

			}
			/*$scope.criterias = $http.get('/api/problems/',{
				problemID :$scope.pName.id,
				getType: "criterias"
			});*/
			
		}
		$scope.alternativeId = function(alternativeid,alternativename){
			$scope.aid = alternativeid;
			$scope.aname = alternativename;
			for(i =0; i< $scope.problemss.length;i++){
				//console.log($scope.problemss[i].criterias);
				$scope.decisors =$scope.problemss[i].decisors;
				$scope.selectionsAlternatives =$scope.problemss[i].selectionsAlternatives;
				// this las line have no use yet

			}
			
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
					alternatives: generateA(this.review.na),

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
							if(this.review.name == null || this.review.name == "" ){
							this.review.name = $scope.dname;
								}
						if(this.review.surname == null || this.review.surname =="" ){
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
									
							});
									var selectionsCriterias = [];
									selectionsCriterias = $scope.criterias.slice(0);
									for(z=0;z < selectionsCriterias.length;z++){
										if(selectionsCriterias[z]._id == $scope.cid){
											selectionsCriterias[z].fuzzyRating = "*";
											selectionsCriterias[z].fuzzyValue1 = -1;
 											selectionsCriterias[z].fuzzyValue2 = -1;
 											selectionsCriterias[z].fuzzyValue3 = -1;

										}
										else{


										if(selectionsCriterias[z].fuzzyRating == null || selectionsCriterias[z].fuzzyRating == ""){
											selectionsCriterias[z].fuzzyRating = "(0,1,2)";
											selectionsCriterias[z].fuzzyValue1 = 0;
											selectionsCriterias[z].fuzzyValue2 = 1;
											selectionsCriterias[z].fuzzyValue3 = 2;
											}
											selectionsCriterias[z].fuzzyValue1= findV1Criteria(selectionsCriterias[z].fuzzyRating);
										selectionsCriterias[z].fuzzyValue2= findV2Criteria(selectionsCriterias[z].fuzzyRating);
										selectionsCriterias[z].fuzzyValue3= findV3Criteria(selectionsCriterias[z].fuzzyRating);
										selectionsCriterias[z].fuzzyRating= findCriteriaRating(selectionsCriterias[z].fuzzyRating);
										}
										
								}

									//console.log(selectionsCriterias);
									var request = {
									type: "selectionsCriterias",
									action: "edit",
									criteriaId:  $scope.cid,
									decisorId: this.review.decisor,
									comparations: selectionsCriterias
																	
									}
									//console.log(request);
									$http.put('/api/problems/' +$scope.pName.id ,request);
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
									
							});

									
									if(this.review.fuzzyRating == null || this.review.fuzzyRating == ""){
										this.review.fuzzyRating = "(3,5,7)"
									}

								
									var request = {
									type: "selectionsAlternatives",
									action: "edit",
									alternativeId:  $scope.aid,
									decisorId: this.review.decisor,
									fuzzyRating : findAlternativeRating(this.review.fuzzyRating),
									fuzzyValue1: findV1Alternative(this.review.fuzzyRating),
									fuzzyValue2: findV2Alternative(this.review.fuzzyRating),
									fuzzyValue3: findV3Alternative(this.review.fuzzyRating)

																	
									}
									//console.log(request);
									$http.put('/api/problems/' +$scope.pName.id ,request);

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
	app.controller("ViewCriterias",['$scope','$http','serveProblemName',function($scope,$http,serveProblemName){

			this.review = {};
			this.selections =[];			
			$scope.pName = serveProblemName;
			this.viewC = function(){
				this.selections =[];
				for(i =0; i< $scope.problemss.length;i++){
					if($scope.problemss[i]._id == $scope.pName.id){
						for(j=0;j<$scope.problemss[i].selectionsCriterias.length;j++){
							var pid = $scope.problemss[i]._id;
							if($scope.problemss[i].selectionsCriterias[j].decisorId == this.review.decisor){
							//console.log("llegue 369");
							if($scope.problemss[i].selectionsCriterias[j].criteriaId == this.review.criteria){
								//console.log("llegue 370");
								var compp = $scope.problemss[i].selectionsCriterias[j].comparations.slice(0);
								//console.log(compp);
								for(z=0;z<compp.length;z++){
								var newCView = {
								name :$scope.getCName(pid,compp[z]._id),
								fuzzyRating : compp[z].fuzzyRating,
								fuzzyValue1 : compp[z].fuzzyValue1,
								fuzzyValue2 : compp[z].fuzzyValue2,
								fuzzyValue3 : compp[z].fuzzyValue3
								}
								//console.log(newCView);
								this.selections.push(newCView);
								}
							}
							break;
							this.review = {};
						}
					}
				}
			}
			};
	}]);
	app.controller("ViewAlternatives",['$scope','$http','serveProblemName',function($scope,$http,serveProblemName){

			this.review = {};
			$scope.pName = serveProblemName;
			this.selections =[];
			this.viewA = function(){
				this.selections = [];
				for(i =0; i< $scope.problemss.length;i++){
					if($scope.problemss[i]._id == $scope.pName.id){
						var pid = $scope.problemss[i]._id
						var compp = $scope.problemss[i].selectionsAlternatives.slice(0);
						console.log(compp);
						for(j=0;j<compp.length;j++){
							if(compp[j].decisorId == this.review.decisor){
													
								var newAView = {
								name :$scope.getAName(pid,compp[j]._id),
								fuzzyRating : compp[j].fuzzyRating,
								fuzzyValue1 : compp[j].fuzzyValue1,
								fuzzyValue2 : compp[j].fuzzyValue2,
								fuzzyValue3 : compp[j].fuzzyValue3
								}
								//console.log(newAView);
								this.selections.push(newAView);
								
							
						}
					}
					break
					this.review = {};
				}
			}
			};
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

app.controller("AddDecisor",['$scope','$http','serveProblemName',function($scope,$http,serveProblemName){

			
			this.review = {};
			$scope.pName = serveProblemName;
			this.addD = function(){
					$scope.refresh();
					var len = $scope.problemss.length;
					for(i =0;i<len;i++){
						var key = $scope.problemss[i]._id;
						if(key == $scope.pName.id ){
							
							
							$http.put('/api/problems/' +$scope.pName.id ,{
									type: "decisor",
									action : "add",
									name: this.review.name,
									surname: this.review.surname,
									fuzzyRating : this.review.fuzzyRating,
									fuzzyValue1 : findV1Decisor(this.review.fuzzyRating),
									fuzzyValue2 : findV2Decisor(this.review.fuzzyRating),
									fuzzyValue3 : findV3Decisor(this.review.fuzzyRating)

							});
							
							this.review = {};
							toast4();
							$scope.refresh();
							break;
						}
					}
									
									

			}
	}]);
app.controller("AddCriteria",['$scope','$http','serveProblemName',function($scope,$http,serveProblemName){

			
			this.review = {};
			$scope.pName = serveProblemName;
			this.addC = function(){
					$scope.refresh();
					var len = $scope.problemss.length;
					for(i =0;i<len;i++){
						var key = $scope.problemss[i]._id;
						if(key == $scope.pName.id ){
							
							
							$http.put('/api/problems/' +$scope.pName.id ,{
									type: "criteria",
									action : "add",
									name: this.review.name,
									fuzzyRating : this.review.fuzzyRating,
									fuzzyValue1 : findV1Criteria(this.review.fuzzyRating),
									fuzzyValue2 : findV2Criteria(this.review.fuzzyRating),
									fuzzyValue3 : findV3Criteria(this.review.fuzzyRating)

							});
							
							this.review = {};
							toast11();
							$scope.refresh();
							break;
						}
					}
									
									

			}
	}]);
app.controller("AddAlternative",['$scope','$http','serveProblemName',function($scope,$http,serveProblemName){

			
			this.review = {};
			$scope.pName = serveProblemName;
			this.addA = function(){
					$scope.refresh();
					var len = $scope.problemss.length;
					for(i =0;i<len;i++){
						var key = $scope.problemss[i]._id;
						if(key == $scope.pName.id ){
							
							
							$http.put('/api/problems/' +$scope.pName.id ,{
									type: "alternative",
									action : "add",
									name: this.review.name,
									fuzzyRating : this.review.fuzzyRating,
									fuzzyValue1 : findV1Alternative(this.review.fuzzyRating),
									fuzzyValue2 : findV2Alternative(this.review.fuzzyRating),
									fuzzyValue3 : findV3Alternative(this.review.fuzzyRating)

							});
							
							this.review = {};
							toast12();
							$scope.refresh();
							break;
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
				name: "c"+(cri+1)
				
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
				name: "a"+(alt+1)
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