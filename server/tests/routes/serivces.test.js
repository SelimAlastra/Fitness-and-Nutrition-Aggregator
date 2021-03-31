import request from 'supertest';
import chai from 'chai';
const expect = chai.expect;
import app from '../../index.js';
import BasicUser from '../../models/basicUser.model.js'
import Service from '../../models/service.model.js'
import mongoose  from 'mongoose';

describe('services routes', function() {
    let basicUser, editService, deleteService, id, deleteId;
    before((done) => {
        basicUser = BasicUser.create({
            username: "232",
            name: "Bob Smith",
            email: "bobsmith@fakesite.com",
            password: "password123",
            buckets: ["bucket1"],
            bundles: ["bundle1"]
        });
        id = mongoose.mongo.ObjectId();
        editService = Service.create({
            _id: id,
            title: "Edit Service",
            description: "Service description",
            price: "23.23",
            userID: mongoose.mongo.ObjectId(),
            urls: ["http://youtube.com"]
        });
        deleteId = mongoose.mongo.ObjectId();
        deleteService = Service.create({
            _id: deleteId,
            title: "Delete Service",
            description: "Service description",
            price: "23.23",
            userID: mongoose.mongo.ObjectId(),
            urls: ["http://youtube.com"]
        });
        done();
    });

    describe('post /services', function() {

        it('should make a new service', function(done) {
            request(app)
            .post('/services/add')
            .send({
                title: "Fitness Service",
                description: "Service description",
                price: "23.23",
                userID: mongoose.mongo.ObjectId(),
                urls: ["http://youtube.com"]
            })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.equal("service added");
            });
            done();
        });

        it('should return a 400 if the service could not be added', function(done) {
            request(app)
            .post('/services/add')
            .send({
                title: "Fitness Service",
                description: "Service description",
                price: "23.23"
            })
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body).to.equal('Error: Failed to add a service ValidationError: userID: Path `userID` is required.');
            });
            done();
        });
    });

    describe('get /services', function() {
       
        it('should get all services and return a 200 status code', function(done) {
            request(app)
            .get('/services')
            .send()
            .end((err, res) => {
                expect(res.status).to.equal(200);
            });
            done();
        });
    });

    describe('patch /services/update/:id', function() {

        it('should update the service', function(done) {
            request(app)
            .patch(`/services/update/${id}`)
            .send({
                title: "Updated Service",
                description: "Service description",
                price: "23.23",
                userID: mongoose.mongo.ObjectId(),
                urls: ["http://newurl.co.uk"]
            })
            .end((err, res) => {
                expect(res.body).to.equal("service updated!");
                expect(res.status).to.equal(200);
                done();
            });
            
        });

        it('should return a 400 status code as the id does not link to a service', function(done) {
            request(app)
            .patch(`/services/update/${1232}`)
            .send({
                description: "Service description",
                price: "23.23",
                userID: mongoose.mongo.ObjectId(),
                urls: ["http://newurl.co.uk"]
            })
            .end((err, res) => {
                expect(res.status).to.equal(400);
            });
            done();
        });
    });

    describe('delete /service/:id', function() {

        it('should delete the service associated with the uri', function(done) {
            request(app)
            .delete(`/services/${deleteId}`)
            .send()
            .end((err, res) => {
                expect(res.body).to.equal("Service deleted!");
                expect(res.status).to.equal(200);
            });
            done();
        });
        
        it('should return 400 status code as the uri is not associated with a service', function(done) {
            request(app)
            .delete(`/services/${1234}`)
            .send()
            .end((err, res) => {
                expect(res.body).to.not.equal("Service deleted!");
                expect(res.status).to.equal(400);
            });
            done();
        });
    });

    after((done) => {
        Service.collection.deleteMany({});
        BasicUser.collection.deleteMany({});
        done();
      })
});