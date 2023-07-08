const express = require('express');
const router = express.Router();
const cors = require('cors');

router.use(cors({origin : '*'}));

const {getChats,getUniqueChatById,postChat,patchChatById,deleteChatById} = require('../Controllers/ChatsController');

router.get('/getChats',getChats);
router.get('/getUniqueChatById/:id',getUniqueChatById);
router.post('/postChat',postChat);
router.patch('/patchChatById/:id',patchChatById);
router.delete('/deleteChatById/:id',deleteChatById);


module.exports = router;