var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    firstName:{type:String,requiered:true},
    lastName:{type:String,requiered:true},
    password:{type:String,requiered:true},
    email:{type:String,requiered:true, unique:true},
    message:[{type:Schema.Types.ObjectId,ref:'Message'}]
});
// esto asegura que el email si sea unico
schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);