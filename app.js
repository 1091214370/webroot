//supervisor app.js 自动重启服务器
var express= require('express');
var path =require('path');
var _=require('underscore');
var mongoose=require('mongoose');
var Webdb=require('./models/webdb');
var Takein=require('./models/takein');
var Blog=require('./models/blog');
var port =process.env.PORT||3000;
var bodyParser = require('body-parser'); 
var app =express();

mongoose.connect('mongodb://127.0.0.1:27017/nodeweb');
mongoose.Promise = global.Promise;
app.set('views','./view/page');
app.set("view cache",true);
app.set('view engine','ejs');


app.use(bodyParser.json() );// 格式化表单提交
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public',{
	maxAge:'0',//no cache
	etag:true
}));
app.locals.moment=require('moment');
app.listen(port);

console.log('server start on port '+port);
//index 	
app.get("/",function(req,res){
	Webdb.fetch(
		function(err,webs){
			if(err){
				console.log(err);
			}
			Takein.fetch(
				function(err,takeins){
					if(err){
						console.log(err);
					}
					Blog.fetch(
						function(err,blogs){
							if(err){
								console.log(err);
							}
							res.render('index',{title:'首页', "webs":webs,"takeins":takeins,"blogs":blogs});
						})
				})
		});
	
});	
//login
app.get("/login",function(req,res){
	res.render('login',{title:'登录页面'});
});

//upload
app.get("/upload",function(req,res){
	res.render('upload',{title:'上传页面'});
});
//admin
app.get("/admin",function(req,res){
	res.render('admin',{title:'管理页面'});
});
//admin/newweb
app.post('/admin/newweb',function(req,res) {
	var id = req.body.id;
	var title =req.body.title;
	var summary =req.body.summary;
	var sumsrc =req.body.sumsrc;
	var github =req.body.github;
    var image =req.body.image;
 	var _web;
  _web = new Webdb({
  	title:title,
  	summary:summary,
    image:image,
    sumsrc:sumsrc,
    github:github
  });
  _web.save(function(err,web) {
  	if(err){
  		console.log(err);
  	}
  	res.redirect('/list/web');
  });
})
//admin/newtakein
app.post('/admin/newtakein',function(req,res) {
	var id = req.body.id;
	var title =req.body.title;
	var summary =req.body.summary;
	var sumsrc =req.body.sumsrc;
	var github =req.body.github;
 	var image =req.body.image;
  var _web;
  _web = new Takein({
  	title:title,
  	summary:summary,
    image:image,
    sumsrc:sumsrc,
    github:github
  });
  _web.save(function(err,takein) {
  	if(err){
  		console.log(err);
  	}
  	res.redirect('/list/takein');
  });
})
//admin/newblog
app.post('/admin/newblog',function(req,res) {
	var id = req.body.id;
	var title =req.body.title;
	var summary =req.body.summary;
	var sumsrc =req.body.sumsrc;
	var github =req.body.github;
	var image =req.body.image;
  var _web;
  _web = new Blog({
  	title:title,
  	summary:summary,
    image:image,
    sumsrc:sumsrc,
    github:github
  });
  _web.save(function(err,blog) {
  	if(err){
  		console.log(err);
  	}
  	res.redirect('/list/blog');
  });
})
//web list
app.get("/list/web",function(req,res){
	Webdb.fetch(
		function(err,webs){
			if(err){
				console.log(err);
			}
			res.render('web',{title:'web列表页',"webs":webs});
		});
})
//takein list
app.get("/list/takein",function(req,res){
	Takein.fetch(
		function(err,takeins){
			if(err){
				console.log(err);
			}
			res.render('takein',{title:'插件列表页',"takeins":takeins});
		});
})
//blog list
app.get("/list/blog",function(req,res){
	Blog.fetch(
		function(err,blogs){
			if(err){
				console.log(err);
			}
			res.render('blog',{title:'博客列表页',"blogs":blogs});
		});
})



