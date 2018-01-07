var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

let username= [];

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});


io.on('connection', function (socket) {
    console.log(socket.id);
    console.log('a user connected');
    io.emit('username', 'enter user name');

    socket.on('username', function (name) {
        username.push(
            {
                name : name,
                id : socket.id
            }
        );
        
        console.log(username);

    });


    socket.on('disconnect', function () {
        console.log('user disconnected');
    });


    socket.on('chat message', function (msg) {
        let id = socket.id;
        let user ="";
                for (i = 0; i < username.length; i++) { 
                    if (username[i].id == id) {
                    user =  username[i].name;
                    }
                }

        io.emit('chat message', msg, user);
    });
});



http.listen(3001, function () {
    console.log('listening on *:3001');
});
