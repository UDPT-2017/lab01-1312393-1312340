var express = require('express');
var ect = require('ect');
var app = express();

var renderer = ect({
  root: __dirname + 'views',
  ext: '.ect'
})

app.set('view engine','ect');
app.engine('ect',renderer.render);
app.set('views','./app/views');


app.get("/home",function(req,res){
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

var port=3001
app.listen(port,function(){
  console.log('Server is running at port ' + port);
});
