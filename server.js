var routing = require("./routing.js");

var app = routing;

var server = app.listen("1024",function(){
   var host = server.address().address;
   var port = server.address().port;
})//服务器创建
var io = require('socket.io').listen(server);

io.on('connection', function (socket) {
  //socket.emit('news', { hello: 'world' });
  socket.on('addNews', function (data) {
    //console.log(data);
    io.sockets.emit('news', data);
  });
});//测试实时对话