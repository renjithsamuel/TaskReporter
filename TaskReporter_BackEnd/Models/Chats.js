const mongoose = require('mongoose');

const ChatsSchema = mongoose.Schema({
    chatName : {type : String},
    category : {type : mongoose.Schema.Types.ObjectId,ref : 'categories'},
    chatContent : [{type : mongoose.Schema.Types.ObjectId,ref : 'chatByDates'}],
    createdBy : {type : mongoose.Schema.Types.ObjectId,ref : 'users'}
},{timestamps : true});

module.exports = mongoose.model('chats',ChatsSchema);