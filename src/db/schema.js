// 'use strict';

/*
	Define database schema here and make them as a single object 
	differentiated by Schema names as keys.
*/

const monogoose = require('mongoose');
const Sequelize = require('sequelize');

import {sequelize} from './connections';

mongoose.connect('mongodb://localhost/test');
const Schema = {

	// ===== MongoDB Schema's ==== //

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

	// ==== MariaDB Schema's ==== //

	Clients: sequelize.define('clients', {

		companyName: {

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

		description: {
			
			type: Sequelize.TEXT,
			allowNull: false,
			/*validate: {

			}*/
		},

		picture: {

			type: Sequelize.STRING(512),
			allowNull: true,
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

	}),
};
Schema.Clients.sync();
Schema.Developers.sync();

export default Schema;