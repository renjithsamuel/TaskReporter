const express = require('express');
const router = express.Router();
const cors = require('cors');

router.use(cors({origin : '*'}));

const {getUsers,getUniqueUserById,postUser,patchUserById,deleteUserById} = require('../Controllers/UsersController');

router.get('/getUsers',getUsers);
router.get('/getUniqueUserById/:id',getUniqueUserById);
router.post('/postUser',postUser);
router.patch('/patchUserById/:id',patchUserById);
router.delete('/deleteUserById/:id',deleteUserById);


module.exports = router;