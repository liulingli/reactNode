var routing = require("./routing.js"),
	interface = require("./interface.js"),
	MongoClient = require("mongodb").MongoClient;

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
    var newData = data;
    MongoClient.connect("mongodb://localhost:27017/runoob",function(err,db){
		var collection = db.collection("cool");
	    collection.find({"first_name":data.name}).toArray(function(err,data){
			if(err){
				console.log(err)
			}else{
				db.close();
				newData.avatar = data[0].avatar && data[0].avatar != "null" ?data[0].avatar:"public/images/portrait.jpg";
				io.sockets.emit('news', newData);
			}
		})
    })
  });
});//测试实时对话