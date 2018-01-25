
// ==== this file will store the routes related to the client module ==== //

const router = require('express').Router();
const connection=require('../db/connections');
const nodemailer=require('nodemailer');
const wellknown=require('nodemailer-wellknown')
const sequelize=connection.sequelize;
import Schema from '../db/schema';
import {checkSession} from '../utils/middlewares';

const Clients = Schema.Clients;
const Projects=Schema.Projects;

// ====== routes ===== //

router.post('/client/signup', (req,res) => {
	const data = req.body;
	// console.log('Received: ',data);
	// console.log('\n\nHeaders: ',req.headers);
	Clients.find({
		where:{
			emailId: data.emailId
		}
	})
	.then((result) => {
		if(result){
			console.log('User already exist');
			res.status(409).send(`Email ID : ${data.emailId} already in use`);
		}
		else if(req.body.password !== req.body.confirmPassword){
			console.log('Passwords do not match');
			res.status(409).send(`Passwords do not match`);
		}
		else{
			return Clients.create({
				companyName: data.companyName,
				emailId: data.emailId,
				companyType: data.companyType,
				address: data.address,
				phone: data.phone,
				password:data.password,
				state:data.state,
				city:data.state,
				zipCode:data.zipCode,
			})
			.then((client) => {
				req.session.client = {
					emailId: client.emailId,
					clientId: client.clientId
				};
				
				res.status(200).send('Signup successful');

				var transporter=nodemailer.createTransport({
					service:'Gmail',
					auth:{
						user:'initiators.time@gmail.com',
						pass:'initiators'
					}
				})

				var mailOptions={
					from:'initiators.time@gmail.com',
					to:req.session.client.emailId,
					subject:'Welcome to ClientDev',
					html:'Hi '+req.session.client.emailId+'welcome to Clientdev.You have successfuly registered with ClientDev'
				};
				transporter.sendMail(mailOptions,function(err,info){
					if(err)
					{
						console.log(err);
					}
					else
					{
						console.log('mail sent');
					}
				})
			})
			.catch((err) => {
				// res.status(500).send('Sorry we are unable to process your request right now!');
				throw err;
			})
		}
	})
	.catch((err) => {
		console.error(`Error in creating client: ${err}`);
		res.status(500).send('Sorry we are unable to process your request right now!');
	})
});


router.get('/authenticate/client',checkSession('client'),(err,req,res,next)=>{
	if(err){
		res.status(500).send('Session not found');
	}
	else{
		res.status(400).send('Empty session object');
	}
});

router.post('/client/signin', (req,res) => {
	const data = req.body;
	Clients.find({
		where:{
			emailId: data.emailId
		}
	})
	.then((client) => {
		if(client){
			
			if(client.authenticate(data.password)){
				req.session.client = {
					emailId: client.emailId,
					clientId: client.clientId
				};
				res.status(200).send('Welcome');
			}
			else{
				res.status(401).send('Invalid User Id and Password combination');
			}
		}
		else{
			res.status(400).send('Email ID not registered. Please register before signing in');
		}
	})
	.catch((err) => {
		console.log('Err: ',err);
		res.status(500).send('Sorry we are unable to process your request right now!');
	})


});


/***********************Routes for Client Dashboard***********************************/


router.get('/client/details',(req,res)=>{
	console.log("Session email is: "+req.session.client.emailId);
	Schema.Clients.find({
		where:{
			emailId:req.session.client.emailId,
		}
	})
	.then((client)=>{
		res.status(200).json({companyName:client.companyName,emailId:client.emailId,phone:client.phone,description:client.description,picture:client.picture,address:client.address,companyType:client.companyType,state:client.state,city:client.city,zipCode:client.zipCode});
	})
	.catch((err)=>{
		res.status(500).send("Sorry, We are unable to process your request right now!");
	})
})

router.post('/client/postjob',(req,res)=>{
	const databody=req.body;
	const newjob=new Projects({
			name:databody.name,
			profileRequired:databody.profileRequired,
			category:databody.category,
			description:databody.description,
			experience:databody.experience,
			timePeriod:databody.timePeriod,
			/*attachments:to be given */
			perks:databody.perks,
			skills:databody.skills,
			clientId: req.session.client.clientId
	})
	newjob.save((err,job)=>{
			if(err){
				res.status(500).send("Job description cant be saved");
			}
			else{
				res.status(200).send("Job has been posted successfuly");
			}
		})
});

router.get('/client/signout',(req,res)=>{
	req.session.destroy();
	console.log("Session destroyed");
	res.sendStatus(200);
})

router.post('/client/update-accountDetails',(req,res)=>{
	const databody=req.body;
	Schema.Clients.update({
		companyName:databody.companyName,
	},
	{
		where:{
			emailId:req.session.client.emailId,
		}
	})
	.then((data)=>{
		res.send(data);
	})
})

router.post('/client/update-companyDetails',(req,res)=>{
	const databody=req.body;
	console.log(databody);
	Schema.Clients.update(
	{
		phone:databody.phone,
		companyType:databody.companyType,
		description:databody.description,
		address:databody.address,
		zipCode:databody.zipCode,
		state:databody.state,
		city:databody.city,
	},
	{
		where:
		{
			emailId:req.session.client.emailId,
		}
	})
	.then((update)=>{
		console.log("Update "+update);
		res.send(update);
	})
})


router.get('/client/get-completed-project', function(req,res){
	Projects.find({clientId: req.session.client.clientId, status: "completed"}, function(err,result){
		if(err)
			res.status(500).send("Sorry, We are unable to process your request right now!");
		else
			res.status(200).send(result);
	});

});

router.get('/client/get-running-project', function(req,res){
	Projects.find({clientId: req.session.client.clientId, status: "Live"}, function(err,result){
		if(err)
			res.status(500).send("Sorry, We are unable to process your request right now!");
		else
			res.status(200).send(result);
	});
});

module.exports=router;