var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
    username: {type: String},
	password: {type: String},
	id      : {type: String},
	uuid	: {type: String}
});
module.exports = mongoose.model('Student', studentSchema);
