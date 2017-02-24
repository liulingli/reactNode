var express = require("express"),
	React = require('react'),
	babel = require("babel-register"),
	login = require("./reactModel/login.js"),//登录模块
	index = require("./reactModel/index.js"),//首页模块
	form = require("./reactModel/form.js"),//首页模块
	registered = require("./reactModel/registered.js"),//注册模块
	MongoClient = require("mongodb").MongoClient,
	bodyParser = require('body-parser'),
	fs = require("fs"),
	expressHogan = require('express-hogan.js'),
    cookieParser = require('cookie-parser'),
	ejs = require('ejs'),
    session = require('express-session'),
    multer  = require('multer');

var app = express(),mongdbUrl = 'mongodb://localhost:27017/runoob';
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.engine('.html',ejs.__express);//使用ejs解析html模板

app.set('view engine', 'html');

app.use('/public',express.static(__dirname + '/public'));//静态文件路径设置

app.use(multer({ dest: 'public/upload/'}).array('avatar'));

app.use(cookieParser());
app.use(session({
    secret: 'hubwiz app', //secret的值建议使用随机字符串
    cookie: {maxAge: 10000*60}, // 过期时间（毫秒）
    resave:true,
    saveUninitialized: true
}));//session设置


app.get("/",function(req,res){
	var statusJson = {status:req.session.status?req.session.status:false}
	console.log(req.session.status)
	res.render("index",{component:index(!!req.session.status),status:req.session.status});
})//首页

app.get("/login",function(req,res){
	res.render("login",{component:login()});
})//登录

app.get("/registered",function(req,res){
	res.render("registered",{component:registered()});
})//注册

app.get("/form",function(req,res){
	res.render("form",{component:form()})
})//表单提交


app.get("/cancelLogin",function(req,res){
	req.session.status = false;
	res.redirect('./');
})//退出登录*/

app.post("/form_file",urlencodedParser,function(req,res){
    console.log(req.files[0]);

	var des_file = __dirname + "/" + req.files[0].originalname;

    fs.readFile(req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
         	if(err){
            	console.log(err);
         	}else{
               /* MongoClient.connect(mongdbUrl,function(err,db){
                	var collection = db.collection("cool");
                	//collection
                })*/
          	}
          	res.end("a");
       });
    });

})//文件提交表单

app.post("/process_login",urlencodedParser,function(req,res){
	MongoClient.connect(mongdbUrl, function(err, db) {
		var collection = db.collection('cool');
		collection.find({"first_name":req.body.name}).toArray(function(err,data){
			if(!data.length){
				res.end("该账户未注册")
			}else if(data[0].last_password != req.body.password){
				res.end('密码错误');
			}else{
				req.session.status = req.body.name;
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