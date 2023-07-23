const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const config = require('config');
const app = express();

const socketio = require('socket.io')

app.use(express.json());
app.use(helmet());
// app.use(cors({origin:'*'}));

const allowedOrigins = [
    'https://taskreporter.vercel.app', 'https://taskreporter.vercel.app/dashboard' ,'https://taskreporter.vercel.app/chat' ,'https://taskreporter.vercel.app/reports' ,'https://taskreporter.vercel.app/settings',
    'http://localhost:5173', 'http://localhost:5173/dashboard' ,'http://localhost:5173/chat' ,'http://localhost:5173/reports' ,'http://localhost:5173/settings'

];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(null , false);
        }
    }
}));

// router imports 
const usersRoutes = require('./Routes/UsersRouter');
const tasksRoutes = require('./Routes/TasksRouter');
const reportsRoutes = require('./Routes/ReportsRouter');
const  {router : chatByDateRoutes , chatSocketHandler} = require('./Routes/ChatsByDatesRouter');
const categoriesRoutes = require('./Routes/CategoriesRouter');


// const mongoDBString = `mongodb://0.0.0.0:27017/taskReporter`;
const mongoDBString = `mongodb+srv://${config.get('DBNAME')}:${config.get('DBPASSWORD')}@cluster0.gp8dend.mongodb.net/TaskReporter?retryWrites=true&w=majority`;

mongoose.connect(mongoDBString,{
        useNewUrlParser : true,
        useUnifiedTopology : true
    }).then(()=>{console.log("connected to database!")}).catch((err)=>{console.log("error while connecting with db " + err)})

app.get('/api/v1/health',(req,res,next)=>{
    return res.status(200).json({
        success : true,
        message : "everything is working perfectly!"
    })
})

app.use('/api/v1/users',usersRoutes);
app.use('/api/v1/tasks',tasksRoutes);
app.use('/api/v1/reports',reportsRoutes);
app.use('/api/v1/chatByDates',chatByDateRoutes);
app.use('/api/v1/categories',categoriesRoutes);


const port = process.env.PORT || 3000;

const server = app.listen(port , ()=>{
    console.log("listening to port",port);
})

const io = socketio(server,{
    cors:{
        // origin : '*'
        origin : allowedOrigins
    }
})
// chat socket handler
chatSocketHandler(io);

