const express = require('express');
const router = express.Router();
const cors = require('cors');

router.use(cors({origin : '*'}));

const {getChatByDates,getUniqueChatByDateById,postChatByDate,patchChatByDateById,deleteChatByDateById} = require('../Controllers/ChatByDatesController');

router.get('/getChatByDates',getChatByDates);
router.get('/getUniqueChatByDateById/:id',getUniqueChatByDateById);
router.post('/postChatByDate',postChatByDate);
router.patch('/patchChatByDateById/:id',patchChatByDateById);
router.delete('/deleteChatByDateById/:id',deleteChatByDateById);


module.exports = router;