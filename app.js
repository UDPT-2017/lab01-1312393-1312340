var express = require('express');
var ect = require('ect');
var app = express();

var renderer = ect({
  root: __dirname + 'views',
  ext: '.ect'
})
app.use(express.static(__dirname + '/app'));
app.set('view engine','ect');
app.engine('ect',renderer.render);
app.set('views','./app/views');


app.get("/home",function(req,res){
  res.render('home');
});
app.get("/",function(req,res){
  res.render('home');
});
app.get("/about",function(req,res){
  res.render('about');
});
app.get("/album",function(req,res){
  res.render('album');
});
app.get("/blog",function(req,res){
  res.render('blog');
});
app.get("/nguyenalbum",function(req,res){		
   res.render('nguyenalbum');		
 });		
 app.get("/localbum",function(req,res){		
   res.render('localbum');		
 });
  app.get("/blog/locpost",function(req,res){		
   res.render('locpost');		
 });
   app.get("/blog/nguyenpost",function(req,res){		
   res.render('nguyenpost');		
 });
var port=3001
app.listen(port,function(){
  console.log('Server is running at port ' + port);
});
