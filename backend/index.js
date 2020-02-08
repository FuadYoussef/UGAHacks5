const express = require('express');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
let roomCodes = [];
var Rooms = [];
app.use(express.static('public'));
app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html');
});
app.get('/wait', function(req,res){
    res.sendFile(__dirname + '/waiting.html');
});

io.on('connection', function(socket){
    const toSendJSON = JSON.stringify(roomCodes);
    console.log("to send json ", toSendJSON);
    socket.emit("room update", toSendJSON);
    console.log('a user connected');
    socket.on('create', function(msg, usr){
        if (!roomCodes.includes(msg.roomcode)) {
            roomCodes.push(msg.roomcode);
            var newRoom = {roomcode: msg.roomcode, players: [msg.username]};
            console.log(newRoom);
            Rooms.push(newRoom);
            console.log(Rooms);
            io.emit('createresp', msg);
            io.to(socket.id).emit('enterroom', msg, newRoom);
            socket.join(msg.roomcode);
        }
    });
    socket.on('join', function(msg, usr){
        if (roomCodes.includes(msg.roomcode)) {
            io.emit('joinresp', msg);
            var newRoom;
            console.log("join");
            console.log(Rooms);
            for(r in Rooms) {
                console.log(r);
                console.log("made it here1");
                if (r["roomcode"] === msg.roomcode) {
                    r.players.push(msg.username);
                    console.out("made it here")
                    newRoom = r;
                }
                io.to(socket.id).emit('enterroom', msg, newRoom);
                socket.join(msg.roomcode);
            }

        }
    });
});

http.listen(3000,function(){
    console.log('listening on *:3000');
});