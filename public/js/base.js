var socket = io.connect("");
socket.on("online",function(data){
	$.ajax({
		type:"GET",
		url:"http://localhost:1024/returnname",
		success:function(data){
			socket.emit("collect",{name:data});
		}
	})
})//返回当前用户
socket.on("message",function(data){
	console.log(data)
})//收到私聊消息
