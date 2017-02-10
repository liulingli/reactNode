var routing = require("./routing.js");

var app = routing;

var server = app.listen("1024",function(){
   var host = server.address().address;
   var port = server.address().port;
})//服务器创建

