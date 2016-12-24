var mongoose = require('mongoose');


module.exports = mongoose.model('Problem',{
	id: {type: String ,require: true},	
	name: {type : String , require : true},
	nd: {type : Number , require : true},
	nc: {type : Number , require : true},
	na: {type : Number , require : true},
	decisors:[
		{
			
			name: {type : String , require : true},
			surname: {type : String , require : true},
			fuzzyRating:{type : String,
				enum: ['Normal','Important','Very Important','Most Important'],
				require : true} ,
			fuzzyValue1 : {type : Number , require : true},
			fuzzyValue2 : {type : Number , require : true},
			fuzzyValue3: {type : Number , require : true} 
		}
	],
	criterias:[
		{
			
			name: {type : String , require : true},
			fuzzyRating: {type : String,
				enum: ['Same Importance','Weak Importance','Light Importance','Importance between light and accentuated'
				,'Importance Accentuated','Strong Importance','Very Strong Importance'
				,'Extremely Strong Importance','Absolute Importance'],
				require : true} ,
			fuzzyValue1 : {type : Number , require : true},
			fuzzyValue2 : {type : Number , require : true},
			fuzzyValue3: {type : Number , require : true}


		}

	],
	alternatives:[
		{

			name: {type : String , require : true},
			fuzzyRating: {type : String,
				enum: ['Extremely Low','Very Low','Low','Medium'
				,'High','Very High','Extremely High'],
				require : true} ,
			fuzzyValue1 : {type : Number , require : true},
			fuzzyValue2 : {type : Number , require : true},
			fuzzyValue3: {type : Number , require : true}
		}
	]
});