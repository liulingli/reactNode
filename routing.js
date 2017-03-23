var server = require("./server.js")
	React = require('react'),
	babel = require("babel-register"),
	login = require("./reactModel/login.js"),//登录模块
	index = require("./reactModel/index.js"),//首页模块
	form = require("./reactModel/form.js"),//首页模块
	registered = require("./reactModel/registered.js"),//注册模块
	chatroom = require("./reactModel/chatroom.js"),//聊天室模块
	friend = require("./reactModel/friend.js"),//好友列表模块
	friendAdd = require("./reactModel/friendAdd.js"),//添加好友模块
	news = require("./reactModel/news.js");//消息中心模块

var mongdbUrl = server.mongodbUrl,
	MongoClient = server.mongodb,
	app = server.app;

app.get("/",function(req,res){
	var statusJson = req.session.status?req.session.status:"未登录";
	res.render("index",{component:index(statusJson),status:statusJson});
})//首页

app.get("/login",function(req,res){
	res.render("login",{component:login()});
})//登录

app.get("/news",function(req,res){
	if(!req.session.status){
		res.redirect('./login');
		return;
	}
	MongoClient.connect(mongdbUrl,function(err,db){
		var collection = db.collection("cool");
		collection.find({"first_name":req.session.status}).toArray(function(err,data){
			res.render("news",{component:news(data[0].news?data[0].news:[]),news:JSON.stringify(data[0].news)});
		})
	})
})//消息中心

app.get("/registered",function(req,res){
	res.render("registered",{component:registered()});
})//注册

app.get("/chatroom",function(req,res){
	if(!req.session.status){
		res.redirect('./login');
		return;
	}
	res.render("chatroom",{component:chatroom(),name:req.session.status});
})//聊天室

app.get("/cancelLogin",function(req,res){
	req.session.status = false;
	res.redirect('./');
})//退出登录

app.get("/form",function(req,res){
	if(req.session.status){
		MongoClient.connect(mongdbUrl,function(err,db){
			var collection = db.collection("cool");
			collection.find({"first_name":req.session.status}).toArray(function(err,data){
				if(err){
					console.log(err)
				}else{
					db.close();
					var avatar = data[0].avatar && data[0].avatar != "null" ?data[0].avatar:"public/images/portrait.jpg";
					res.render("form",{component:form(avatar),avatar:avatar})
				}
			})
		})
	}else{
		res.redirect('./login');
	}
})//头像设置

app.get("/friend",function(req,res){
	if(!req.session.status){
		res.redirect('./login');
		return;
	}
	MongoClient.connect(mongdbUrl,function(err,db){
		var collection = db.collection("cool");
		collection.find({"id":req.session.thisData.id,"first_name":{$ne:null}}).toArray(function(err,data){
			res.render("friend",{component:friend(data[0].friend),friendList:JSON.stringify(data[0].friend)});
		})
	})
})//好友列表

app.get("/addFriend",function(req,res){
	if(!req.session.status){
		res.redirect('./login');
		return;
	}
	res.render("friendAdd",{component:friendAdd(),name:req.session.status});
})//查找好友

module.exports = app;