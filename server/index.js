const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const messagesRoutes = require('./routes/messages');
const socket = require("socket.io");
//const bodyParser = require('body-parser');

const app = express();
require('dotenv').config();
app.use(cors()); // for middleware to work
app.use(express.json()); // this is to 

app.use("/api/auth", userRoutes);
app.use("/api/messages", messagesRoutes);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=> console.log('MongoDB connected!')).catch(err => console.log(err));


const server = app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port: ${process.env.PORT}`);
}); // if request comes to this port, it will be handled by this server
//inside is the callback function that will be executed when server starts listening

const io = socket(server,{
    cors:{
        origin: "http://localhost:3000",
        credentials: true,
    },
});

global.onlineUsers = new Map();
io.on("connection", (socket)=>{
    global.chatSocket = socket;
    socket.on("add-user", (userId) =>{
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data)=>{
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-receive",data.message);
        }
    });
});