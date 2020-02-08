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

socket.on('createresp', function (msg) {
    var rooms = document.getElementById("rooms");
    var node = document.createElement("LI");                 // Create a <li> node
    var textnode = document.createTextNode(msg.roomcode);         // Create a text node
    node.appendChild(textnode);                              // Append the text to <li>
    rooms.appendChild(node);     // Append <li> to <ul> with id="myList"
});
socket.on('joinresp', function (msg) {
    var rooms = document.getElementById("rooms");
    var node = document.createElement("LI");                 // Create a <li> node
    var textnode = document.createTextNode(msg.roomcode);         // Create a text node
    node.appendChild(textnode);                              // Append the text to <li>
    rooms.appendChild(node);     // Append <li> to <ul> with id="myList"
});

socket.on('enterroom', function (msg) {
    ui.innerHTML='<p><strong>'+msg.roomcode+" "+msg.username+'</strong></p>'
});



cr.addEventListener('click', function () {
    socket.emit("create", {
        username: un.value,
        roomcode: rc.value
    });
});
jr.addEventListener('click', function () {
    socket.emit("join", {
        username: un.value,
        roomcode: rc.value
    });
});
