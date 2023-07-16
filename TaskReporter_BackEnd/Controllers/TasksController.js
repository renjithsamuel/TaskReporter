const tasks = require('../Models/Tasks.js');

// api handlers
// Get all tasks 
exports.getTasks = async (req,res,next) =>{
    try{
        const allTasksData = await tasks.find();
        if(!allTasksData){
            return res.status(400).json({
                success : false,
                message : "something went wrong while getting tasks!"
            });
        }
        return res.status(200).json({
            success : true,
            data : allTasksData,
            count : allTasksData.length
        });
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Internal server error!" + err
        })
    }
}

// Get specific task
exports.getUniqueTaskById = async (req,res,next) => {
    const taskID  = req.params.id;
        // if data not in db:
        let dataInDB = await tasks.findById({_id:taskID});
        if(!dataInDB){
            return res.status(404).json({
                message : "cannot find document",
                success : false 
            })
        }

    try{
        // single level population : 
        // const taskData = await tasks.findById(taskID).populate('chats').populate('categories');
        // multi level population : 
        const tasksData = await tasks.findById(taskID).populate({
            path: 'category',
            populate: [
              { path: 'colaborators', model: 'users' },
              { path: 'createdBy', model: 'users' }
            ]
          });

        if(!tasksData){
            return res.status(400).json({
                success : false,
                message: "something went wrong while fetching task!"
            })
        }
        return res.status(200).json({
            success : true , 
            data : tasksData,
            count : tasksData.length
        })
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Internal server error!" + err,
        })
    }
}

// Get tasks  by categoryId
exports.getTasksByCategoryId = async (req,res,next) => {
    const categoryId  = req.params.id;
    try{
        // single level population : 
        // const taskData = await tasks.findById(taskID).populate('chats').populate('categories');
        // multi level population : 
        const tasksData = await tasks.find({category : categoryId}).populate("category");

        if(!tasksData){
            return res.status(400).json({
                success : false,
                message: "something went wrong while fetching task! or cannot find document"
            })
        }
        return res.status(200).json({
            success : true , 
            data : tasksData,
            count : tasksData.length
        })
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Internal server error!" + err,
        })
    }
}


exports.postTask = async (req,res,next) => {
    if(req.body.taskName == null || req.body.category == null || req.body.category == null || req.body.description == null || req.body.endDate == null || req.body.weight == null || req.body.completed == null ){
        return res.status(404).json({
            success : false,
            message: "send valid details!"
        })
    }
    const postableData = {taskName : req.body.taskName, 
                        category : req.body.category , 
                        description : req.body.description , 
                        endDate : req.body.endDate ,
                        weight : req.body.weight , 
                        completed : req.body.completed  
                    };

    try{
        const postedData = await tasks.create(postableData);
        if(!postedData){
            return res.status(400).json({
                success : false,
                message : "something went wrong while posting!"
            })
        };
        return res.status(200).json({
            success : true ,
            data : postedData ,
            count : postedData.length
        })
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Internal server error!"  ,  err
        })
    }
}

// patch tasks
exports.patchTaskById = async (req,res,next) => {
    if(!req.params.id){
        return res.status(404).json({
            success : false,
            message : "enter valid taskID",
        })
    }

    const taskID = req.params.id;

    // if data not in db:
    let dataInDB = await tasks.findById({_id:taskID});
    if(!dataInDB){
        return res.status(404).json({
            message : "cannot find document",
            success : false 
        })
    }
    
    if(req.body.taskName == null && req.body.category == null && req.body.description == null && req.body.endDate == null && req.body.weight == null && req.body.completed == null ){
        return res.status(404).json({
            success : false,
            message : "send valid data to patch!"
        })
    }
    // fetching task data 
    let taskData;
    try{
        taskData = await tasks.findById(taskID);
    }catch(err){
        return res.status(500).json({
            success : false, 
            message : "Internal server error while fetching tasks",err
        })
    }
    const patchableData = {
        taskName :  req.body.taskName || taskData.taskName ,
        category : req.body.category || taskData.category ,
        description : req.body.description || taskData.description ,
        endDate : req.body.endDate || taskData.endDate ,
        weight : req.body.weight || taskData.weight ,
        completed : (req.body.completed!=null)?req.body.completed:taskData.completed ,
    }
    try{
        const patchedData = await tasks.findByIdAndUpdate(taskID , { $set: { ...patchableData } }, {new : true});
        if(!patchedData){
            return res.status(400).json({
                success : false,
                message : "something went wrong while patching task!"
            })
        }
        return res.status(200).json({
            success : true,
            data : patchedData ,
            count : patchedData.length
        })
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Internal server error!",err
        })
    }
}


// delete tasks 
exports.deleteTaskById = async (req,res,next) => {
    const taskID = req.params.id;
    if(!taskID){
        return res.status(404).json({
            success : false,
            message : "send valid taskId"
        })
    }
    // if data not in db:
    let dataInDB = await tasks.findById({_id:taskID});
    if(!dataInDB){
        return res.status(404).json({
            message : "cannot find document",
            success : false 
        })
    }

    try{
        const deletedTaskData = await tasks.findByIdAndDelete(taskID);
        if(!deletedTaskData){
            return res.status(400).json({
                success : false,
                message : "something went wrong while deleting task!"
            })
        }
        return res.status(200).json({
            success : true,
            data : deletedTaskData,
            count : deletedTaskData.length
        })    
    }catch(err){
        return res.status(500).json({
            success : false,
            message  : "Internal server error ",err
        })
    }
}


exports.deleteManyTasksByCategoryId = async (req, res, next) => {
    const categoryId = req.params.id;
  
    if (!categoryId) {
      return res.status(404).json({
        success: false,
        message: "send valid categoryId",
      });
    }
  
    try {
      // Find and delete all tasks with the matching categoryId
      const deletedTasksData = await tasks.deleteMany({ category: categoryId });
  
      if (!deletedTasksData) {
        return res.status(404).json({
          success: false,
          message: "No tasks found with the given categoryId",
        });
      }
  
      return res.status(200).json({
        success: true,
        data: deletedTasksData,
        count: deletedTasksData.length,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        err,
      });
    }
  };