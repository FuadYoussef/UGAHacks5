const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
let roomCodes = [];
app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    var nsp;
    console.log('a user connected');
    socket.on('create', function(msg, usr){
        io.emit('username', msg);
        roomCodes.push(msg);
        nsp = io.of('/' + msg);
        socket.join(msg);
        console.log(msg)
        console.log(usr)
    });
    socket.on('roomcode', function(msg, usr){
        io.emit('roomcode', msg);
        console.log(msg);
        socket.join(msg);
    });
});

http.listen(3000,function(){
    console.log('listening on *:3000');
});