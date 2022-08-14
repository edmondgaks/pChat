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
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {console.log(`Server running on port ${PORT}`);});