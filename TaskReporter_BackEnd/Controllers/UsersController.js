const users = require('../Models/Users.js');

// api handlers
// Get all users 
exports.getUsers = async (req,res,next) =>{
    try{
        const allUsersData = await users.find();
        if(!allUsersData){
            return res.status(400).json({
                success : false,
                message : "something went wrong while getting users!"
            });
        }
        return res.status(200).json({
            success : true,
            data : allUsersData,
            count : allUsersData.length
        });
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Internal server error!" + err
        })
    }
}

exports.getUserByData = async (req,res,next) =>{
    // console.log(req.body);
    if(req.body.username ==null || req.body.emailId == null){
        return res.status(400).json({
            success : false,
            message : "send valid details"
        })
    }
    try{
        const currentUserData = await users.findOne({username : req.body.username , emailId : req.body.emailId})
                                        .populate({
                                            path: 'invites',
                                            populate: { path: 'createdBy', model: 'users' , select: 'username' },})
        // .populate('invites')
        // .populate({
        //     path: 'categories',
        //     populate: [
        //     { path: 'colaborators', model: 'users' },
        //     { path: 'tasks', model: 'tasks' , populate : [{path : 'category',model : 'categories'}]}
        //     ]
        // }).populate({
        //     path: 'chats',
        //     populate: [
        //     { path: 'category', model: 'categories' },
        //     { path: 'createdBy', model: 'users' }
        //     ]
        // });
          
        if(!currentUserData){
            return res.status(400).json({
                success : false,
                message : "No such user exist or something went wrong!"
            });
        }
        return res.status(200).json({
            success : true,
            data : currentUserData,
            count : currentUserData.length
        });
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Internal server error!" + err
        })
    }
}

exports.getUserByEmail = async (req,res,next) =>{
    // console.log(req.body);
    if(req.body.emailId == null){
        return res.status(400).json({
            success : false,
            message : "send valid email"
        })
    }
    try{
        const currentUserData = await users.findOne({emailId : req.body.emailId},{_id:1}).populate({
            path: 'invites',
            populate: { path: 'createdBy', model: 'users' , select: 'username' },});

        if(!currentUserData){
            return res.status(400).json({
                success : false,
                message : "No such user exist or something went wrong!"
            });
        }
        return res.status(200).json({
            success : true,
            data : currentUserData,
            count : currentUserData.length
        });
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Internal server error!" + err
        })
    }
}

// Get specific user
exports.getUniqueUserById = async (req,res,next) => {
    const userID  = req.params.id;
        // if data not in db:
        let dataInDB = await users.findById({_id:userID});
        if(!dataInDB){
            return res.status(404).json({
                message : "cannot find document",
                success : false 
            })
        }
    try{
        // single level population : 
        // const userData = await users.findById(userID).populate('chats').populate('categories');
        // multi level population : 
        const userData = await users.findById(userID).populate({
                                            path: 'invites',
                                            populate: { path: 'createdBy', model: 'users' , select: 'username' },})
        // .populate({
        //     path: 'categories',
        //     populate: [
        //       { path: 'colaborators', model: 'users' },
        //       { path: 'tasks', model: 'tasks' },
        //       { path: 'createdBy', model: 'users' }
        //     ]
        //   }).populate({
        //     path: 'chats',
        //     populate: [
        //       { path: 'category', model: 'categories' },
        //       { path: 'createdBy', model: 'users' }
        //     ]
        //   });

        if(!userData){
            return res.status(400).json({
                success : false,
                message: "something went wrong while fetching user!"
            })
        }
        return res.status(200).json({
            success : true , 
            data : userData,
            count : userData.length
        })
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Internal server error!" + err,
        })
    }
}


exports.postUser = async (req,res,next) => {
    // console.log(req.body);
    if(req.body.username == null || req.body.emailId == null){
        return res.status(404).json({
            success : false,
            message: "send valid details!"
        })
    }
    const postableData = {username : req.body.username, emailId : req.body.emailId , productivityPoints : 0 , streak : 0 };

    try{
        const postedData = await users.create(postableData);
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

// patch users
exports.patchUserById = async (req,res,next) => {
    if(!req.params.id){
        return res.status(404).json({
            success : false,
            message : "enter valid userID",
        })
    }

    const userID = req.params.id;
        // if data not in db:
        let dataInDB = await users.findById({_id:userID});
        if(!dataInDB){
            return res.status(404).json({
                message : "cannot find document",
                success : false 
            })
        }
    console.log(req.body);
    if(req.body.username == null && req.body.emailId == null  
        && req.body.invites == null && req.body.updateInvite == null && req.body.productivityPoints == null
        && req.body.streak == null  
        ){
        return res.status(404).json({
            success : false,
            message : "send valid data to patch!"
        })
    }
    // fetching user data 
    let userData;
    try{
        userData = await users.findById(userID);
    }catch(err){
        return res.status(500).json({
            success : false, 
            message : "Internal server error while fetching users",err
        })
    }
    const patchableData = {
        username :  req.body.username || userData.username, 
        emailId : req.body.emailId || userData.emailId,
        invites : (req.body.updateInvite==true || req.body.invites!=null)?req.body.invites : userData.invites,
        productivityPoints : (req.body.productivityPoints != null ) ? req.body.productivityPoints : userData.productivityPoints,
        streak : (req.body.streak != null ) ? req.body.streak : userData.streak,
    }
    try{
        const patchedData = await users.findByIdAndUpdate(userID , { $set: { ...patchableData } }, {new : true});
        if(!patchedData){
            return res.status(400).json({
                success : false,
                message : "something went wrong while patching user!"
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

exports.patchManyUserWithInvites = async (req,res,next) => {
    // console.log(req.body.colaborators , req.body.categoryId);
    if (!Array.isArray(req.body.colaborators) || req.body.categoryId == null) {
        return res.status(400).json({
          success: false,
          error: "Send a valid response! Patching many requires an array of colaborators."
        });
      }
      try {
        const data = await Promise.all(req.body.colaborators.map(async (colaboratorId) => {
          // Update colaborator with new invites
          const userInvites = await users.findOne({_id: colaboratorId},{invites: 1});
          const updatedColaborator = await users.updateOne(
            { _id: colaboratorId },
            { $set: { invites: [...(userInvites.invites), req.body.categoryId] } }
          );
    
          return {
            _id: colaboratorId,
            updatedColaborator: updatedColaborator.nModified > 0,
          };
        }));
    
        return res.status(200).json({
          success: true,
          data
        });

      } catch (err) {
        return res.status(500).json({
          success: false,
          error: "Something went wrong while updating invites!"  + err
        });
      }
}


// delete Users 
exports.deleteUserById = async (req,res,next) => {
    const userId = req.params.id;
    if(!userId){
        return res.status(404).json({
            success : false,
            message : "send valid userId"
        })
    }

    // if data not in db:
    let dataInDB = await users.findById({_id:userId});
    if(!dataInDB){
        return res.status(404).json({
            message : "cannot find document",
            success : false 
        })
    }

    try{
        const deletedUserData = await users.findByIdAndDelete(userId);
        if(!deletedUserData){
            return res.status(400).json({
                success : false,
                message : "something went wrong while deleting user!"
            })
        }
        return res.status(200).json({
            success : true,
            data : deletedUserData,
            count : deletedUserData.length
        })    
    }catch(err){
        return res.status(500).json({
            success : false,
            message  : "Internal server error ",err
        })
    }
}