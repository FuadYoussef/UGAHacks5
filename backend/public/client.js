//client.js
//const io = require('socket.io-client');

//for reference, msg is the data I receive from the server in all of the response handlers

const socket = io.connect('http://localhost:3000', {reconnect: true});

// Add a connect listener
socket.on('connect', function (socket) {
    console.log('Connected!');
});


var usernameText = document.getElementById("username");
var roomcodeText = document.getElementById("roomcode");
var createRoomButton = document.getElementById("cr");
var joinRoomButton = document.getElementById("jr");
var ui = document.getElementById("ui"); //this is the <div></div> section of the html that we replace




socket.on('createRoomResponseFromServer', function (msg) { //handler for the response that comes from server after client creates a room

    //what this code does is add the new room we created to the list called "rooms" in index to html
    var rooms = document.getElementById("rooms");
    var node = document.createElement("LI");                 // Create a <li> node
    var textnode = document.createTextNode(msg.roomcode);         // Create a text node
    node.appendChild(textnode);                              // Append the text to <li>
    rooms.appendChild(node);     // Append <li> to <ul> with id="myList"
});



socket.on('roomsUpdate', function (msg) { //when a new client connects to the server, this handler displays the list of existing rooms to join
    roomCodeArray = JSON.parse(msg);
    console.log(roomCodeArray)
    for (var i = 0; i < roomCodeArray.length; i++) {
        console.log("printing", roomCodeArray[i])
        //what this code does is add elements to the list called "rooms" in index to html
        var rooms = document.getElementById("rooms");
        var node = document.createElement("LI");                 // Create a <li> node
        var textnode = document.createTextNode(roomCodeArray[i]);         // Create a text node
        node.appendChild(textnode);                              // Append the text to <li>
        rooms.appendChild(node);
    }
});

socket.on('joinRoomResponseFromServer', function (msg) {//handler for the response that comes from server after client joins a room
   /* var rooms = document.getElementById("rooms");
    var node = document.createElement("LI");                 // Create a <li> node
    var textnode = document.createTextNode(msg.roomcode);         // Create a text node
    node.appendChild(textnode);                              // Append the text to <li>
    rooms.appendChild(node);   */  // Append <li> to <ul> with id="myList"
});




socket.on('enterRoom', function (msg, newRoom) {
    ui.innerHTML='<p><strong>'+"Welcome "+msg.username+ " to room " + msg.roomcode+" Your fellow players are: "+'</strong></p><br><ul id="players"></ul>'
    for (p in newRoom.players) {
        var rooms = document.getElementById("players");
        var node = document.createElement("LI");                 // Create a <li> node
        var textnode = document.createTextNode(p);         // Create a text node
        node.appendChild(textnode);                              // Append the text to <li>
        rooms.appendChild(node);     // Append <li> to <ul> with id="myList"
    }
});

socket.on('player joined', function (msg) {
    console.log(msg.username,"has joined the room");
});



createRoomButton.addEventListener('click', function () { //when the createRoom button is pressed, send the username and room code to the server
    socket.emit("create", {
        username: usernameText.value,
        roomcode: roomcodeText.value
    });
});
joinRoomButton.addEventListener('click', function () {//when the joinRoom button is pressed, send the username and room code to the server
    socket.emit("join", {
        username: usernameText.value,
        roomcode: roomcodeText.value
    });


});
