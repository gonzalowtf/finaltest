(function(){

	var app = angular.module('fuzzy',['ngResource']);
	app.controller("ProblemsController",function($scope,$http,$resource){

		var source = $resource('/api/problems');
		source.query(function (results){
			this.problemss = results;

		});

	});

	app.controller("Tables",function(){

		this.selected = 1;
		this.problem = "";
		this.isSelected = function(tab){
			this.selected = tab;
			console.log(this.selected);
		};
		
		
	});

	app.controller("NewProblem",function(){
		this.review = {};
		this.review.nd = 4;
		this.review.nc = 4;
		this.review.na = 8;
		
		this.newP = function(){
			//console.log(this.review.nd);
			problems.push(
				{
					name: this.review.name,
					nd: this.review.nd,
					nc: this.review.nc,
					na: this.review.na,
					
				}
				);
			this.review.name = '';
			toast1();
						
		};


	});

	



	var problems = [
		{
			name: "problem1",
			nd: 5,
			nc: 4,
			na: 3,
			decisors: [
				{
					name: "Charly",
					surname: "Brown",
					fuzzyRating: "Important",
					fuzzyValue1 : 2,
					fuzzyValue2 : 5,
					fuzzyValue3: 8 
				},
				{
					name: "Mark",
					surname: "Twin",
					fuzzyRating: "Very Important",
					fuzzyValue1 : 5,
					fuzzyValue2 : 8,
					fuzzyValue3: 10 
				}
			],
			criterias: [
				{
					name: "C1",
					fuzzyRating: 'Same Importance',
					fuzzyValue1 : 0,
					fuzzyValue2 : 1,
					fuzzyValue3: 2

				},
				{
					name: "C2",
					fuzzyRating: 'Light Importance',
					fuzzyValue1 : 2,
					fuzzyValue2 : 3,
					fuzzyValue3: 4

				},
				{
					name: "C3",
					fuzzyRating: 'Weak Importance',
					fuzzyValue1 : 1,
					fuzzyValue2 : 2,
					fuzzyValue3: 3

				}
			],
			alternatives: [
				{
					name: "A1",
					fuzzyRating: 'Same Importance',
					fuzzyValue1 : 0,
					fuzzyValue2 : 1,
					fuzzyValue3: 2

				},
				{
					name: "A2",
					fuzzyRating: 'Light Importance',
					fuzzyValue1 : 2,
					fuzzyValue2 : 3,
					fuzzyValue3: 4

				},
				{
					name: "A3",
					fuzzyRating: 'Weak Importance',
					fuzzyValue1 : 1,
					fuzzyValue2 : 2,
					fuzzyValue3: 3

				}


			]
		},
		{
			name: "problem2",
			nd: 3,
			nc: 5,
			na: 9,
			decisors: [
				{
					name: "Charly",
					surname: "Brown",
					fuzzyRating: "Important",
					fuzzyValue1 : 2,
					fuzzyValue2 : 5,
					fuzzyValue3: 8 
				},
				{
					name: "Mark",
					surname: "Twin",
					fuzzyRating: "Very Important",
					fuzzyValue1 : 5,
					fuzzyValue2 : 8,
					fuzzyValue3: 10 
				}
			],
			criterias: [
				{
					name: "C1",
					fuzzyRating: 'Same Importance',
					fuzzyValue1 : 0,
					fuzzyValue2 : 1,
					fuzzyValue3: 2

				},
				{
					name: "C2",
					fuzzyRating: 'Light Importance',
					fuzzyValue1 : 2,
					fuzzyValue2 : 3,
					fuzzyValue3: 4

				},
				{
					name: "C3",
					fuzzyRating: 'Weak Importance',
					fuzzyValue1 : 1,
					fuzzyValue2 : 2,
					fuzzyValue3: 3

				}
			],
			alternatives: [
				{
					name: "A1",
					fuzzyRating: 'Same Importance',
					fuzzyValue1 : 0,
					fuzzyValue2 : 1,
					fuzzyValue3: 2

				},
				{
					name: "A2",
					fuzzyRating: 'Light Importance',
					fuzzyValue1 : 2,
					fuzzyValue2 : 3,
					fuzzyValue3: 4

				},
				{
					name: "A3",
					fuzzyRating: 'Weak Importance',
					fuzzyValue1 : 1,
					fuzzyValue2 : 2,
					fuzzyValue3: 3

				}


			]
		},
		{
			name: "problem3",
			nd: 10,
			nc: 6,
			na: 2
		}
	];


})();