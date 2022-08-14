const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const app = express();
const server = http.createServer(app);

const io = socketio(server);

app.use(express.static('public'));
// or app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
    console.log('New Ws connection');
    socket.emit('message', 'Welcome to the pChat');
    // to the single client
    // Broadcast when a user connects
    
    socket.broadcast.emit('message', 'A  user has joined the chat');
    // to all clients except the user who connects

    // io.emit()
    // to all clients

    // Runs when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat');
    })
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {console.log(`Server running on port ${PORT}`);});