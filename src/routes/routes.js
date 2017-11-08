let router = require('express').Router();



router.get('/signup', (req,res,next) => {
	res.render('login',{});
});