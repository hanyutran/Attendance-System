var mongoose = require('mongoose');

var courseSchema = mongoose.Schema({
    name: {type: String},
    room: {type: String},
    prof: {type: String},
    credit: {type: String},
    time: {type: String},
    semester: {type: String},
    image: {type: String, default: 'defaultPic.png'}

});

module.exports = mongoose.model('Course', courseSchema);