var express = require("express"),
	React = require('react'),
	babel = require("babel-register"),
	login = require("./reactModel/login.js"),
	MongoClient = require("mongodb").MongoClient,
	bodyParser = require('body-parser'),
	registered = require("./reactModel/registered.js"),
	expressHogan = require('express-hogan.js'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
	index = require("./reactModel/index.js");

var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(cookieParser());
app.use(session({
    secret: 'hubwiz app', //secret的值建议使用随机字符串
    cookie: {maxAge: 10000*60}, // 过期时间（毫秒）
    resave:true,
    saveUninitialized: true
}));//session设置


app.get("/",function(req,res){
	var statusJson = {status:!!req.session.status} 
	res.end(index(statusJson));
})//首页

app.get("/login",function(req,res){
	res.end(login());
})//登录

app.get("/registered",function(req,res){
	res.end(registered());
})//注册

app.get("/cancelLogin",function(req,res){
	req.session.status = false;
	res.redirect('./');
})//退出登录

app.post("/process_login",urlencodedParser,function(req,res){
	MongoClient.connect('mongodb://localhost:27017/runoob', function(err, db) {
		var collection = db.collection('cool');
		collection.find({"first_name":req.body.name}).toArray(function(err,data){
			if(!data.length){
				res.end("该账户未注册")
			}else if(data[0].last_password != req.body.password){
				res.end('密码错误');
			}else{
				req.session.status = true;
				res.redirect('./');
			}
		})
	})
})//登录表单

app.post("/process_registered",urlencodedParser,function(req,res){
	var response = {
       first_name:req.body.name,
       last_password:req.body.password
    };
    MongoClient.connect('mongodb://localhost:27017/runoob', function(err, db) {
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