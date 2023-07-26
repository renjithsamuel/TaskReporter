const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    username : {type : String },
    emailId : {type : String},
    invites : [{type : mongoose.Schema.Types.ObjectId,ref : 'categories'}],
    productivityPoints : {type : Number} ,
    streak : {type : Number}
},{timestamps : true});

module.exports  = mongoose.model('users',UsersSchema);