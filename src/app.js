// 'use strict';
/*
	Setup express app here
*/
const express = require('express'),
	bodyparser = require('body-parser'),
	morgan = require('morgan'),
	nodemailer = require('nodemailer'),
	path = require('path');

const app=express();

//setup view engine
app.set('views', path.join(__dirname, '../' ,'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//setup logging via morgan
app.use(morgan('dev'));

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
	extended:true
}));

//setup static files directory for stylesheets and javascripts
app.use(express.static(path.join(__dirname, '../', 'views','public')));

app.use('*',require('./routes/routes.js'))


app.get('*',(req,res)=>{
	res.render('index');
});
/*
app.get('/mainpage*',(req,res) => {
	res.render('templates/mainpage.html');
});
app.get('/signup',(req,res)=>{
	res.render('templates/signup.html');
})*/

app.listen(8000,(req,res)=>{
	console.log("Application running on 8000")
});
