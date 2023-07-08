const mongoose = require('mongoose');

const CategoriesSchema = mongoose.Schema({
    categoryName : {type : String},
    description : {type : String },
    startDate : {type : String},
    endDate : {type : String},
    colaborators : [{type : mongoose.Schema.Types.ObjectId,ref : 'users'}],
    tasks : [{type : mongoose.Schema.Types.ObjectId , ref : 'tasks'}]
},{timestamps : true});

module.exports = mongoose.model('categories',CategoriesSchema);