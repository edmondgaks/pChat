const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const app = express();
const server = http.createServer(app);
const formatMessage = require('./utils/messages');
const {userJoin,getCurrentUser} = require('./utils/users');
const io = socketio(server);

app.use(express.static('public'));
// or app.use(express.static(path.join(__dirname, 'public')));
const botName = 'Chatbot';

io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id,username,room);
        socket.join(user.room);
        // console.log('New Ws connection');
        socket.emit('message', formatMessage(botName,'Welcome to the pChat'));
        // to the single client
        // Broadcast when a user connects
    
        socket.broadcast.to(user.room).emit('message',formatMessage(botName, `${user.username} has joined the chat`));
        // to all clients except the user who connects
    
        // io.emit()
        // to all clients
    });

    // Runs when client disconnects
    // Listen to chat message
    socket.on('chatmessage', (msg) => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message', formatMessage(user.username,msg));
    })
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(botName,'A user has left the chat'));
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {console.log(`Server running on port ${PORT}`);});