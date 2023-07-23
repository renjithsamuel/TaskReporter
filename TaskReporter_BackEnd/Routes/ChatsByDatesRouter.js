const express = require('express');
const router = express.Router();

const {getChatByDates,getPreviousChats,getUniqueChatByDateById,postChatByDate,patchChatByDateById,deleteChatByDateById,deleteManyChatsByCategoryId} = require('../Controllers/ChatByDatesController');

router.get('/getChatByDates',getChatByDates);
router.get('/getPreviousChats',getPreviousChats);
router.get('/getUniqueChatByDateById/:id',getUniqueChatByDateById);
router.post('/postChatByDate',postChatByDate);
router.patch('/patchChatByDateById/:id',patchChatByDateById);
router.delete('/deleteChatByDateById/:id',deleteChatByDateById);
router.delete('/deleteManyChatsByCategoryId/:id',deleteManyChatsByCategoryId);



// socket
// Socket.io integration for chat events
const chatSocketHandler = (io) => {
    io.on('connection', (socket) => {
      // console.log('A user connected');
  
      socket.on('joinRoom', (room) => {
        socket.join(room); 
        // console.log(`User joined room: ${room}`);
        const roomClients = io.sockets.adapter.rooms.get(room);
        console.log(`Number of clients in room ${room}: ${roomClients ? roomClients.size : 0}`);
      });

      socket.on('disconnect', () => {
        console.log('A user disconnected');
      });
  
      socket.on('message', async (data) => {
        // Handle and store the message in the database
        try {
          io.to(data.room).emit('message', data);
        } catch (error) {
          console.error('Error while storing the message:', error);
        }
      });
    });
  };
  

module.exports = { chatSocketHandler , router};