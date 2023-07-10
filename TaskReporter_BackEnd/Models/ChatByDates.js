const mongoose = require('mongoose');

const ChatByDatesSchema = mongoose.Schema({
    chatContentToday : {type : Array},
    chatDate : {type : String},
    chatGroup : {type : mongoose.Schema.Types.ObjectId,ref : 'chats'}
});

module.exports = mongoose.model('chatByDates',ChatByDatesSchema);