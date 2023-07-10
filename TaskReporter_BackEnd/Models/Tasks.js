const mongoose = require('mongoose');

const tasksSchema = mongoose.Schema({
    taskName : {type : String},
    category : {type : mongoose.Schema.Types.ObjectId,ref : 'categories'},
    description : {type : String},
    endDate : {type : String},
    weight : {type : Number},
    completed : {type : Boolean},
},{timestamps : true});

module.exports = mongoose.model('tasks',tasksSchema);