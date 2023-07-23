const express = require('express');
const router = express.Router();

const {getReports,getUniqueReportById,getReportsByCategoryId,getReportByTaskId,postReport,patchReportById,deleteReportById,deleteReportByTaskId,deleteManyReportsByCategoryId} = require('../Controllers/ReportsController');

router.get('/getReports',getReports);
router.get('/getUniqueReportById/:id',getUniqueReportById);
router.get('/getReportsByCategoryId/:id',getReportsByCategoryId);
router.get('/getReportByTaskId/:id',getReportByTaskId);
router.post('/postReport',postReport);
router.patch('/patchReportById/:id',patchReportById);
router.delete('/deleteReportById/:id',deleteReportById);
router.delete('/deleteReportByTaskId/:id',deleteReportByTaskId);
router.delete('/deleteManyReportsByCategoryId/:id',deleteManyReportsByCategoryId);


module.exports = router;