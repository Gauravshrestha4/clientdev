let router = require('express').Router();
let connection=require('../db/connections');
let sequelize=connection.sequelize;
import {Schema} from '../db/schema'

router.post('/dev/signup',(req,res)=>{
	databody=req.body;
	Schema.Developers.create({
		name:databody.name,
		emailId:databody.emailId,
	}).then((response)=>{
		res.send(response);
	})
})
module.exports=router;