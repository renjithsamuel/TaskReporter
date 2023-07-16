const express = require('express');
const router = express.Router();
const cors = require('cors');

router.use(cors({origin : '*'}));

const {getReports,getUniqueReportById,getReportsByCategoryId,postReport,patchReportById,deleteReportById,deleteReportByTaskId,deleteManyReportsByCategoryId} = require('../Controllers/ReportsController');

router.get('/getReports',getReports);
router.get('/getUniqueReportById/:id',getUniqueReportById);
router.get('/getReportsByCategoryId/:id',getReportsByCategoryId);
router.post('/postReport',postReport);
router.patch('/patchReportById/:id',patchReportById);
router.delete('/deleteReportById/:id',deleteReportById);
router.delete('/deleteReportByTaskId/:id',deleteReportByTaskId);
router.delete('/deleteManyReportsByCategoryId/:id',deleteManyReportsByCategoryId);


module.exports = router;