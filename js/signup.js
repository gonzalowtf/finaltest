(function(){
	
var app = angular.module('signup',[]);
app.service('serveUsername',[function(){
		return{
			username : ""
		}

	}]);
app.controller('SignUpController',['$scope','$http','serveUsername',function($scope,$http,serveUsername){
	$scope.refresh = function(){
			var User = $http.get('/api/users');
		User.then(function (results){
			
			$scope.users = results.data;
			
		});
		};
		$scope.refresh();
	this.review = {};
	this.newU = function(){
		if(this.review.username == "" ||this.review.username==null){
			Materialize.toast("Please enter username",3000);
		}
		else
			if(this.review.password == "" ||this.review.password==null){
				Materialize.toast("Please enter password",3000);
			}
			else
				if(this.review.password2 == "" ||this.review.password2==null){
				Materialize.toast("Please repeat password",3000);
			}
			else{
				
				if(this.review.password == this.review.password2){
					var con =0;
					for(i=0;i<$scope.users.length;i++){
						if(this.review.username == $scope.users[i].username){
							Materialize.toast("Username already exists !");
							this.review.username = "";
							this.review.password = "";
							this.review.password2 = "";
							break;
						}
						con=con+1;
					}
					if(con == $scope.users.length){
						var usr ={
							username : this.review.username,
							password : this.review.password
						};
						console.log(usr);
						$http.post('/api/users',usr);
						//location.href= "/method/method.html?y=nothing&u="+this.review.username+"&";
						serveUsername.username = this.review.username;
                        location.href= "/method/method.html";
						//console.log(serveUsername + "signup page line 57");

					}

				}
				else{
					Materialize.toast("Passwords do not match!",3000);
					this.review.password = "";
					this.review.password2 = "";
				}			
		
		
			}
}




}]);

})();