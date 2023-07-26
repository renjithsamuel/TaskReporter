const chatByDates = require('../Models/ChatByDates.js');

// api handlers
// Get all chatByDates 
exports.getChatByDates = async (req,res,next) =>{
    try{
        const allChatByDatesData = await chatByDates.find();
        if(!allChatByDatesData){
            return res.status(400).json({
                success : false,
                message : "something went wrong while getting chatByDates!"
            });
        }
        return res.status(200).json({
            success : true,
            data : allChatByDatesData,
            count : allChatByDatesData.length
        });
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Internal server error!" + err
        })
    }
}

// get previous chats 
exports.getPreviousChats = async (req, res, next) => {
    const categoryId = req.query.id; // Assuming the category ID is passed as a parameter
    const skipCount = parseInt(req.query.skipCount);
    const limit = parseInt(req.query.limit);
    try {
      // Find the chat messages for the specified category, limit to the most recent 30, and sort them in descending order by chatDate
      const chatMessages = await chatByDates.find({ category: categoryId }).sort({ chatDate: -1 }).skip(skipCount*limit).limit(limit).exec();
  
      return res.status(200).json({
        success: true,
        data: chatMessages,
        count: chatMessages.length,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Internal server error!" + err,
      });
    }
  };

// Get specific chatByDate
exports.getUniqueChatByDateById = async (req,res,next) => {
    const chatByDateID  = req.params.id;
        // if data not in db:
        let dataInDB = await chatByDates.findById({_id:chatByDateID});
        if(!dataInDB){
            return res.status(404).json({
                message : "cannot find document",
                success : false 
            })
        }
    try{
        // single level population : 
        // const chatByDateData = await chatByDates.findById(chatByDateID).populate('chats').populate('categories');
        // multi level population : 
        const chatByDateData = await ChatByDates.findById(chatByDateID);

        if(!chatByDateData){
            return res.status(400).json({
                success : false,
                message: "something went wrong while fetching chatByDate!"
            })
        }
        return res.status(200).json({
            success : true , 
            data : chatByDateData,
            count : chatByDateData.length
        })
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Internal server error!" + err,
        })
    }
}


exports.postChatByDate = async (req,res,next) => {
    if(req.body.text == null || req.body.senderEmail == null || req.body.senderName == null|| req.body.chatDate == null|| req.body.category == null|| req.body.room == null ){
        return res.status(404).json({
            success : false,
            message: "send valid details!"
        })
    }
    const postableData = {text : req.body.text,
                        senderEmail : req.body.senderEmail ,
                        senderName : req.body.senderName ,
                        chatDate : req.body.chatDate ,
                        category : req.body.category ,
                        room : req.body.room
                    };  

    try{
        const postedData = await chatByDates.create(postableData);
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

// patch chatByDates
exports.patchChatByDateById = async (req,res,next) => {
    if(!req.params.id){
        return res.status(404).json({
            success : false,
            message : "enter valid userID",
        })
    }

    const chatByDateID = req.params.id;
        // if data not in db:
        let dataInDB = await chatByDates.findById({_id:chatByDateID});
        if(!dataInDB){
            return res.status(404).json({
                message : "cannot find document",
                success : false 
            })
        }
    
    if(req.body.text == null && req.body.senderEmail == null && req.body.senderName == null && req.body.chatDate == null && req.body.category == null && req.body.room == null){
        return res.status(404).json({
            success : false,
            message : "send valid data to patch!"
        })
    }
    // fetching chatByDate data 
    let chatByDateData;
    try{
        chatByDateData = await chatByDates.findById(chatByDateID);
    }catch(err){
        return res.status(500).json({
            success : false, 
            message : "Internal server error while fetching chatByDates",err
        })
    }
    const patchableData = {
        text :  req.body.text || chatByDateData.text, 
        senderEmail : req.body.senderEmail || chatByDateData.senderEmail,
        senderName : req.body.senderName || chatByDateData.senderName,
        chatDate : req.body.chatDate || chatByDateData.chatDate,
        category : req.body.category || chatByDateData.category,
        room : req.body.room || chatByDateData.room,
    }
    try{
        const patchedData = await chatByDates.findByIdAndUpdate(chatByDateID , { $set: { ...patchableData } }, {new : true});
        if(!patchedData){
            return res.status(400).json({
                success : false,
                message : "something went wrong while patching chatByDate!"
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


// delete ChatByDates 
exports.deleteChatByDateById = async (req,res,next) => {
    const chatByDateId = req.params.id;
    if(!chatByDateId){
        return res.status(404).json({
            success : false,
            message : "send valid chatByDateId"
        })
    }

    // if data not in db:
    let dataInDB = await chatByDates.findById({_id:chatByDateID});
    if(!dataInDB){
        return res.status(404).json({
            message : "cannot find document",
            success : false 
        })
    }

    try{
        const deletedChatByDateData = await chatByDates.findByIdAndDelete(chatByDateId);
        if(!deletedChatByDateData){
            return res.status(400).json({
                success : false,
                message : "something went wrong while deleting chatByDate!"
            })
        }
        return res.status(200).json({
            success : true,
            data : deletedChatByDateData,
            count : deletedChatByDateData.length
        })    
    }catch(err){
        return res.status(500).json({
            success : false,
            message  : "Internal server error ",err
        })
    }
}


//  delete many chats
exports.deleteManyChatsByCategoryId = async (req, res, next) => {
    const categoryId = req.params.id;
  
    if (!categoryId) {
      return res.status(404).json({
        success: false,
        message: "send valid categoryId",
      });
    }
  
    try {
      // Find and delete all chats with the matching categoryId
      const deletedChatsData = await chatByDates.deleteMany({ category: categoryId });
  
      if (!deletedChatsData) {
        return res.status(404).json({
          success: false,
          message: "No tasks found with the given categoryId",
        });
      }
  
      return res.status(200).json({
        success: true,
        data: deletedChatsData,
        count: deletedChatsData.length,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        err,
      });
    }
  };