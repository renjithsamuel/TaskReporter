const express = require('express');
const router = express.Router();

const {getUsers,getUniqueUserById,getUserByData,getUserByEmail,postUser,patchUserById,patchManyUserWithInvites,deleteUserById} = require('../Controllers/UsersController');

router.get('/getUsers',getUsers);
router.get('/getUniqueUserById/:id',getUniqueUserById);
router.post('/getUserByData',getUserByData);
router.post('/getUserByEmail',getUserByEmail);
router.post('/postUser',postUser);
router.patch('/patchUserById/:id',patchUserById);
router.patch('/patchManyUserWithInvites',patchManyUserWithInvites);
router.delete('/deleteUserById/:id',deleteUserById);


module.exports = router;