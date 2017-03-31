var express = require('express');
var ect = require('ect');
var app = express();

var renderer = ect({
  root: __dirname + 'views',
  ext: '.ect'
})

app.set('view engine','ect');
app.engine('ect',renderer.render);

app.get("/index",function(req,res){
  res.render('index');
});

var port=3001
app.listen(port,function(){
  console.log('Server is running at port ' + port);
});
