const mongoose = require('mongoose');

const ChatByDatesSchema = mongoose.Schema({
    chatContentToday : {type : Array},
    chatDate : {type : String},
});

module.exports = mongoose.model('chatByDates',ChatByDatesSchema);