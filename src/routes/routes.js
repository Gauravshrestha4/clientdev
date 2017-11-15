var router = require('express').Router();
let connection=require('../db/connections');
let sequelize=connection.sequelize;

import {Schema} from '../db/schema';


router.post('/dev/signup',(req,res)=>{
	data_body=req.body;
	Schema.Developers.create({
		name:data_body.name,
		emailId:data_body.emailId,
	}).then((response)=>{
		res.send(response);
	});
})
module.exports=router;