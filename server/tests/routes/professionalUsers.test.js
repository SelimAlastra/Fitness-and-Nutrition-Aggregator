import request from 'supertest';
import chai from 'chai';
const expect = chai.expect;
import app from '../../index.js';
import ProfessionalUser from '../../models/professionalUser.model.js'
import mongoose  from 'mongoose';


describe('professional user routes', function() {
    let professionalUser, professionalUserId,
     deleteProfessionalUser, deleteProfessionalUserId;
    before((done) => {
        professionalUser = new ProfessionalUser({
            username: Math.random()*10,
            name: "Professional User",
            email: "smith@yahoo.com",
            password: "password123",
            profession: "Health Expert",
        });
        professionalUser.save();
        professionalUserId = professionalUser._id;
        deleteProfessionalUser = new ProfessionalUser({
            username: "232111",
            name: "Bob Smith",
            email: "bobsmith@yahoo.co.uk",
            password: "password123",
            profession: "Personal Trainer",
        });
        deleteProfessionalUser.save();
        deleteProfessionalUserId = deleteProfessionalUser._id;
        done();
    });


    describe('post /professionalUsers', function() {

        it('should make a new professional user', function(done) {
            request(app)
            .post('/professionalUsers')
            .send({
            username: "prof23222",
            name: "New Professional User",
            email: Math.random() + "@yahoo.com",
            password: "password123",
            profession: "Nutrition Expert",
            })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.equal("Professional user added!");
                done();
            });
        });

        it('should return a 400 if the professional user could not be added', function(done) {
            request(app)
            .post('/professionalUsers')
            .send({
                username: Math.random()*10,
                name: "Bob Smith",
                email: Math.random() + "@yahoo.com",
            })
            .end((err, res) => {
                expect(res.status).to.equal(400);
                done();
            });
        });
    });

    describe('get /professionalUsers', function() {

        it('should get all professional users and return a 200 status code', function(done) {
            request(app)
            .get('/professionalUsers')
            .send()
            .end((err, res) => {
                expect(res.status).to.equal(200);
                done();
            });
        });
    });

    describe('get /professionalUsers/:id', function() {

        it('should get the professional user object that have UserId equal to professionalUserId', function(done) {
            request(app)
            .get(`/professionalUsers/${professionalUserId}`)
            .send()
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body._id).to.equal("" + professionalUserId);
                expect(res.body.name).to.equal("Professional User");
                done();
            });
        });

        it('should return a 400 status code as an invalid id is supplied', function(done) {
            request(app)
            .get(`/professionalUsers/${1233}`)
            .send()
            .end((err, res) => {
                expect(res.status).to.equal(400);
                done();
            });
        });
    });

    describe('patch /professionalUsers/:id', function() {

        it('should update the professional user', function(done) {
            request(app)
            .patch(`/professionalUsers/update/${professionalUserId}`)
            .send({
                username: Math.random()*10,
                name: "Professional User",
                email: Math.random() + "@yahoo.com",
                password: "password123",
                profession: "Health Expert",
            })
            .end((err, res) => {
                expect(res.body.name).to.equal("Professional User");
                expect(res.status).to.equal(200);
                done();
            });
        });

        it('should return a 400 status code as the id does not link to a professional', function(done) {
            request(app)
            .patch(`/professionalUsers/update/${1232}`)
            .send({
                name: "Professional User",
                email: Math.random() + "@yahoo.com",
                profession: "Health Expert",
            })
            .end((err, res) => {
                expect(res.status).to.equal(404);
                done();
            });
        });
    });

    describe('delete /professionalUsers/:id', function() {

        it('should delete the professional associated with the uri', function(done) {
            request(app)
            .delete(`/professionalUsers/${deleteProfessionalUserId}`)
            .send()
            .end((err, res) => {
                expect(res.body).to.equal("Professional user deleted");
                expect(res.status).to.equal(200);
            });
            done();
        });
        
        it('should return 400 status code as the uri is not associated with a professional', function(done) {
            request(app)
            .delete(`/professionalUsers/${1234}`)
            .send()
            .end((err, res) => {
                expect(res.body).to.not.equal("Professional user deleted");
                expect(res.status).to.equal(404);
            });
            done();
        });
    });

    after((done) => {
        ProfessionalUser.deleteMany({});
        done();
      });
});