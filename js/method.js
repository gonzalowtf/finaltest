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

		$scope.decisorId = function(decisorid){
			$scope.did = decisorid;
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
				var v1 = parseInt(this.review.rating[1]);
				var v2 = parseInt(this.review.rating[3]);
				var v3 = parseInt(this.review.rating[5]);
				var len = $scope.problemss.length;
				 console.log($scope.did);
				 for(i =0;i<len;i++){
						var key = $scope.problemss[i].id;
						console.log("vuelta :"+i +" "+$scope.pName.id);
						if(key == $scope.pName.id ){
							var len2 =$scope.problemss[i].decisors.length;
							console.log(len2);

							
							for(j=0;j<len2;j++){
								var key2= $scope.problemss[i].decisors[j];
								if(key2 ==$scope.did){
									$http.put('/api/problems/' +$scope.pName.id +'/'+ $scope.did,{
									name: this.review.name,
									surname: this.review.name,
									fuzzyRating : this.review.rating,
									fuzzyValue1 : v1,
									fuzzyValue2 : v2,
									fuzzyValue3 : v3
							});
							$scope.problemss[i].decisors[j].push({
									name: this.review.name,
									surname: this.review.name,
									fuzzyRating : this.review.rating,
									fuzzyValue1 : v1,
									fuzzyValue2 : v2,
									fuzzyValue3 : v3
							});
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
					console.log(id);
					$http.delete('/api/problems/'+id);
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

	

})();