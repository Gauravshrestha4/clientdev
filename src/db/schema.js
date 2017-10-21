'use strict';

const monogoose = require('monogoose');

const sequelize = require('sequelize');


export Schema = {
	Skills : new monogoose.Schema({
		
		developerID: {
		
			type: String,
			required: [true, 'Need a developer ID to store data!']
		},

		skills: {
			type: [String],
			required: [true, 'Need a list of skills to save']
		}

	}),

	Clients: sequelize.define('clients', {

		companyName: {

			type: sequelize.String,
			allowNull: false,
			/*validate: {

			}*/
		},

		emailId: {

			type: sequelize.String,
			allowNull: false,
			primaryKey: true,
			/*validate: {

			}*/
		},

		phone: {
			
			type: sequelize.Integer,
			allowNull: true,
			/*validate: {

			}*/
		},

		description: {
			
			type: sequelize.Text,
			allowNull: false,
			/*validate: {

			}*/
		},

		picture: {

			type: sequelize.String,
			allowNull: true,
			/*validate: {

			}*/

		},

		address: {

			type: sequelize.String,
			allowNull: true,
			/*validate: {

			}*/
		},

		companyType: {

			type: sequelize.String,
			allowNull: true,
			/*validate: {

			}*/
		},

	}),

	Developers: sequelize.define('developers', {

		name: {

			type: sequelize.String,
			allowNull: false,
			/*validate: {

			}*/
		},

		emailId: {

			type: sequelize.String,
			allowNull: false,
			/*validate: {

			}*/
		},

		phone: {

			type: sequelize.Integer,
			allowNull: true,
			/*validate: {

			}*/
		},

		nationality: {

			type: sequelize.Integer,
			allowNull: true,
			/*validate: {

			}*/
		},

		skills: {

			type: sequelize.String, //this is a mongo.id value that can be used to retrieve the skills array from MongoDB
			allowNull: false,
			/*validate: {

			}*/
		},

		workDomain: {

			// this is the developers preferred work area
			type: sequelize.String, // maybe this should be an array of string instead ?
			allowNull: true,
			/*validate: {

			}*/
		},

		picture: {

			type: sequelize.String,
			allowNull: true,
			/*validate: {

			}*/
		},

	}),
};


