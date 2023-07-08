const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    username : {type : String },
    emailId : {type : String},
    categories : [{type : mongoose.Schema.Types.ObjectId,ref : 'categories'}],
    chats : [{type : mongoose.Schema.Types.ObjectId,ref : 'chats'}]    
},{timestamps : true});


module.exports  = mongoose.model('users',UsersSchema);