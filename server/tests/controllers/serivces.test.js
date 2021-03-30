import request from 'supertest';
import chai from 'chai';
const expect = chai.expect;
import app from '../../index.js';
import BasicUser from '../../models/basicUser.model.js'
import Service from '../../models/service.model.js'
import mongoose  from 'mongoose';

describe('services routes', function() {
    let basicUser;
    beforeEach((done) => {
        basicUser = BasicUser.create({
            username: "usr1234232",
            name: "Bob Smith",
            email: "bobsmith@fakesite.com",
            password: "password123",
            buckets: ["bucket1"],
            bundles: ["bundle1"]
        }).then(() => done())
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
            })
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
       
        it('should get all services', function(done) {
            request(app)
            .get('/services')
            .send()
            .end((err, res) => {
                expect(res.status).to.equal(200);
            });
            done();
        });
    });

    afterEach((done) => {
        Service.deleteMany({})
        BasicUser.deleteMany({})
        done()
      })
});
