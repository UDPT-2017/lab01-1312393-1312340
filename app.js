var express = require('express');

var app = express();

app.get("/",function(req,res){
  res.send("Hello World, Hi");
});

var port=3001
app.listen(port,function(){
  console.log('Server is running at port ' + port);
});
