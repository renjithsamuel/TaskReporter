const mongoose = require('mongoose');

const ChatByDatesSchema = mongoose.Schema({
    text : {type : String},
    senderEmail : {type : String},
    senderName : {type : String},
    chatDate : {type : Date},
    room : {type : String},
    category : {type : mongoose.Schema.Types.ObjectId,ref : 'categories'}
});

module.exports = mongoose.model('chatByDates',ChatByDatesSchema);