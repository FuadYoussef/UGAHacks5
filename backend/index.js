const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('username', function(msg){
        io.emit('username', msg);
        console.log(msg)
    });
})

http.listen(3000,function(){
    console.log('listening on *:3000');
});