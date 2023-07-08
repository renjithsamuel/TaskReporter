const mongoose = require('mongoose');

const reportsSchema = mongoose.Schema({
    reportedDate : {type : String},
    reportStatement : {type : String },
    category : {type :  mongoose.Schema.Types.ObjectId,ref : 'categories'},
    reportedBy : {type :  mongoose.Schema.Types.ObjectId,ref : 'users'},
    taskCompleted : {type : mongoose.Schema.Types.ObjectId,ref : 'tasks'},
    taskCompletedBy : [{type :  mongoose.Schema.Types.ObjectId,ref : 'users'}]
},{timestamps : true});

module.exports = mongoose.model('reports',reportsSchema);