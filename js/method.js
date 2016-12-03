(function(){

	var app = angular.module('fuzzy',[]);

	app.controller("ProblemsController",function(){

		this.problemss = problems;


	});






	var problems = [
		{
			name: "problem 1",
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
			name: "problem 2",
			nd: 3,
			nc: 5,
			na: 9
		},
		{
			name: "problem 3",
			nd: 10,
			nc: 6,
			na: 2
		}
	];


})();