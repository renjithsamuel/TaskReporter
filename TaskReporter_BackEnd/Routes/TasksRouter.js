const express = require('express');
const router = express.Router();

const {getTasks,getUniqueTaskById,getTasksByCategoryId,postTask,patchTaskById,deleteTaskById,deleteManyTasksByCategoryId} = require('../Controllers/TasksController');

router.get('/getTasks',getTasks);
router.get('/getUniqueTaskById/:id',getUniqueTaskById);
router.get('/getTasksByCategoryId/:id',getTasksByCategoryId);
router.post('/postTask',postTask);
router.patch('/patchTaskById/:id',patchTaskById);
router.delete('/deleteTaskById/:id',deleteTaskById);
router.delete('/deleteManyTasksByCategoryId/:id',deleteManyTasksByCategoryId);


module.exports = router;