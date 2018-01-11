/*
	Setup connection to DB's and other services here
*/


// ======= Sequelize Connection for MariaDB ========== //

const Sequelize = require('sequelize');

export const sequelize = new Sequelize('clientdev','root', 'mittalsm', {
	
	host: 'localhost', //will need to be changed when deployed - using process.env variable
	dialect: 'mysql',
	logging: true
});

// test connection to DB
sequelize
	.authenticate()
	.then( () => {
		console.log('Connection established to MaraiDB')
	})
	.catch( (err) => {
		throw new Error(`Could not establish a connection to mariaDB: ${err}`);
	});
