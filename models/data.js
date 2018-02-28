
var mongoose = require('mongoose');

var dataSchema = mongoose.Schema({
    date: {type: String},
	phoneid: {type: String},
    hour: {type: Number}
});
module.exports = mongoose.model('Data', dataSchema);
