(function(){

	var app = angular.module('fuzzy',[]);
	app.service('serveProblemName', [function ()
		{
			return {
				name: "",
				description: "",
				id: ""
			};
		}]);
	app.service('serveUsername',[function(){
		return{
			username : ""
		}

	}]);

app.controller("UserController",['$scope','$http','serveUsername',function($scope,$http,serveUsername){
	this.review = {};
	this.getIn = function(){
		if(this.review.username == "" ||this.review.username==null){
			Materialize.toast("Please enter username",3000);
		}
		else
			if(this.review.password == "" ||this.review.password==null){
				Materialize.toast("Please enter password",3000);
			}
			else{
					var user = $http.get('/api/users/'+this.review.username+'/'+this.review.password+'/0');
					var u = this.review.username;
					var p = this.review.password;
					user.then(function(results){

						if(results.data.length ==0){
								Materialize.toast("Username or password incorrect",3000);


							}
						else{
						var session ={
							username:u,
							password:p,
							destroy: 0
						};
						$http.post('/sessions',session);
						Materialize.toast("Done !",2000);
						location.href = '/method/loading.html';
					}


					});
					this.review = {};

		}
	};

}]);

app.controller('SignUpController',['$scope','$http','serveUsername',function($scope,$http,serveUsername){


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
					var u = this.review.username;
					var p = this.review.password;
					var user = $http.get('/api/users/'+this.review.username+'/'+this.review.password+'/1');
					user.then(function(results){

						if(results.data.length == 0){
							var usr ={
										username : u,
										password : p
								};
							$http.post('/api/users',usr);
							Materialize.toast("User created !",1000);
							location.href = "/login";
						}
						else{
							Materialize.toast("Username already exists !",3000);

						}


					});

					this.review = {};

				}
				else{
					Materialize.toast("Passwords do not match!",3000);
					this.review.password = "";
					this.review.password2 = "";
				}


			}
}




}]);

	app.controller("ProblemsController",['$scope','$http','serveProblemName','serveUsername',function($scope,$http,serveProblemName,serveUsername){
		//$scope.problemss = problems;



         $scope.refresh = function(){
		        var User = $http.get('/sessions');
					User.then(function(user){


		        var Problem = $http.get('/api/problems/'+user.data.username);
				Problem.then(function (results){
					$scope.username =user.data.username;
					$scope.userID = user.data._id;
					$scope.problemss = results.data;
					/*for(i =0; i< $scope.problemss.length;i++){
						//console.log($scope.problemss[i].criterias);
						$scope.criterias = $scope.problemss[i].criterias;
						$scope.decisors =$scope.problemss[i].decisors;

					}
					*/
					});

		});
		};

		$scope.refresh();
		Materialize.toast("Welcome !",4000);


		$scope.problemss = [];
		$scope.problemName = function(pname,pdescription,idp){
			$scope.pName =pname;
			$scope.pDesc = pdescription;
			serveProblemName.name = $scope.pName;
			serveProblemName.description = $scope.pDesc;
			serveProblemName.id = idp;
			for(i =0; i< $scope.problemss.length;i++){
				//console.log($scope.problemss[i].criterias);
				if($scope.problemss[i]._id == idp ){
				$scope.criterias = $scope.problemss[i].criterias;
				$scope.selectionsCriterias =$scope.problemss[i].selectionsCriterias;
				$scope.selectionsCriterias =$scope.problemss[i].selectionsCriterias;
				$scope.selectionsAlternatives =$scope.problemss[i].selectionsAlternatives;
				$scope.decisors =$scope.problemss[i].decisors;
			}
			else{
			}
			}

			$scope.results = [];
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

			/*for(i =0; i< $scope.problemss.length;i++){
				//console.log($scope.problemss[i].criterias);
				$scope.criterias = $scope.problemss[i].criterias;
				$scope.decisors =$scope.problemss[i].decisors;
				$scope.selectionsCriterias =$scope.problemss[i].selectionsCriterias;

			}*/
			/*$scope.criterias = $http.get('/api/problems/',{
				problemID :$scope.pName.id,
				getType: "criterias"
			});*/

		}
		$scope.alternativeId = function(alternativeid,alternativename){
			$scope.aid = alternativeid;
			$scope.aname = alternativename;
			/*for(i =0; i< $scope.problemss.length;i++){
				//console.log($scope.problemss[i].criterias);
				$scope.decisors =$scope.problemss[i].decisors;
				$scope.selectionsAlternatives =$scope.problemss[i].selectionsAlternatives;
				// this las line have no use yet

			}
			*/

		}
		$scope.destroySession = function(){
			var session ={
							username: 'asdasdasdasd',
							password: ' asjndajnsdjnajsdnasjndjasndnas',
							destroy: 1
						};
						$http.post('/sessions',session);
			location = "/login";
		};
		$scope.destroySession2 = function(){
			var session ={
							username: 'asdasdasdasd',
							password: ' asjndajnsdjnajsdnasjndjasndnas',
							destroy: 1
						};
						$http.post('/sessions',session);

			$http.delete('/api/users/'+$scope.userID+'/'+$scope.username);
			location = "/login";
		};

		$scope.method = function(){
			var len = $scope.problemss.length;
			var CWeights = [];
			$scope.pName = serveProblemName;
			for(z= 0; z< len;z++){
				if($scope.pName.id == $scope.problemss[z]._id){
					var k = $scope.problemss[z].decisors.length;
					var lenCriterias = $scope.problemss[z].criterias.length;
					for(i= 0;i<k;i++){
						var idd = $scope.problemss[z].decisors[i]._id;
						var n = $scope.problemss[z].selectionsCriterias.length;
						for(selCindex = 0;selCindex<n;selCindex++){
							if(idd == $scope.problemss[z].selectionsCriterias[selCindex].decisorId){
								var idc = $scope.problemss[z].selectionsCriterias[selCindex].criteriaId;
								var lenCom = $scope.problemss[z].selectionsCriterias[selCindex].comparations.length;
								var acv1 = 1;
								var acv2 = 1;
								var acv3 = 1;
								for(comIndex =0; comIndex< lenCom; comIndex++){
									if($scope.problemss[z].selectionsCriterias[selCindex].comparations[comIndex]._id == idc || $scope.problemss[z].selectionsCriterias[selCindex].comparations[comIndex].fuzzyValue1==-1 ){
										//nada
									}
									else{
										var fv1 = $scope.problemss[z].selectionsCriterias[selCindex].comparations[comIndex].fuzzyValue1;
										var fv2 = $scope.problemss[z].selectionsCriterias[selCindex].comparations[comIndex].fuzzyValue2;
										var fv3 = $scope.problemss[z].selectionsCriterias[selCindex].comparations[comIndex].fuzzyValue3;
										acv1 = acv1 * fv1;
										acv2 = acv2 * fv2;
										acv3 = acv3 * fv3;

									}
								}
								if(acv1 ==0){
									acv1 = 0.0001;
								}

								var sqrt1 = raizN(acv1,lenCriterias);
								var sqrt2 = raizN(acv2,lenCriterias);
								var sqrt3 = raizN(acv3,lenCriterias);
								var decisorSelection = {
									decisorId : idd,
									criteriaId: idc,
									w1:sqrt1,
									w2: sqrt2,
									w3: sqrt3
								}
								//console.log(decisorSelection);
								CWeights.push(decisorSelection);

							}

						}

					}

				}

			}
			var sum1 = 0;
			var sum2 = 0;
			var sum3 = 0;
			var idda = "--";
			for(CWindex = 0; CWindex<CWeights.length;CWindex++){
				var idd = CWeights[CWindex].decisorId;
				if(idda == idd){
					//nada
					//console.log("match");

				}
				else{
				sum1 = 0;
				sum2 = 0;
				sum3 = 0;
				for(CWindex2 =0; CWindex2<CWeights.length;CWindex2++){
					var idd2 = CWeights[CWindex2].decisorId;
					if(idd == idd2){
						sum1=sum1+CWeights[CWindex2].w1;
						sum2=sum2+CWeights[CWindex2].w2;
						sum3=sum3+CWeights[CWindex2].w3;
					}
				}
			}
				/*console.log(sum1);
				console.log(sum2);
				console.log(sum3);*/
				idda = idd;
				var w1 =  CWeights[CWindex].w1;
				var w2 =  CWeights[CWindex].w2;
				var w3 =  CWeights[CWindex].w3;
				var w1res = w1/sum1;
				var w2res = w2/sum2;
				var w3res = w3/sum3;
				CWeights[CWindex].w1 = w1res;
				CWeights[CWindex].w2 = w2res;
				CWeights[CWindex].w3 = w3res;



			}
			//console.log(CWeights);
			//alternatives
			var AWeights = [];
			for(z =0; z< $scope.problemss.length;z++){
				if($scope.problemss[z]._id == $scope.pName.id){
					var k = $scope.problemss[z].decisors.length;
					var lenCriterias = $scope.problemss[z].criterias.length;
					for(i =0; i<k;i++){
						var idd = $scope.problemss[z].decisors[i]._id;
						var lenSelA = $scope.problemss[z].selectionsAlternatives.length;
						for(j =0; j<lenSelA;j++){
							if(idd ==$scope.problemss[z].selectionsAlternatives[j].decisorId){
							var weightA1 = $scope.problemss[z].selectionsAlternatives[j].fuzzyValue1;
							var weightA2 = $scope.problemss[z].selectionsAlternatives[j].fuzzyValue2;
							var weightA3 = $scope.problemss[z].selectionsAlternatives[j].fuzzyValue3;
							var idc =  $scope.problemss[z].selectionsAlternatives[j].criteriaId;
							var ida =  $scope.problemss[z].selectionsAlternatives[j].alternativeId;
							if(weightA1 == -1){
								//nada
							}
							else{
							for(c=0; c< CWeights.length;c++){
								if(idd == CWeights[c].decisorId){
									if(CWeights[c].criteriaId == idc){
										var w1 = CWeights[c].w1;
										var w2 = CWeights[c].w2;
										var w3 = CWeights[c].w3;
										var resMul1 = w1*weightA1;
										var resMul2 = w2*weightA2;
										var resMul3 = w3*weightA3;

										var decisorSelection = {
											decisorId : idd,
											criteriaId: idc,
											alternativeId :ida,
											w1: resMul1,
											w2 : resMul2,
											w3: resMul3
										}
										AWeights.push(decisorSelection);

										}

								}
								}
							}
							}
						}
					}
				}
			}
			// pesos definitivos de alternativas
			var sum1 =0;
			var sum2 =0;
			var sum3 =0;
			var AWeights2 =[];
			for(z =0; z< $scope.problemss.length;z++){
				if($scope.problemss[z]._id == $scope.pName.id){
					var k = $scope.problemss[z].decisors.length;
					for(i=0;i<k;i++){
						var idd = $scope.problemss[z].decisors[i]._id;
						var al = $scope.problemss[z].alternatives.length;
					for(j=0;j<al;j++){
						var ida =  $scope.problemss[z].alternatives[j]._id;
						sum1 =0;
						sum2 =0;
						sum3 =0;
						for (awIndex =0;awIndex< AWeights.length;awIndex++){
							if(idd ==AWeights[awIndex].decisorId){
							if(ida == AWeights[awIndex].alternativeId){

								sum1 = sum1 +AWeights[awIndex].w1;
								sum2 = sum2 +AWeights[awIndex].w2;
								sum3 = sum3 +AWeights[awIndex].w3;

							}
						}
						}
						var defAWeight = {
							decisorId : idd,
							alternativeId : ida,
							w1: sum1,
							w2: sum2,
							w3 : sum3

						}

						AWeights2.push(defAWeight);


					}

					}
				}
			}

			// tazacion de los decisores
			var DWeights = [];
			for(z =0; z< $scope.problemss.length;z++){
				if($scope.problemss[z]._id == $scope.pName.id){
					var k = $scope.problemss[z].decisors.length;
					var sum1 =0;
					var sum2 =0;
					var sum3 =0;

					for(i =0;i<k;i++){
						sum1 = sum1 + $scope.problemss[z].decisors[i].fuzzyValue1;
						sum2 = sum2 + $scope.problemss[z].decisors[i].fuzzyValue2;
						sum3 = sum3 + $scope.problemss[z].decisors[i].fuzzyValue3;



					}
					for(i=0;i<k;i++){
						var div1 = $scope.problemss[z].decisors[i].fuzzyValue1/sum1;
						var div2 = $scope.problemss[z].decisors[i].fuzzyValue2/sum2;
						var div3 = $scope.problemss[z].decisors[i].fuzzyValue3/sum3;

						var decisorNWeight ={
							decisorId:$scope.problemss[z].decisors[i]._id,
							w1: div1,
							w2: div2,
							w3: div3
						}
						DWeights.push(decisorNWeight);
					}

				}
			}

			// obtencion del vector r
			var RWeights = [];
			for(z =0; z< $scope.problemss.length;z++){
				if($scope.problemss[z]._id == $scope.pName.id){
					var len1 = $scope.problemss[z].alternatives.length;
					for(i =0;i< len1;i++){
						var ida = $scope.problemss[z].alternatives[i]._id;
						var sum1=0;
						var sum2=0;
						var sum3=0;
						for(j=0;j<AWeights2.length;j++){
							if(AWeights2[j].alternativeId == ida){
								var v1 = AWeights2[j].w1;
								var v2 = AWeights2[j].w2;
								var v3 = AWeights2[j].w3;
								var idd = AWeights2[j].decisorId;
								for(dIndex =0;dIndex< DWeights.length;dIndex++){
									if(idd == DWeights[dIndex].decisorId){
										var d1 = DWeights[dIndex].w1;
										var d2 = DWeights[dIndex].w2;
										var d3 = DWeights[dIndex].w3;

										var resMul1 = d1*v1;
										var resMul2 = d2*v2;
										var resMul3 = d3*v3;
										//console.log(d1 +"*"+v1+" ="+resMul1);
										//console.log(d2 +"*"+v2+" ="+resMul2);
										//console.log(d3 +"*"+v3+" ="+resMul3);
									}
								}



								sum1 = sum1+ resMul1;
								sum2 = sum2+ resMul2;
								sum3 = sum3+ resMul3;
							}
						}
						var res = {
							alternativeId: ida,
							w1: sum1,
							w2: sum2,
							w3 : sum3
						}
						RWeights.push(res);




					}

				}
			}
			//console.log(RWeights);
			for(i =0;i< RWeights.length;i++){
				RWeights[i].w1 = RWeights[i].w1/10;
				RWeights[i].w2 = RWeights[i].w2/10;
				RWeights[i].w3 = RWeights[i].w3/10;
			}
			var v1P = 1;
			var v2P = 1;
			var v3P = 1;
			var v1N = 0;
			var v2N = 0;
			var v3N = 0;


			for(i =0;i< RWeights.length;i++){
				var negDistance = distance(RWeights[i].w1,RWeights[i].w2,RWeights[i].w3,v1N,v2N,v3N);
				var posDistance = distance(RWeights[i].w1,RWeights[i].w2,RWeights[i].w3,v1P,v2P,v3P);
				RWeights[i].negDistance = negDistance;
				RWeights[i].posDistance = posDistance;
			}
			for(i =0;i< RWeights.length;i++){
				var coef = 0.5*(RWeights[i].negDistance +(1-RWeights[i].posDistance));
				RWeights[i].coef = coef;
			}
			var ca =0;
			var aux = {};
			for(i =0;i< RWeights.length;i++){
				for(j=0;j<RWeights.length;j++){
					if(RWeights[i].coef >RWeights[j].coef){
						aux = RWeights[i];
						RWeights[i] = RWeights[j];
						RWeights[j] = aux;
					}
				}
			}

			for(z =0; z< $scope.problemss.length;z++){
				if($scope.problemss[z]._id == $scope.pName.id){
					var len1 = $scope.problemss[z].alternatives.length;
					for(i =0;i< len1;i++){
						var ida = $scope.problemss[z].alternatives[i]._id;
						var name =$scope.problemss[z].alternatives[i].name;
						for(j=0;j<RWeights.length;j++){
							RWeights[j].pos = j+1;
							if(RWeights[j].alternativeId == ida){
								RWeights[j].name = name;
							}
						}


					}

				}
			}
			$scope.results = [];
			$scope.results = RWeights;


		}

		$scope.findDecisor = function(decisorId){
			var dName = "";
			for(i = 0;i< $scope.problemss.length;i++){
				if(serveProblemName.id ==$scope.problemss[i]._id){
					for(j=0; j<$scope.problemss[i].decisors.length;j++){
						if($scope.problemss[i].decisors[j]._id == decisorId){
							dName = $scope.problemss[i].decisors[j].name;
						}
					}
				}
			}
			return dName;
		}

		$scope.findCriteria = function(criteriaId){
			var cName = "";
			for(i = 0;i< $scope.problemss.length;i++){
				if(serveProblemName.id ==$scope.problemss[i]._id){
					for(j=0; j<$scope.problemss[i].criterias.length;j++){
						if($scope.problemss[i].criterias[j]._id == criteriaId){
							cName = $scope.problemss[i].criterias[j].name;
						}
					}
				}
			}
			return cName;
		}

	}]);

	app.controller("Tables",function(){

		this.selected = 1;
		this.problem = "";
		this.isSelected = function(tab){
			this.selected = tab;
			//console.log(this.selected);
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
					user: $scope.username,
					description: ' ',
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
					user: $scope.username,
					description: ' ',
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

				var len = $scope.problemss.length;
				$scope.refresh();
				 for(i =0;i<len;i++){
						var key = $scope.problemss[i]._id;
						var flag = 1;
						if(key == $scope.pName.id ){
							var f = (this.review.name == null||this.review.name == "") && (this.review.surname == null||this.review.surname== "")  && this.review.fuzzyRating == null;
							//console.log(f);
							if((this.review.name == null||this.review.name == "") && (this.review.surname == null||this.review.surname== "")  && this.review.fuzzyRating == null){
								flag = 1;
							}
							else{
								flag =0;
								if(this.review.name == null || this.review.name == "" ){
									this.review.name = $scope.dname;
								}
								if(this.review.surname == null || this.review.surname =="" ){
									this.review.surname = $scope.dsurname;
								}
								if(this.review.fuzzyRating == null){
									this.review.fuzzyRating = $scope.dfuzzyrating;

								}
								var v1 = findV1Decisor(this.review.fuzzyRating);
								var v2 = findV2Decisor(this.review.fuzzyRating);
								var v3 = findV3Decisor(this.review.fuzzyRating);

							}
							if(flag == 0){
							var len2 = $scope.problemss[i].decisors.length;
							//$scope.did
							$scope.refresh();
							for(j= 0;j<len2;j++){
								if($scope.did == $scope.problemss[i].decisors[j]._id){
									var request = {
									type: "decisor",
									action: "edit",
									_id:  $scope.did,
									name: this.review.name,
									surname: this.review.surname,
									fuzzyRating : this.review.fuzzyRating,
									fuzzyValue1 : v1,
									fuzzyValue2 : v2,
									fuzzyValue3 : v3
							}
							//console.log(request);
									$http.put('/api/problems/' +$scope.pName.id , request);

							$scope.refresh();

							}
							}
							toast3();
						}
						else{
							noChangesDecisorToast();
						}
						this.review = {};
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
						var flag = 1;
						var flag2 =1 ;
						if(key == $scope.pName.id ){
							if(this.review.name == null || this.review.name == ""){
							this.review.name =$scope.cname;
								}
								else{
									flag =0;
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
									var con =0;
									for(z=0;z < selectionsCriterias.length;z++){
										if(selectionsCriterias[z]._id == $scope.cid){
											selectionsCriterias[z].fuzzyRating = "*";
											selectionsCriterias[z].fuzzyValue1 = -1;
 											selectionsCriterias[z].fuzzyValue2 = -1;
 											selectionsCriterias[z].fuzzyValue3 = -1;

										}
										else{


										if(selectionsCriterias[z].fuzzyRating == null || selectionsCriterias[z].fuzzyRating == ""){
											con++;
											}
									else{
										selectionsCriterias[z].fuzzyValue1= findV1Criteria(selectionsCriterias[z].fuzzyRating);
										selectionsCriterias[z].fuzzyValue2= findV2Criteria(selectionsCriterias[z].fuzzyRating);
										selectionsCriterias[z].fuzzyValue3= findV3Criteria(selectionsCriterias[z].fuzzyRating);
										selectionsCriterias[z].fuzzyRating= findCriteriaRating(selectionsCriterias[z].fuzzyRating);
									}
										}

								}
								if(con == $scope.problemss[i].criterias.length-1){
									flag2 = 1;
								}
								else{
									flag2 =0;
								}

							if(flag2 ==0 && this.review.decisor != null){
								var request = {
									type: "selectionsCriterias",
									action: "edit",
									criteriaId:  $scope.cid,
									decisorId: this.review.decisor,
									comparations: selectionsCriterias

									}
									//console.log(request);
									$http.put('/api/problems/' +$scope.pName.id ,request);

							if(flag==1){
								flag =0;
							}
							else{
								// flag =0
							}
							}

							this.review = {};
							if(flag ==0){
								toast7();
							}else{
								noChangesCriteriaToast();
							}
							$scope.refresh();
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
				 	var flag =1;
						var key = $scope.problemss[i]._id;
						if(key == $scope.pName.id ){
							if(this.review.name == null){
							this.review.name = $scope.aname;
							flag=1;
								}
								else{
									flag = 0;
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

									if(this.review.decisor== null ||this.review.criteria== null){
										//console.log("null");
									}
									else{
									if(this.review.fuzzyRating == null || this.review.fuzzyRating == ""){
										this.review.fuzzyRating = "(3,5,7)"
									}

									var request = {
									type: "selectionsAlternatives",
									action: "edit",
									alternativeId:  $scope.aid,
									decisorId: this.review.decisor,
									criteriaId : this.review.criteria,
									fuzzyRating : findAlternativeRating(this.review.fuzzyRating),
									fuzzyValue1: findV1Alternative(this.review.fuzzyRating),
									fuzzyValue2: findV2Alternative(this.review.fuzzyRating),
									fuzzyValue3: findV3Alternative(this.review.fuzzyRating)


									}

									$http.put('/api/problems/' +$scope.pName.id ,request);
									flag = 0;
									}
							$scope.refresh();
							if(flag ==0){
								toast8();
							}
							else{
								noChangesAlternativeToast();
							}
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
					var req ={
						name:$scope.pName.name,
						description: $scope.pName.description
					};
					$http.put('/api/problems/'+id,req);
					toast6();
					$scope.refresh();
					var len = $scope.problemss.length;
					for(i =0;i<len;i++){
						var key = $scope.problemss[i].id;
						if(key == $scope.pName.id ){
							$scope.problemss[i].push({
								name:$scope.pName.name,
								description: $scope.pName.description
							});
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
					this.review.name = firstUp(this.review.name);
					this.review.surname = firstUp(this.review.surname);
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
        if(fuzzyRating == "Normal"){
			return 0;
		}
		if(fuzzyRating == "Important"){
          return 2;
        }
        if(fuzzyRating == "Very Important"){
          return 5;
        }
        if(fuzzyRating == "Most Important"){
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
        if(fuzzyRating == "Normal"){
			return 0;
		}
		if(fuzzyRating == "Important"){
          return 5;
        }
        if(fuzzyRating == "Very Important"){
          return 8;
        }
        if(fuzzyRating == "Most Important"){
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
        if(fuzzyRating == "Normal"){
			return 4;
		}
		if(fuzzyRating == "Important"){
          return 8;
        }
        if(fuzzyRating == "Very Important"){
          return 10;
        }
        if(fuzzyRating == "Most Important"){
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
        if(fuzzyRating == "(-1,-1,-1)"){
         return -1;
        }
        if(fuzzyRating == "*"){
         return -1;
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
        if(fuzzyRating == "(-1,-1,-1)"){
         return -1;
        }
        if(fuzzyRating == "*"){
         return -1;
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
        if(fuzzyRating == "(-1,-1,-1)"){
         return -1;
        }
        if(fuzzyRating == "*"){
         return -1;
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
        if(fuzzyRating == "(-1,-1,-1)"){
          rating = "*";
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
        if(fuzzyRating == "(-1,-1,-1)"){
          rating = "**";
        }
        if(fuzzyRating == "**"){
          rating = "**";
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
        if(fuzzyRating == "(-1,-1,-1)"){
          return -1;
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
        if(fuzzyRating == "(-1,-1,-1)"){
          return -1;
        }
 }
 function raizN(x, n) {
    return Math.exp(Math.log(x) / n);
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
        if(fuzzyRating == "(-1,-1,-1)"){
          return -1;
        }
 }

  function distance(a1, a2, a3, b1, b2, b3){
        if(a1<0){
        	a1 = a1*-1;
        }
        if(a2<0){
        	a2 = a2*-1;
        }
        if(a3<0){
        	a3 = a3*-1;
        }

            var distance = Math.sqrt((Math.pow(a1 - b1, 2) + Math.pow(a2 - b2, 2) + Math.pow(a3 - b3, 2)) / 3);
            return distance;
        }

function firstUp(string){
	if(string == "" || string == null){
		return string;
	}
	else{
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

}

})();
