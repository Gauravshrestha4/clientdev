// 'use strict';
/*
	Setup express app here
*/
const express = require('express'),
	bodyparser = require('body-parser'),
	morgan = require('morgan'),
	nodemailer = require('nodemailer'),
	path = require('path'),
	session = require('express-session'),
	mongoose = require('mongoose'),
	MongoStore = require('connect-mongo')(session),
	routes = require('./routes/routes');
const app=express();

//setup view engine
app.set('views', path.join(__dirname, '../' ,'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//setup logging via morgan
app.use(morgan('dev'));

//setup bodyparser for parsing form data
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
	extended:true
}));

//cookie parser
// app.use(cookieParser('signingsecret'));

//setup express-session

app.use(session({
	name: 'id',
	secret: 'superdupersecret',
	saveUninitialized: true,
	resave: true,
	secure: false, //change to true when on HTTPS
	cookie:{
		httpOnly: true,
		expires: 600000
	},
	store: new MongoStore({
		mongooseConnection: mongoose.connection,
		ttl: (1*60*60)
	})
}))

//setup static files directory for stylesheets and javascripts
app.use(express.static(path.join(__dirname, '../', 'views','public')));


app.use(routes);

app.get('*',(req,res)=>{
	res.render('index');
});

app.listen(8000,(req,res)=>{
	console.log("Application running on 8000")
});
