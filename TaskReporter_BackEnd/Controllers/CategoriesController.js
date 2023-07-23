const categories = require('../Models/Categories.js');

// api handlers
// Get all categories 
exports.getCategories = async (req,res,next) =>{
    try{
        const allCategoriesData = await categories.find();
        if(!allCategoriesData){
            return res.status(400).json({
                success : false,
                message : "something went wrong while getting Categories!"
            });
        }
        return res.status(200).json({
            success : true,
            data : allCategoriesData,
            count : allCategoriesData.length
        });
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Internal server error!" + err
        })
    }
}

// Get specific Category
exports.getUniqueCategoryById = async (req,res,next) => {
    const CategoryID  = req.params.id;
        // if data not in db:
        let dataInDB = await categories.findById({_id:CategoryID})
        if(!dataInDB){
            return res.status(404).json({
                message : "cannot find document",
                success : false 
            })
        }

    try{
        // single level population : 
        // const CategoryData = await categories.findById(CategoryID).populate('chats').populate('categories');
        // multi level population : 
        const CategoriesData = await categories.findById(CategoryID).populate('colaborators').populate('createdBy');

        if(!CategoriesData){
            return res.status(400).json({
                success : false,
                message: "something went wrong while fetching Category!"
            })
        }
        return res.status(200).json({
            success : true , 
            data : CategoriesData,
            count : CategoriesData.length
        })
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Internal server error!" + err,
        })
    }
}

// Get categories by UserId
exports.getCategoriesByUserId = async (req,res,next) => {
    const userId  = req.params.id;
    // console.log(userId);
    try{
        // single level population : 
        // const CategoryData = await categories.findById(CategoryID).populate('chats').populate('categories');
        // multi level population : 
        const CategoriesData = await categories.find({colaborators:userId}).populate('colaborators').populate('createdBy');

        if(!CategoriesData){
            return res.status(400).json({
                success : false,
                message: "something went wrong while fetching Category!"
            })
        }
        return res.status(200).json({
            success : true , 
            data : CategoriesData,
            count : CategoriesData.length
        })
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Internal server error!" + err,
        })
    }
}

exports.postCategory = async (req,res,next) => {
    if(req.body.categoryName == null || req.body.description == null || req.body.startDate == null || req.body.endDate == null ||  req.body.colaborators == null ||  req.body.createdBy == null ){
        return res.status(404).json({
            success : false,
            message: "send valid details!"
        })
    }
    const postableData = {categoryName : req.body.categoryName,
                           description : req.body.description , 
                           startDate : req.body.startDate ,
                           endDate : req.body.endDate ,
                           colaborators : req.body.colaborators,
                           createdBy : req.body.createdBy,
                           weightsCompleted : 0,
                           contributions : [],
                           overAllWeight : 0,
                           tasksCount : 0
                        };

    try{
        const postedData = await categories.create(postableData);
        if(!postedData){
            return res.status(400).json({
                success : false,
                message : "something went wrong while posting!"
            })
        };

        const populatedData = await categories
                                                .findById(postedData._id)
                                                .populate('colaborators')
                                                .populate('createdBy')
                                                .exec();
  


        return res.status(200).json({
            success : true ,
            data : populatedData ,
            count : 1
        })
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Internal server error!"  ,  err
        })
    }
}

// patch Categories
exports.patchCategoryById = async (req,res,next) => {
    if(!req.params.id){
        return res.status(404).json({
            success : false,
            message : "enter valid CategoryID",
        })
    }

    const CategoryID = req.params.id;
    // if data not in db:
    let dataInDB = await categories.findById({_id:CategoryID});
    if(!dataInDB){
        return res.status(404).json({
            message : "cannot find document",
            success : false 
        })
    }
    
    if(req.body.categoryName == null && req.body.description == null && req.body.startDate == null
         && req.body.endDate == null && req.body.colaborators == null &&  req.body.createdBy == null && 
         req.body.weightsCompleted ==null && req.body.contributions ==null && req.body.overAllWeight == null 
         && req.body.tasksCount == null
        ){
        return res.status(404).json({
            success : false,
            message : "send valid data to patch!"
        })
    }
    // fetching Category data 
    let CategoryData;
    try{
        CategoryData = await categories.findById(CategoryID);
    }catch(err){
        return res.status(500).json({
            success : false, 
            message : "Internal server error while fetching Categories",err
        })
    }
    const patchableData = {
        categoryName :  req.body.categoryName || CategoryData.categoryName,
        description : req.body.description  || CategoryData.description,
        startDate : req.body.startDate || CategoryData.startDate,
        endDate : req.body.endDate || CategoryData.endDate,
        colaborators : req.body.colaborators || CategoryData.colaborators,
        createdBy : req.body.createdBy || CategoryData.createdBy,
        weightsCompleted : (req.body.weightsCompleted!=null)?req.body.weightsCompleted : CategoryData.weightsCompleted,
        contributions : (req.body.contributions!=null)?req.body.contributions : CategoryData.contributions,
        overAllWeight : (req.body.overAllWeight!=null )?req.body.overAllWeight:CategoryData.overAllWeight,
        tasksCount : (req.body.tasksCount!=null)?req.body.tasksCount:CategoryData.tasksCount,
    }
    try{
        const patchedData = await categories.findByIdAndUpdate(CategoryID ,{ $set: { ...patchableData } }, {new : true});
        if(!patchedData){
            return res.status(400).json({
                success : false,
                message : "something went wrong while patching Category!"
            })
        }

        
        const populatedData = await categories
                                                .findById(patchedData._id)
                                                .populate('colaborators')
                                                .populate('createdBy')
                                                .exec();

        return res.status(200).json({
            success : true,
            data : populatedData ,
            count : 1
        })
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Internal server error!",err
        })
    }
}


// delete Categories 
exports.deleteCategoryById = async (req,res,next) => {
    const CategoryID = req.params.id;
    if(!CategoryID){
        return res.status(404).json({
            success : false,
            message : "send valid CategoryId"
        })
    }
    // if data not in db:
    let dataInDB = await categories.findById({_id:CategoryID});
    if(!dataInDB){
        return res.status(404).json({
            message : "cannot find document",
            success : false 
        })
    }

    try{
        const deletedCategoryData = await categories.findByIdAndDelete(CategoryID);
        if(!deletedCategoryData){
            return res.status(400).json({
                success : false,
                message : "something went wrong while deleting Category!"
            })
        }
        return res.status(200).json({
            success : true,
            data : deletedCategoryData,
            count : deletedCategoryData.length
        })    
    }catch(err){
        return res.status(500).json({
            success : false,
            message  : "Internal server error ",err
        })
    }
}