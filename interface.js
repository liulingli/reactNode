var express = require("express"),
	MongoClient = require("mongodb").MongoClient,
	bodyParser = require('body-parser'),
	fs = require("fs"),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    multer  = require('multer'),
    app  = require('./routing.js');

var mongdbUrl = 'mongodb://localhost:27017/runoob';

app.get("/findFriend",function(req,res){
	MongoClient.connect(mongdbUrl,function(err,db){
		var collection = db.collection("cool");
		collection.find({"first_name":{$ne:null},$or:[{"first_name":req.query.val},{"id":req.query.val-0}]}).toArray(function(err,data){
			if(err){
				console.log(err)
			}else{
				db.close();
				for(var i in data){
					var thisData = data[i];
					if(thisData.avatar == "null" || thisData == null){
						thisData.avatar = "public/images/portrait.jpg";
					}
					delete thisData.last_password;
				}
				res.end(JSON.stringify(data));
			}
		});
	})
})//好友添加查询接口

app.get("/verification",function(req,res){
	if(req.query.first_name == req.session.status){
		res.end("3");
		return;
	}
	MongoClient.connect(mongdbUrl,function(err,db){
		var collection = db.collection("cool");
		collection.find({"first_name":req.query.first_name}).toArray(function(err,data){
			if(data[0].news){
				var newsData = data[0].news;
				newsData.push(req.query)
			}else{
				var newsData = [];
				newsData.push(req.query);
			}
			for(var i in data[0].news){
				if( data[0].news[i].first_name == req.query.first_name ){
					res.end("2")
					db.close();
					return;
				}
			}//请求已存在
			collection.update({"first_name":req.query.first_name},{$set:{"news":newsData}},function(err,result){
				if(err){
					console.log(err)
				}else{
					console.log("200")
					res.end("true")
				}
				db.close();
			})
		})
	})
})//验证消息

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
	    		collection.findAndModify({name:"uid"},[],{$inc:{id:1}},{new:true},function(err,result){
	    			response.id = result.value.id
	    			collection.insertMany([response], function(err, result) {
						res.redirect('./login');
						db.close();
				    });
	    		})
	    	}
	    })
	});
})//注册表单



