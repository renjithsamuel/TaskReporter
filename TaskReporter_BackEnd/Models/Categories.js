const mongoose = require('mongoose');

const CategoriesSchema = mongoose.Schema({
    categoryName : {type : String},
    description : {type : String },
    startDate : {type : String},
    endDate : {type : String},
    createdBy : {type : mongoose.Schema.Types.ObjectId,ref : 'users'},
    colaborators : [{type : mongoose.Schema.Types.ObjectId,ref : 'users'}],
    weightsCompleted : {type : Number},
    contributions: [{
        emailId: { type: String },
        weightContributed: { type: Number },
        numberOfTasksCompleted : {type : Number} 
    }], 
    overAllWeight : { type : Number},
    tasksCount : {type : Number}
    // contributions: [{
    //     user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    //     percentage: { type: Number }
    // }]
},{timestamps : true});

module.exports = mongoose.model('categories',CategoriesSchema);