var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/jquery-1.11.1.js', function(req, res){
  res.sendFile(__dirname + '/jquery-1.11.1.js');
});

io.on('connection', function(socket){
  console.log('a user connected');
  
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);

    io.emit('chat message', msg);
  });
});

http.listen(8888, function(){
  console.log('listening on *:8888');
});
