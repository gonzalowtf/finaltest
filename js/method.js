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
		var Problem = $http.get('/api/problems');
		Problem.then(function (results){
			
			$scope.problemss = results.data;
			
		});
		
		$scope.problemss = [];
		$scope.problemName = function(pname,idp){
			$scope.pName =pname;
			serveProblemName.name = $scope.pName;
			serveProblemName.id = idp;
		};
		var refresh = function(){
			var Problem = $http.get('/api/problems');
		Problem.then(function (results){
			
			$scope.problemss = results.data;
			
		});
		
		$scope.problemss = [];
		};
		refresh();
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
			this.review.name = '';
			toast1();
						
		};


	}]);

	app.controller("EditDecisor",['$scope','$http',function($scope,$http){

			
			this.review = {};
			this.editD = function(){
				 

				$http.put('/api/problems',{
					name: this.review.name,
					surname: this.review.name,
					fuzzyRating : this.review.rating,
					fuzzyValue1 : this.review.v1,
					fuzzyValue2 : this.review.v2,
					fuzzyValue3 : this.review.v3
				}

				);

				$scope.problemss.put()

				//toast3() !

			}




	}]);
	app.controller("EraseProblem",['$scope','$http','serveProblemName',function($scope,$http,serveProblemName){

			
			
			$scope.pName = serveProblemName;
			$scope.eraseP = function(){
					var id = $scope.pName.id;
					console.log(id);
					$http.delete('/api/problems/'+id);
					toast5();
						
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