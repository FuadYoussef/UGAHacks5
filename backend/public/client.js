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
socket.on('room update', function (msg) {
    console.log("msg is " + msg );
    pmsg = JSON.parse(msg);
    console.log("pmsg is ", pmsg );
    console.log("pmsg 0", pmsg[0]);
    for (m in pmsg) {
        console.log("printing " + m)
        var rooms = document.getElementById("rooms");
        var node = document.createElement("LI");                 // Create a <li> node
        var textnode = document.createTextNode(m);         // Create a text node
        node.appendChild(textnode);                              // Append the text to <li>
        rooms.appendChild(node);
    }
});

socket.on('joinresp', function (msg) {
   /* var rooms = document.getElementById("rooms");
    var node = document.createElement("LI");                 // Create a <li> node
    var textnode = document.createTextNode(msg.roomcode);         // Create a text node
    node.appendChild(textnode);                              // Append the text to <li>
    rooms.appendChild(node);   */  // Append <li> to <ul> with id="myList"
});

socket.on('enterroom', function (msg, newRoom) {
    ui.innerHTML='<p><strong>'+"Welcome "+msg.username+ " to room " + msg.roomcode+" Your fellow players are: "+'</strong></p><br><ul id="players"></ul>'
    for (p in newRoom.players) {
        var rooms = document.getElementById("players");
        var node = document.createElement("LI");                 // Create a <li> node
        var textnode = document.createTextNode(p);         // Create a text node
        node.appendChild(textnode);                              // Append the text to <li>
        rooms.appendChild(node);     // Append <li> to <ul> with id="myList"
    }
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
