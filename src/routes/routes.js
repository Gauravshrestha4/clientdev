let router = require('express').Router();
let connection=require('../db/connections');
let sequelize=connection.sequelize;
import Schema from '../db/schema'

router.post('/dev/signup',(req,res)=>{
	let databody=req.body;
	Schema.Developers.find({
		where:{
			emailId:databody.emailId
		}
	}).then((exists)=>{
		if(exists)
		{
			//console.log("emailId exists");
			res.send("emailId exists");
		}
		else if(!exists)
		{
			//console.log("emailId dosnt exists");
			Schema.Developers.create({
				name:databody.name,
				emailId:databody.emailId
			}).then((response)=>{
				res.send(response);
			})
		}

	})
})
router.post('/dev/signin',(req,res)=>{
	let databody=req.body;
	console.log(databody.emailId)
	Schema.Developers.find({
		where:{
			emailId:databody.emailId
		}
	}).then((response)=>{
		if(response)
		{
			res.send(response);
		}
		else
		{
			res.send("Username or Password not valid");
		}
		
	})
})
module.exports=router;