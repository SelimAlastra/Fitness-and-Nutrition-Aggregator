import { expect } from 'chai';
import sinon from 'sinon';
import request from 'supertest';
import { getServices, createService, updateService, deleteService } from '../../controllers/services.js';
import Service from '../../models/service.model.js';
import BasicUser from '../../models/basicUser.model.js';

const {app} = require('../../index.js');

describe('Service routes', function() {
	let service;
	let basicUser;

	before((done) => {
		let basicUser = new BasicUser({
			username: "basic1234098",
			name: "Bob Smith",
			email: "bobsmith@me.com",
			password: "pass123"
		});
		let serviceBody = {
			userID: basicUser._id,
			price: "23.23",
			description: "Hello World",
			urls: ["http://youtube.com", "https://localhost:3000"],
			title: "New Service"
		};
	});

	describe('Testing post /services', function() {
		let service;

		it('should make a new service', function(done) {
			app.router()
				.post('/services')
				.send(serviceBody)
				.end((error, res) => {
					service = res.serviceBody
					expect(res.status).to.equal(200);
					expect(service).to.have.property(userID);
					expect(serivce.userID).to.equal(serviceBody.userID);
				})
		});
	});


	after(async (done) => {
		await Service.deleteMany({});
		await BasicUser.deleteMany({});
		done();
	});


});





// describe('Testing Services controller', function() {
// 	const stub = sinon.stub(Service, 'find').returns([]);
// 	const services = getServices();
// 	console.log(services);
// });


// import { MongoMemoryServer } from 'mongodb-memory-server';
// import mongoose from 'mongoose';

// describe("...", function() {
// 	before(() => {
// 		const mongoServer = new MongoMemoryServer();

// 		mongoose.Promise = Promise;
// 		mongoServer.getUri().then((mongoUri) => {
// 		  const mongooseOpts = {
// 		    // options for mongoose 4.11.3 and above
// 		    autoReconnect: true,
// 		    reconnectTries: Number.MAX_VALUE,
// 		    reconnectInterval: 1000,
// 		  };

// 		  mongoose.connect(mongoUri, mongooseOpts);

// 		  mongoose.connection.on('error', (e) => {
// 		    if (e.message.code === 'ETIMEDOUT') {
// 		      console.log(e);
// 		      mongoose.connect(mongoUri, mongooseOpts);
// 		    }
// 		    console.log(e);
// 		  });

// 		  mongoose.connection.once('open', () => {
// 		    console.log(`MongoDB successfully connected to ${mongoUri}`);
// 		  });
// 		});
// 	});

// 	it('ddd', function(done) {
		
// 		done();
// 	});

// });



// describe("", function() {
// 	let server;
// 	const opts = {};

// 	// before(async () => {
// 	// 	server = new MongoMemoryServer();
// 	// 	const uri = await server.getUri();
// 	// 	await mongoose.connect(uri, opts);
// 	// 	await console.log("doneeee");
// 	// });

// 	// after(async () => {
// 	// 	await mongoose.disconnect();
// 	// 	await server.stop();
// 	// });



// 	before((done) => {
// 		 server = new MongoMemoryServer();
// 		 server.getConnectionString()
// 		 	.then((uri) => {
// 		 		return mongoose.connect(uri, {}, (error) => {
// 		 			if(error) done("oh no");
// 		 		});
// 		 	})
// 		 	.then(() => {
// 		 		Promise.all([
// 		 			Service.create({
// 		 				userID: mongoose.mongo.ObjectId,
// 		 				price: "23.23",
// 		 				description: "the description",
// 		 				urls: ["http://youtube.com"],
// 		 				title: "the title"
// 		 			}), 
// 		 			Service.create({
// 		 				userID: mongoose.mongo.ObjectId,
// 		 				price: "23.23",
// 		 				description: "the description",
// 		 				urls: ["http://youtube.com"],
// 		 				title: "the title"
// 		 			}), 
// 		 			]).then(() => done());
// 		 	})
// 		 	console.log("finishing");
// 	});

// 	after(() => {
// 		mongoose.disconnect();
// 		server.stop();
// 	});

// 	it('hello', function(done) {
// 		//const result = chai.request(getServices);
// 		done();
// 	});

// });

