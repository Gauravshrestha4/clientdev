// 'use strict';

/*
	functions that act as middlewares
*/


export const checkSession = (user) => {
	return (req,res,next) => {
		// console.log('\n\n\nCookies: ', req.session.cookie);
		console.log('\n\nSessions: ',req.session);
		if ( user === 'client' ){
			if( req.session.client.emailId ){
				console.log('\n\nClient: ',req.session.client);
				console.log('\n\nSID: ',req.session.id);
				res.sendStatus(200);
			} else {
				next();
			}
		}
		else if( user === 'dev'){

			if ( req.session.dev.emailId ){
				res.sendStatus(200);
			} else {
				next();
			}
		}
		else{
			next(new Error(`Invalid user type: ${user}`));
		}
		
	}
}