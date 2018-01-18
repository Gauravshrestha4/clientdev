const router = require('express').Router();
const connection=require('../db/connections');
const sequelize=connection.sequelize;
import Schema from '../db/schema';
const Clients = Schema.Clients;

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
})

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
			})
		}
	})
	.catch((err)=>{
		res.status(500).send('Sorry we are unable to process your request right now!');
		//throw err;
	})
});



router.post('/client/signup', (req,res) => {
	const data = req.body;
	// console.log('Received: ',data);
	// console.log('\n\nHeaders: ',req.headers);
	console.log('Session: ',req.session);

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
			})
			.then((client) => {
				req.session.client = client;
				res.status(200).send('Signup successful');
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

router.post('/client/signin',(req,res) => {
	const data = req.body;
	//console.log('Got',data);
	// console.log('Headers: ', req.headers);
	Clients.find({
		where:{
			emailId: data.emailId
		}
	})
	.then((client) => {

		/*
			check here if session is being maintained like
			if(req.session.client) then render client dashboard
			else
			redirect to login
		*/

		if(client){
			
			if(client.authenticate(data.password)){
				//add user to session here -> req.session.client = clinet
				res.status(200).send('Welcome')
			}
			else{
				res.status(401).send('Invalid User Id and Password combination');
			}
		}
		else{
			res.status(400).send('Email ID not registered. Please register before logging in');
		}
	})
	.catch((err) => {
		console.log('Err: ',err);
		res.status(500).send('Sorry we are unable to process your request right now!');
	})


});




router.post('/dev/signin',(req,res)=>{
	const databody=req.body;
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
	.catch((err)=>{
		res.status(500).send("Sorry, We are unable to process your request right now");
	})
});



/***********************Routes for Client Dashboard***********************************/
router.get('/client/clientCredentials',(req,res)=>{
	const databody=req.body;
	Schema.Clients.find({
		where:{
			emailId:databody.emailId,
		}
	})
	.then((client)=>{
		res.status(200).json({companyName:client.companyName,emailId:client.emailId,phone:client.phone,description:client.description,picture:client.picture,address:client.address,companyType:client.companyType});
	})
	.catch((err)=>{
		res.status(500).send("Sorry, We are unable to process your request right now!");
	})
})

router.post('/client/postjob',(req,res)=>{
	const databody=req.body;
})
module.exports=router;