const mongoose = require('mongoose');

const CategoriesSchema = mongoose.Schema({
    categoryName : {type : String},
    description : {type : String },
    startDate : {type : String},
    endDate : {type : String},
    createdBy : {type : mongoose.Schema.Types.ObjectId,ref : 'users'},
    colaborators : [{type : mongoose.Schema.Types.ObjectId,ref : 'users'}],
    completedPercent : {type : Number}
},{timestamps : true});

module.exports = mongoose.model('categories',CategoriesSchema);