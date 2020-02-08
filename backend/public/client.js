//client.js
//const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000', {reconnect: true});

// Add a connect listener
socket.on('connect', function (socket) {
    console.log('Connected!');
});

var un = document.getElementById("username");
var rc = document.getElementById("roomcode");
var cr = document.getElementById("cr");
var jr = document.getElementById("jr");
var ui = document.getElementById("ui");

cr.addEventListener('click', function () {
    socket.emit("create", {
        username: un.value,
        roomcode: rc.value
    });
});