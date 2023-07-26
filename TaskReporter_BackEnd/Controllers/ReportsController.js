const reports = require('../Models/Reports.js');

// api handlers
// Get all reports 
exports.getReports = async (req,res,next) =>{
    try{
        const allReportsData = await reports.find();
        if(!allReportsData){
            return res.status(400).json({
                success : false,
                message : "something went wrong while getting Reports!"
            });
        }
        return res.status(200).json({
            success : true,
            data : allReportsData,
            count : allReportsData.length
        });
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Internal server error!" + err
        })
    }
}

// Get specific Report
exports.getUniqueReportById = async (req,res,next) => {
    const ReportID  = req.params.id;
        // if data not in db:
        let dataInDB = await reports.findById({_id:ReportID})
        if(!dataInDB){
            return res.status(404).json({
                message : "cannot find document",
                success : false 
            })
        }

    try{
        // single level population : 
        // const ReportData = await reports.findById(ReportID).populate('chats').populate('categories');
        // multi level population : 
        const ReportsData = await reports.findById(ReportID).populate('reportedBy').populate('taskCompleted').populate('category');

        if(!ReportsData){
            return res.status(400).json({
                success : false,
                message: "something went wrong while fetching Report!"
            })
        }
        return res.status(200).json({
            success : true , 
            data : ReportsData,
            count : ReportsData.length
        })
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Internal server error!" + err,
        })
    }
}


// Get reports  by categoryId
exports.getReportsByCategoryId = async (req,res,next) => {
    const categoryId  = req.params.id;
    try{
        // single level population : 
        // const taskData = await tasks.findById(taskID).populate('chats').populate('categories');
        // multi level population : 
        const reportData = await reports.find({category : categoryId}).populate("category").populate("reportedBy").populate("taskCompleted")

        if(!reportData){
            return res.status(400).json({
                success : false,
                message: "something went wrong while fetching report! or cannot find document"
            })
        }
        return res.status(200).json({
            success : true , 
            data : reportData,
            count : reportData.length
        })
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Internal server error!" + err,
        })
    }
}


exports.getReportByTaskId = async (req,res,next) => {
    if(req.params.id == null){
        return res.status(400).json({
            success : false,
            message : "send valid taskId"
        })
    }
    const taskId = req.params.id;
    try{
        const reportData = await reports.find({taskCompleted : taskId}).populate("category").populate("reportedBy").populate("taskCompleted")
        if(!reportData){
            return res.status(400).json({
                success : false,
                message: "something went wrong while fetching report! or cannot find document"
            })
        }
        return res.status(200).json({
            success : true , 
            data : reportData[0],
            count : 1
        })
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Internal server error!" + err,
        })
    }
}


exports.postReport = async (req,res,next) => {
    if(req.body.reportedDate == null || req.body.reportStatement == null || req.body.taskCompleted == null  || req.body.category == null || req.body.reportedBy == null   ){
        return res.status(404).json({
            success : false,
            message: "send valid details!"
        })
    }
    const postableData = {
        reportedDate : req.body.reportedDate,
        reportStatement : req.body.reportStatement , 
        reportedBy : req.body.reportedBy , 
        taskCompleted : req.body.taskCompleted ,
        category : req.body.category
      };

    try{
        const postedData = await reports.create(postableData);
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

// patch Reports
exports.patchReportById = async (req,res,next) => {
    if(!req.params.id){
        return res.status(404).json({
            success : false,
            message : "enter valid ReportID",
        })
    }

    const ReportID = req.params.id;

    // if data not in db:
    let dataInDB = await reports.findById({_id:ReportID});
    if(!dataInDB){
        return res.status(404).json({
            message : "cannot find document",
            success : false 
        })
    }
    
    if(req.body.reportedDate == null && req.body.reportStatement == null && req.body.reportedBy == null && req.body.taskCompleted == null && req.body.category == null ){
        return res.status(404).json({
            success : false,
            message : "send valid data to patch!"
        })
    }
    // fetching Report data 
    let ReportData;
    try{
        ReportData = await reports.findById(ReportID);
    }catch(err){
        return res.status(500).json({
            success : false, 
            message : "Internal server error while fetching Reports",err
        })
    }
    const patchableData = {
        reportedDate :  req.body.reportedDate || ReportData.reportedDate,
        reportStatement : req.body.reportStatement  || ReportData.reportStatement,
        reportedBy : req.body.reportedBy || ReportData.reportedBy,
        taskCompleted : req.body.taskCompleted || ReportData.taskCompleted,
        category :  req.body.category || ReportData.category
    }
    try{
        const patchedData = await reports.findByIdAndUpdate(ReportID , { $set: { ...patchableData } }, {new : true});
        if(!patchedData){
            return res.status(400).json({
                success : false,
                message : "something went wrong while patching Report!"
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


// delete Reports 
exports.deleteReportById = async (req,res,next) => {
    const ReportID = req.params.id;
    if(!ReportID){
        return res.status(404).json({
            success : false,
            message : "send valid ReportId"
        })
    }
    // if data not in db:
    let dataInDB = await reports.findById({_id:ReportID});
    if(!dataInDB){
        return res.status(404).json({
            message : "cannot find document",
            success : false 
        })
    }

    try{
        const deletedReportData = await reports.findByIdAndDelete(ReportID);
        if(!deletedReportData){
            return res.status(400).json({
                success : false,
                message : "something went wrong while deleting Report!"
            })
        }
        return res.status(200).json({
            success : true,
            data : deletedReportData,
            count : deletedReportData.length
        })    
    }catch(err){
        return res.status(500).json({
            success : false,
            message  : "Internal server error ",err
        })
    }
}


exports.deleteReportByTaskId = async (req,res,next) => {
    const taskId = req.params.id;
    if(taskId==null){
        return res.status(400).json({
            success : false,
            message : "send valid task Id"
        })
    }

    try{
        const checkReportWithTaskId = await reports.findOne({taskCompleted : taskId});
        if(!checkReportWithTaskId){
            return res.status(404).json({
                success : false,
                message : "cannot find document!"
            })
        }
        const deletedReportData = await reports.findOneAndDelete({taskCompleted : taskId});
        if(!deletedReportData){
            return res.status(400).json({
                success : false,
                message : "something else went wrong!"
            })
        }
        return res.status(200).json({
            success : true,
            data : deletedReportData
        })
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Internal server error" , err
        })
    }
}



exports.deleteManyReportsByCategoryId = async (req, res, next) => {
    const categoryId = req.params.id;
  
    if (!categoryId) {
      return res.status(404).json({
        success: false,
        message: "send valid categoryId",
      });
    }
  
    try {
      // Find and delete all tasks with the matching categoryId
      const deletedReportsData = await reports.deleteMany({ category: categoryId });
  
      if (!deletedReportsData) {
        return res.status(404).json({
          success: false,
          message: "No reports found with the given categoryId",
        });
      }
  
      return res.status(200).json({
        success: true,
        data: deletedReportsData,
        count: deletedReportsData.length,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        err,
      });
    }
  };

  exports.getStreaksByUserId = async (req, res, next) => { 
    try {
      const userId = req.params.id; 
    //   console.log("user id" , userId);
      const { currentStreak, longestStreak } = await calculateStreak(userId);
      return res.status(200).json({
        success: true,
        currentStreak,
        longestStreak,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Internal server error!" + err,
      });
    }
  };

  const calculateStreak = async (userId) => {
    try {
      const userReports = await reports.find({ reportedBy: userId }).sort({ reportedDate: 1 }).exec();
        // console.log(userReports);
      let currentStreak = 0;
      let longestStreak = 0;
      let previousDate;
  
      for (const report of userReports) {
        const currentDate = new Date(report.reportedDate);
        if (!previousDate) {
          previousDate = currentDate;
          currentStreak = 1;
        } else {
          const dayDifference = Math.ceil((currentDate - previousDate) / (1000 * 60 * 60 * 24));
          if (dayDifference === 1) {
            currentStreak++;
          } else if (dayDifference > 1) {
            currentStreak = 1;
          }
          previousDate = currentDate;
        }
          if (currentStreak > longestStreak) {
          longestStreak = currentStreak;
        }
        // console.log(currentStreak);
        // console.log(longestStreak);
      }
      return { currentStreak, longestStreak };
    } catch (err) {
      throw new Error('Error while calculating streak: ' + err.message);
    }
  };


  exports.getGraphData = async (req,res,next) => {
    const requestDates= req.body.dates;
    const userId = req.body.userId;
    if(requestDates == null || userId == null){
        return res.status(400).json({
            success : false,
            message : "send valid details!"
        })
    }
    try{
        const graphData = [];
        for (const date of requestDates) {

            const startDate = new Date(date);
            const endDate = new Date(date);
            endDate.setDate(endDate.getDate() + 1);

            const numberOfTasksCompleted = await reports
              .find({ reportedBy: userId, createdAt :  { $gte: startDate, $lt: endDate } })
              .countDocuments()
              .exec()
              ;
      
            graphData.push({ date: date, numberOfTasksCompleted: numberOfTasksCompleted });
        }
        // console.log(graphData);
        return res.status(200).json({
            success : true,
            data : graphData
        })
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Internal server error !" , err
        })
    }
  }