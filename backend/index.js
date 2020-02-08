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


io.on('connection', function(socket){

    //these lines refresh the available rooms to join on all of the clients
    const toSendJSON = JSON.stringify(roomCodes);
    socket.emit("roomsUpdate", toSendJSON);
    console.log("rooms",Rooms);


    socket.on('create', function(msg){
        //when the client presses the create button, handle it here
        //msg.roomcode is the roomcode that the user entered, msg.username is the username entered
        if (!roomCodes.includes(msg.roomcode)) {
            //if the room is actually a new room, add it to the list of rooms
            roomCodes.push(msg.roomcode);
            var newRoom = {roomcode: msg.roomcode, players: [msg.username]};
            console.log(newRoom);
            Rooms.push(newRoom);
            console.log(Rooms);
            io.emit('createRoomResponseFromServer', msg); //send a message back to all other sockets that a new room was created
            io.to(socket.id).emit('enterRoom', msg, newRoom); //send a message back to the socket that created the room to join the room it created
            socket.join(msg.roomcode);
        }
    });


    socket.on('join', function(msg){
        //when the client presses the join button, handle it here
        //msg.roomcode is the roomcode that the user entered, msg.username is the username entered
        if (roomCodes.includes(msg.roomcode)) {
            //if the room actually exists
            io.emit('joinRoomResponseFromServer', msg);
            var newRoom;
            for(var i = 0; i < Rooms.length; i++) { //find the room that corresponds to the requested room code and add the player to that room
                if (Rooms[i]["roomcode"] === msg.roomcode) {
                    Rooms[i].players.push(msg.username);
                    newRoom = Rooms[i];
                    console.log("made it here")
                }
                io.to(socket.id).emit('enterRoom', msg, newRoom);//send a message back to the socket that pressed the button to join the room
                socket.join(msg.roomcode);
            }
        }
        io.to(msg.roomcode).emit('player joined', msg);
    });
});

http.listen(3000,function(){ //necessary to setup the server
    console.log('listening on *:3000');
});