(function(){
	
var app = angular.module('logg',[]);

app.controller("UserController",['$scope','$http',function($scope,$http){
	$scope.refresh = function(){
			var User = $http.get('/api/users');
		User.then(function (results){
			
			$scope.users = results.data;
			
		});
		};
		$scope.refresh();


	this.review ={};
	this.getIn = function(){
		if(this.review.username == "" ||this.review.username==null){
			Materialize.toast("Please enter username",3000);
		}
		else
			if(this.review.password == "" ||this.review.password==null){
				Materialize.toast("Please enter password",3000);
			}
			else{
				var con = 0;
					for(i =0; i< $scope.users.length;i++){
						  if(this.review.username == $scope.users[i].username){
						  	
						  		if(this.review.password ==$scope.users[i].password){
						  			location.href= "/method/method.html?y=nothing&u="+this.review.username+"&";
						  			break;
						  		}else{
						  			Materialize.toast("Wrong password!",3000);
						  			this.review.password = "";
						  			break;
						  		}
						  }
						  con = con+1;
						}
						console.log(con);
						if(con == $scope.users.length){
							Materialize.toast("Username does not exist!",3000);		
							this.review.username = "";
							this.review.password = "";
							}
				}
		
	};


}]);



})();