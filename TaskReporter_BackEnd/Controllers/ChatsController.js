const chats = require('../Models/Chats.js');

// api handlers
// Get all chats 
exports.getChats = async (req,res,next) =>{
    try{
        const allChatsData = await chats.find();
        if(!allChatsData){
            return res.status(400).json({
                success : false,
                message : "something went wrong while getting Chats!"
            });
        }
        return res.status(200).json({
            success : true,
            data : allChatsData,
            count : allChatsData.length
        });
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Internal server error!" + err
        })
    }
}

// Get specific Chat
exports.getUniqueChatById = async (req,res,next) => {
    const ChatID  = req.params.id;
        // if data not in db:
        let dataInDB = await chats.findById({_id:ChatID})
        if(!dataInDB){
            return res.status(404).json({
                message : "cannot find document",
                success : false 
            })
        }

    try{
        // single level population : 
        // const ChatData = await chats.findById(ChatID).populate('chats').populate('categories');
        // multi level population : 
        const ChatsData = await chats.findById(ChatID).populate('category').populate('createdBy');

        if(!ChatsData){
            return res.status(400).json({
                success : false,
                message: "something went wrong while fetching Chat!"
            })
        }
        return res.status(200).json({
            success : true , 
            data : ChatsData,
            count : ChatsData.length
        })
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Internal server error!" + err,
        })
    }
}


exports.postChat = async (req,res,next) => {
    if(req.body.chatName == null || req.body.category == null  || req.body.createdBy == null  ){
        return res.status(404).json({
            success : false,
            message: "send valid details!"
        })
    }
    const postableData = {chatName : req.body.chatName, category : req.body.category , 
                        createdBy : req.body.createdBy };

    try{
        const postedData = await chats.create(postableData);
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

// patch Chats
exports.patchChatById = async (req,res,next) => {
    if(!req.params.id){
        return res.status(404).json({
            success : false,
            message : "enter valid ChatID",
        })
    }

    const ChatID = req.params.id;

    // if data not in db:
    let dataInDB = await chats.findById({_id:ChatID});
    if(!dataInDB){
        return res.status(404).json({
            message : "cannot find document",
            success : false 
        })
    }
    
    if(req.body.chatName == null && req.body.category == null  && req.body.createdBy == null){
        return res.status(404).json({
            success : false,
            message : "send valid data to patch!"
        })
    }
    // fetching Chat data 
    let ChatData;
    try{
        ChatData = await chats.findById(ChatID);
    }catch(err){
        return res.status(500).json({
            success : false, 
            message : "Internal server error while fetching Chats",err
        })
    }
    const patchableData = {
        chatName :  req.body.chatName || ChatData.chatName,
        category : req.body.category || ChatData.category,
        createdBy : req.body.createdBy || ChatData.createdBy,
    }
    try{
        const patchedData = await chats.findByIdAndUpdate(ChatID , { $set: { ...patchableData } }, {new : true});
        if(!patchedData){
            return res.status(400).json({
                success : false,
                message : "something went wrong while patching Chat!"
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


// delete Chats 
exports.deleteChatById = async (req,res,next) => {
    const ChatID = req.params.id;
    if(!ChatID){
        return res.status(404).json({
            success : false,
            message : "send valid ChatId"
        })
    }
    // if data not in db:
    let dataInDB = await chats.findById({_id:ChatID});
    if(!dataInDB){
        return res.status(404).json({
            message : "cannot find document",
            success : false 
        })
    }

    try{
        const deletedChatData = await chats.findByIdAndDelete(ChatID);
        if(!deletedChatData){
            return res.status(400).json({
                success : false,
                message : "something went wrong while deleting Chat!"
            })
        }
        return res.status(200).json({
            success : true,
            data : deletedChatData,
            count : deletedChatData.length
        })    
    }catch(err){
        return res.status(500).json({
            success : false,
            message  : "Internal server error ",err
        })
    }
}