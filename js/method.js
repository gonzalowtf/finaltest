(function(){

	var app = angular.module('fuzzy',[]);

	app.controller("ProblemsController",function(){

		this.problemss = problems;


	});

	app.controller("NewProblem",function(){
		this.review = {};
		
		this.newP = function(rev){
			
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
		},
		{
			name: "problem2",
			nd: 3,
			nc: 5,
			na: 9
		},
		{
			name: "problem3",
			nd: 10,
			nc: 6,
			na: 2
		}
	];


})();