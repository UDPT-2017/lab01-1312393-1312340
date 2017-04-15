var express = require('express');
var ect = require('ect');
var app = express();
var bodyParser = require('body-parser');
var pg = require('pg');
var sessions =require('express-session');
var session;
var connectionString = process.env.DATABASE_URL || 'postgres://postgres:123456@localhost:5432/LoginDB';
var client = new pg.Client(connectionString);
var renderer = ect({
  root: __dirname + 'views',
  ext: '.ect'
})
app.use(express.static(__dirname + '/app'));
app.set('view engine','ect');
app.engine('ect',renderer.render);
app.set('views','./app/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(sessions({
	secret:'213214#$#@$@$#',
	resave: false, 
	saveUninitialized: true

}));
 client.connect();

//var query = client.query('CREATE TABLE accounts("username" Varchar(20) PRIMARY KEY,"password" VARCHAR(20))');

app.get("/login",function(req,res){
	var session =req.session;
if(session.uniqueID){
		res.redirect('/redirects');
	}
  res.render('login');
});
app.post("/login",function(req,res){
	var session =req.session;
	session.uniqueID = "0";

 
  client.query('select 3 as value from accounts where username = ($1) and password= ($2) ',[req.body.username,req.body.password], function (err, result) {
    if (err) throw err;

 
if(result.rows[0] == null){
	 res.redirect('/redirects');
}
else
{
    console.log(result.rows[0].value); 
     if( result.rows[0].value == "3"){
  	session.uniqueID = req.body.username;
  	 res.redirect('/redirects');
};


 

}});

});
app.get('/logout',function(req,res){
req.session.destroy(function(){
	res.redirect('/login');
});
	});
app.get('/redirects',function(req,res){
	var session = req.session;
	console.log(session.uniqueID);
	if(session.uniqueID != "0"){
		res.redirect('/home');
	} else {
		res.send('Sai tai khoan hoac mat khau !<a href="/logout"> Try again ?</a>');
	}
});
app.post("/signup",function(req,res){
	//var session =req.session;
	//session.uniqueID = "0";

 
  client.query('INSERT INTO public.accounts(username, password) VALUES (($1),($2));',[req.body.username,req.body.password], function (err, result) {
    if (err) throw err;

 
//if(result.rows[0] == null){
	// res.redirect('/redirects');
//}
//else
//{
    //console.log(result.rows[0].value); 
     //if( result.rows[0].value == "3"){
  	//session.uniqueID = req.body.username;
  	 res.send('Dang ki thanh cong  !<a href="/logout"> Login?</a>');
//};


 

});

});
app.get("/signup",function(req,res){
  res.render('signup');
});
app.get("/home",function(req,res){
  res.render('home');
});
app.get("/",function(req,res){
  res.render('login');
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
  app.get("/locpost",function(req,res){
   res.render('locpost');
 });
   app.get("/nguyenpost",function(req,res){
   res.render('nguyenpost');
 });
var port=3001
app.listen(port,function(){
  console.log('Server is running at port ' + port);
});
