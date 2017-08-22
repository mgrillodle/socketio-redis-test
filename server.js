const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const redis = require('socket.io-redis');


let port = process.env.port || 3400;
app.get('/ping', (req, res)=>{
	console.log("ping request");
	res.json({response: "ok"});
});
app.get('/', function(req, res){
        res.sendFile(__dirname + '/index.html');
});


http.listen(port, function(){
        console.log('listening on *:', port);
});

io.adapter(redis({host:'127.0.0.1', port:6379}));
io.on('connection', (socket) => {
        socket.on('chat message', function(msg){
                io.emit('chat message', msg);
                console.log('message: ' + msg);
        });
        console.log('a user connected');
        socket.on('disconnect', function(){
                console.log('user disconnected');
        });
});

