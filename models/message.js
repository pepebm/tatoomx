var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    content: {type: String, requiered:true},
    user: {type: Schema.Types.ObjectId, requiered:true,ref:'User'}
});

module.exports = mongoose.model('Message', schema);