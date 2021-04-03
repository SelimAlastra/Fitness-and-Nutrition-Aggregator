import request from 'supertest';
import chai from 'chai';
const expect = chai.expect;
import app from '../../index.js';
import ProfessionalUser from '../../models/professionalUser.model.js'
import mongoose  from 'mongoose';


describe('professional user routes', function() {
    let professionalUser, professionalUserId,
        deleteProfessionalUser, deleteProfessionalUserId,
        bannedProfessionalUser;
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
        bannedProfessionalUser = new ProfessionalUser({
            username: "56550493",
            name: "Bob Banned",
            email: "bobbanned@yahoo.co.uk",
            password: "password123",
            profession: "Personal Trainer",
            isBanned: true,
        });
        bannedProfessionalUser.save();
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
                expect(res.status).to.equal(201);
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

        it('should return a 404 status code as an invalid id is supplied', function(done) {
            request(app)
            .get(`/professionalUsers/${1233}`)
            .send()
            .end((err, res) => {
                expect(res.status).to.equal(404);
                done();
            });
        });
    });

    describe('patch /professionalUsers/update/:id', function() {

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
                expect(res.status).to.equal(200);
                expect(res.body.name).to.equal("Professional User");
                done();
            });
        });

        it('should return a 404 status code as the id does not link to a professional', function(done) {
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
                expect(res.status).to.equal(200);
                expect(res.body).to.equal("Professional user deleted");
            });
            done();
        });
        
        it('should return 404 status code as the uri is not associated with a professional', function(done) {
            request(app)
            .delete(`/professionalUsers/${1234}`)
            .send()
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body).to.not.equal("Professional user deleted");
            });
            done();
        });
    });

    describe('post /professionalUsers/register', function() {

        it('should register a new professional and returns a web token and user', function(done) {
            request(app)
            .post('/professionalUsers/register')
            .send({
                username: "prof121",
                name: "Register Professional User",
                email: "johnsmith@yahoo.com",
                password: "password123",
                profession: "Nutrition Expert",
            })
            .end((err, res) => {
                expect(res.status).to.equal(201);
                expect(res.body.user.username).to.equal("prof121");
                expect(res.body.user.name).to.equal("Register Professional User");
                expect(res.body.user.email).to.equal("johnsmith@yahoo.com");
                expect(res.body.user.type).to.equal("professional");
                expect(res.body.token).to.exist;
                done();
            });
        });

        it('should return error as username is already in use', function(done) {
            request(app)
            .post('/professionalUsers/register')
            .send({
                username: "Professional User",
                name: "Register Professional User",
                email: "johnsmith@yahoo.com",
                password: "password123",
                profession: "Nutrition Expert",
            })
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body.errors).to.equal("Email already in use.");
                done();
            });
        });
    }); 

    describe('post /login', function() {

        it('should return a token and user object on successful login', function(done) {
            request(app)
            .post('/professionalUsers/login')
            .send({
                email: "johnsmith@yahoo.com",
                password: "password123"
            })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.user.username).to.equal("prof121");
                expect(res.body.user.name).to.equal("Register Professional User");
                expect(res.body.user.email).to.equal("johnsmith@yahoo.com");
                expect(res.body.user.type).to.equal("professional");
                expect(res.body.token).to.exist;
                done();
            });
        });

        it('should return an error if no user exists with the email provided', function(done) {
            request(app)
            .post('/professionalUsers/login')
            .send({
                email: "cows@yahoo.com",
                password: "password123"
            })
            .end((err, res) => {
                expect(res.status).to.equal(401);
                expect(res.body.errors).to.equal("User with that email does not exist. Please signup");
                done();
            });
        });

        it('should return an error if the email and password do not match', function(done) {
            request(app)
            .post('/professionalUsers/login')
            .send({
                email: "johnsmith@yahoo.com",
                password: "notmatchpassword"
            })
            .end((err, res) => {
                expect(res.status).to.equal(401);
                expect(res.body.errors).to.equal("Email and password do not match");
                done();
            });
        });

        it('should return an error if the professional is banned', function(done) {
            request(app)
            .post('/professionalUsers/login')
            .send({
                email: "bobbanned@yahoo.co.uk",
                password: "password123"
            })
            .end((err, res) => {
                expect(res.status).to.equal(401);
                expect(res.body.errors).to.equal("You cannot login, as you are banned.");
                done();
            });
        });  
    });

    describe('put /forgotpassword', function() {

        it('should return a sent message on successful delivery on reset email', function(done) {
            request(app)
            .put('/professionalUsers/forgotpassword')
            .send({
                email: "johnsmith@yahoo.com"
            })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.message).to.equal("Email has been sent to johnsmith@yahoo.com. Follow the instruction to reset your password.");
                done();
            });
        });

        it('should return an error message as no user with the email address supplied', function(done) {
            request(app)
            .put('/professionalUsers/forgotpassword')
            .send({
                email: "cows@yahoo.com"
            })
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body.error).to.equal("User with that email does not exist");
                done();
            });
        });
    });

    after((done) => {
        ProfessionalUser.deleteMany({});
        done();
      });
});