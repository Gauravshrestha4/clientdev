/*
	Setup express app here
*/
const express= require('express'),
bodyparser=require('body-parser'),
morgan=require('morgan'),
nodemailer=require('nodemailer'),
path=require('path'),
app=express()
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
	extended:true
}))
/*app.get('/',(req,res)=>{
	res.send("Response OK");
})*/

app.use(express.static('./'));
app.use(express.static('public'));
app.get('/',(req,res)=>{
	res.sendFile(path.join(__dirname,'./views/templates/mainpage.html'))
})
app.listen(8000,(req,res)=>{
	conole.log("Application running on 8000")
})
//console.log('Application Started');

console.log('Application Started');