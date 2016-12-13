var mongoose = require('mongoose');


module.exports = mongoose.model('problem',{
	name: {type : String , require : true},
	nd: {type : Number , require : true},
	nc: {type : Number , require : true},
	na: {type : Number , require : true}
});