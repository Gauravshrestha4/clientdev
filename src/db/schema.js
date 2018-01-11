// 'use strict';

/*
	Define database schema here and make them as a single object 
	differentiated by Schema names as keys.
*/

const mongoose = require('mongoose');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

import {sequelize} from './connections';

mongoose.connect('mongodb://localhost/clientdev');
const Schema = {

	// ===== MongoDB Schema's ==== //

	Skills : new mongoose.Schema({
		
		developerID: {
		
			type: String,
			required: [true, 'Need a developer ID to store data!']
		},

		skills: {
			type: [String],
			required: [true, 'Need a list of skills to save']
		}

	}),

	// ==== MariaDB Schema's ==== //

	Clients: sequelize.define('clients', {

		companyName: {

			type: Sequelize.STRING(512),
			allowNull: false,
			validate: {
				notEmpty: true,
			}
		},

		emailId: {

			type: Sequelize.STRING(512),
			allowNull: false,
			primaryKey: true,
			validate: {
				isEmail: true,
				notEmpty: true
			}
		},

		phone: {
			
			type: Sequelize.INTEGER,
			allowNull: true,
			/*validate: {

			}*/
		},

		description: {
			
			type: Sequelize.STRING(512),
			allowNull: true,
			defaultValue: 'No Description available'
			/*validate: {

			}*/
		},

		picture: {

			type: Sequelize.STRING(512),
			allowNull: true,
			defaultValue: 'No picture available'
			/*validate: {

			}*/

		},

		address: {

			type: Sequelize.STRING(512),
			allowNull: true,
			/*validate: {

			}*/
		},

		companyType: {

			type: Sequelize.STRING(512),
			allowNull: true,
			/*validate: {

			}*/
		},
		
		password:{
			type:Sequelize.STRING,
			allowNull:false
		},

		confirmPassword:{
			type:Sequelize.STRING,
			allowNull:false
		}

	}, {
		hooks: {
			beforeCreate: (client) => {
				return new Promise((resolve, reject) => {
					client.emailId = client.emailId.toLowerCase();

					if(client.password !== client.confirmPassword){
						reject(new Error('Passwords do not match'));
					}
					else{
						bcrypt.hash(client.password, 18)
						.then((res) => {
							client.password = res;	
							console.log('Hashed',res);
							resolve(client);
						})
						.catch((err) =>{
							reject(err);
						})
					}
				});
			}
		},
	}),

	Developers: sequelize.define('developers', {

		name: {

			type: Sequelize.STRING(512),
			allowNull: false,
			/*validate: {

			}*/
		},

		emailId: {

			type: Sequelize.STRING(512),
			allowNull: false,
			primaryKey: true,
			/*validate: {

			}*/
		},

		phone: {

			type: Sequelize.INTEGER,
			allowNull: true,
			/*validate: {

			}*/
		},

		nationality: {

			type: Sequelize.INTEGER,
			allowNull: true,
			/*validate: {

			}*/
		},

		skills: {

			type: Sequelize.STRING(512), //this is a mongo.id value that can be used to retrieve the skills array from MongoDB
			allowNull: true,
			/*validate: {

			}*/
		},

		workDomain: {

			// this is the developers preferred work area
			type: Sequelize.STRING(512), // maybe this should be an array of string instead ?
			allowNull: true,
			/*validate: {

			}*/
		},

		picture: {

			type: Sequelize.STRING(512),
			allowNull: true,
			/*validate: {

			}*/
		},
		status:{
			type:Sequelize.STRING(512),
			allowNull:true,
			defaultValue: 'true'
		}

	}),
};

//instance method. Can't use arrow functions because of lexical scoping. 'this' won't work
Schema.Clients.prototype.authenticate = function(value){
	return bcrypt.compareSync(value, this.password);
};

// ======= Sync the schemas for MariaDB ======= //
Schema.Developers.sync();
Schema.Clients.sync();
export default Schema;