

// ==== this file will store all the routes related to developer module ===== //

const router=require('express').Router();
const connection=require('../db/connections');
const sequelize=connection.sequelize;

import Schema from '../db/schema';
import {checkSession} from '../utils/middlewares';

const Clients=Schema.Clients;
const Projects=Schema.Projects;

router.post('/dev/checkEmail',(req,res)=>{
	const databody=req.body;
	console.log("Test "+databody.emailId);
	Schema.Developers.find({
		where:{
			emailId:databody.emailId
		}
	}).then((exists)=>{
		if(exists)
		{
			res.status(409).send(`Email ID: ${databody.emailId} already in use`);
		}
		else
		{
			res.status(200).send('Email ID is correct');
		}
	})
});


router.post('/dev/signup',(req,res)=>{
	const databody=req.body;

	//console.log(databody.name);
	Schema.Developers.find({
		where:{
			emailId:databody.emailId
		}
	}).then((response)=>{
		if(response)
		{
			res.status(409).send(`Email ID: ${databody.emailId} already in use`);
		}
		else
		{
			Schema.Developers.create({
				name:databody.name,
				emailId:databody.emailId,
			})
			.then((dev)=>{
				res.status(200).send('Signup Scuccessful');
				req.session.dev = {
					emailId: dev.emailId
				}
			})
		}
	})
	.catch((err)=>{
		res.status(500).send('Sorry we are unable to process your request right now!');
		//throw err;
	})
});

router.post('/dev/signin',(req,res)=>{
	const databody=req.body;
	console.log(databody.emailId)
	Schema.Developers.find({
			where:{
				emailId:databody.emailId
			}
		})
		.then((response)=>{
			if(response){
				res.send(response);
			}
			else{
				res.send("Username or Password not valid");
			}		
	})
	.catch((err)=>{
		res.status(500).send("Sorry, We are unable to process your request right now");
	})
});

module.exports=router;