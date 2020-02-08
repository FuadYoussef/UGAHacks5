const express = require('express');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
let roomCodes = [];
app.use(express.static('public'));
app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html');
});
app.get('/wait', function(req,res){
    res.sendFile(__dirname + '/waiting.html');
});

io.on('connection', function(socket){
    var nsp;
    console.log('a user connected');
    socket.on('create', function(msg, usr){

        if (!roomCodes.includes(msg.roomcode)) {
            roomCodes.push(msg.roomcode);
            io.emit('createresp', msg);
            io.to(socket.id).emit('enterroom', msg);
            console.log(roomCodes)
            socket.join(msg);
            console.log(msg)
            console.log(usr)
        }
    });
    socket.on('join', function(msg, usr){
        if (roomCodes.includes(msg.roomcode)) {
            io.emit('joinresp', msg);
            console.log(roomCodes)
            socket.join(msg);
            console.log(msg)
            console.log(usr)
        }
    });
});

http.listen(3000,function(){
    console.log('listening on *:3000');
});