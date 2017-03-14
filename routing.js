var express = require("express"),
	React = require('react'),
	babel = require("babel-register"),
	login = require("./reactModel/login.js"),//登录模块
	index = require("./reactModel/index.js"),//首页模块
	form = require("./reactModel/form.js"),//首页模块
	registered = require("./reactModel/registered.js"),//注册模块
	chatroom = require("./reactModel/chatroom.js"),//聊天室模块
	MongoClient = require("mongodb").MongoClient,
	bodyParser = require('body-parser'),
	fs = require("fs"),
	expressHogan = require('express-hogan.js'),
    cookieParser = require('cookie-parser'),
	ejs = require('ejs'),
    session = require('express-session'),
    multer  = require('multer');

var app = express(),mongdbUrl = 'mongodb://localhost:27017/runoob';


app.engine('.html',ejs.__express);//使用ejs解析html模板

app.set('view engine', 'html');

app.use('/public',express.static(__dirname + '/public'));//静态文件路径设置

//app.use(multer({ dest: 'public/upload/'}).array('avatar'));//图片保存路径

app.use(cookieParser());
app.use(session({
    secret: 'hubwiz app', //secret的值建议使用随机字符串
    cookie: {maxAge: 1000000*60}, // 过期时间（毫秒）
    resave:true,
    saveUninitialized: true
}));//session设置

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/upload/');
    },
    filename: function (req, file, cb) {
    	var suffixName = file.originalname.split(".")
        cb(null, "img" + Date.now() + "." + suffixName[suffixName.length-1]);  
    }
});

app.use(multer({storage:storage}).array('avatar'))//图片保存
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/",function(req,res){
	var statusJson = req.session.status?req.session.status:"未登录";
	res.render("index",{component:index(statusJson),status:statusJson});
})//首页

app.get("/login",function(req,res){
	res.render("login",{component:login()});
})//登录

app.get("/login",function(req,res){
	res.render("login",{component:login()});
})//登录

app.get("/registered",function(req,res){
	res.render("registered",{component:registered()});
})//注册

app.get("/chatroom",function(req,res){
	if(!req.session.status){
		res.redirect('./login');
	}
	res.render("chatroom",{component:chatroom(),name:req.session.status});
})//聊天室

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
})//表单提交页面

app.get("/cancelLogin",function(req,res){
	req.session.status = false;
	res.redirect('./');
})//退出登录*/

app.post("/form_file",function(req,res){
    MongoClient.connect(mongdbUrl,function(err,db){
    	var collection = db.collection("cool");
    	collection.find({"first_name":req.session.status}).toArray(function(err,data){
    		var history = data[0].avatar;
    		var imgPath = req.files[0].path.split("\\").join("/")
			collection.update({"first_name":data[0].first_name}, {$set:{"avatar":imgPath}}, function(err,result){
				if(err){
					console.log(err);
				}else{
					if(history){
						fs.unlink(history,function(err){
							if(err){console.log(err)}
						})
					}
					db.close();
    				res.redirect("./")
				}
			})
    	})
    })
})//文件提交表单(头像)

app.post("/process_login",function(req,res){
	MongoClient.connect(mongdbUrl, function(err, db) {
		var collection = db.collection('cool');
		collection.find({"first_name":req.body.name}).toArray(function(err,data){
			if(!data.length){
				db.close();
				res.end("该账户未注册")
			}else if(data[0].last_password != req.body.password){
				db.close();
				res.end('密码错误');
			}else{
				db.close();
				req.session.status = req.body.name;
				res.redirect('./');
			}
		})
	})
})//登录表单

app.post("/process_registered",function(req,res){
	var response = {
       first_name:req.body.name,
       last_password:req.body.password,
       avatar:"null"
    };
    MongoClient.connect(mongdbUrl, function(err, db) {
	    var collection = db.collection('cool');
	    collection.find({"first_name":req.body.name}).toArray(function(err,docs){
	    	if(docs.length){
	    		res.send("该账号已被注册");
	    		db.close();
	    	}else{ 
	    		collection.insertMany([response], function(err, result) {
					res.redirect('./login');
					db.close();
			    });
	    	}
	    })
	});
})//注册表单

module.exports = app;