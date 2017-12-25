const router = require('express').Router();
const connection=require('../db/connections');
const sequelize=connection.sequelize;
import Schema from '../db/schema';
const Clients = Schema.Clients;

router.post('/dev/signup',(req,res)=>{
	const databody=req.body;
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
});


router.post('/client/signup', (req,res) => {
	const data = req.body;
	console.log(data);
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
		else{
			return Clients.create({
				companyName: data.companyName,
				emailId: data.emailId,
				companyType: data.companyType,
				address: data.address,
				phone: data.phone 
			})
			.then((client) => {
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
		res.status(500).send('Sorry we are unable to prcess your request right now!');
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
		
	});
});
module.exports=router;