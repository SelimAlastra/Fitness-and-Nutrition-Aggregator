import request from 'supertest';
import chai from 'chai';
const expect = chai.expect;
import app from '../../index.js';
import ProfessionalUser from '../../models/basicUser.model.js'
import mongoose  from 'mongoose';
import BasicUser from '../../models/basicUser.model.js';


describe('Basic users routes', function() {
    let basicUser;
    before((done) => {
        done();
    });

    describe('post /basicUsers', function() {

        it('should make a new basic user', function(done) {
            request(app)
            .post('/basicUsers')
            .send({
                username: 'Bob_123',
                email: 'bob@hotmail.com',
                password: 'bOb@123123',
                name: 'Bob'
            })
            .end((err, res) => {
                basicUser = res.body;
                expect(res.status).to.equal(200);
                expect(basicUser).to.have.property('username');
                expect(basicUser.username).to.equal('Bob_123');
                expect(basicUser).to.have.property('email');
                expect(basicUser.email).to.equal('bob@hotmail.com');
                expect(basicUser).to.have.property('hashed_password');
                expect(basicUser).to.have.property('name');
                expect(basicUser.name).to.equal('Bob');
                done();
            });
        });

        it('should return a 400 if the basic user could not be added', function(done) {
            request(app)
            .post('/basicUsers')
            .send({
                username: 'Bob_123',
                email: 'bob@hotmail.com',
                password: 'bOb@123123'
            })
            .end((err, res) => {
                expect(res.status).to.equal(400);
                done();
            });
        });
    });

    describe('get /basicUsers/:id', function() {

        it('should retrieve a specific basic user', function(done) {
            request(app)
            .get(`/basicUsers/${basicUser._id}`)
            .send()
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('_id');
                expect(res.body._id).to.equal(basicUser._id);
                done();
            }); 
        });

        it('should return a 400 status code as an invalid id is supplied', function(done) {
            request(app)
            .get(`/basicUsers/${1233}`)
            .send()
            .end((err, res) => {
                expect(res.status).to.equal(400);
                done();
            });
        });
    });

    describe('get /basicUsers', function() {

        it('should get all basic users and return a 200 status code', function(done) {
            request(app)
            .get('/basicUsers')
            .send()
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.length).to.equal(1);
                expect(res.body[0]).to.have.property('_id');
                expect(res.body[0]._id).to.equal(basicUser._id);
                done();
            }); 
        });
    });

    describe('patch /basicUsers/update/:id', function() {

        it('should update the basic user', function(done) {
            basicUser.username = 'NOT_Bob_123';
            request(app)
            .patch(`/basicUsers/update/${basicUser._id}`)
            .send({
                username: 'NOT_Bob_123',
            })
            .end((err, res) => {
                basicUser = res.body;
                expect(res.status).to.equal(200);
                expect(basicUser.username).to.equal('NOT_Bob_123');
                expect(basicUser).to.have.property('email');
                expect(basicUser.email).to.equal('bob@hotmail.com');
                expect(basicUser).to.have.property('hashed_password');
                expect(basicUser).to.have.property('name');
                expect(basicUser.name).to.equal('Bob');
                done();
            });
        });

        it('should return a 400 status code as the id does not link to a basic user', function(done) {
            request(app)
            .patch(`/basicUsers/update/${1232}`)
            .send({
                username: 'NOT_Bob_123',
            })
            .end((err, res) => {
                expect(res.status).to.equal(404);
                done();
            });
        });
    });

    describe('delete /basicUsers/:id', function() {

        it('should delete the basic user associated with the uri', function(done) {
            request(app)
            .delete(`/basicUsers/${basicUser._id}`)
            .send()
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.equal('BasicUser deleted.');
                done();
            }); 
        });

        it('should return 400 status code as the uri is not associated with a basic user', function(done) {
            request(app)
            .delete(`/basicUsers/${1234}`)
            .send()
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body).to.not.equal("BasicUser deleted.");
                done();
            });
        });
    });

    describe('post /basicUsers/register', function() {

        it('should register a new basic user and returns a web token and user', function(done) {
            request(app)
            .post(`/basicUsers/register`)
            .send({
                username: 'Alice_123',
                email: 'Alice@hotmail.com',
                password: 'Alice@123123',
                name: 'Alice'
            })
            .end((err, res) => {
                basicUser = res.body.user;
                expect(res.status).to.equal(200);
                expect(basicUser.username).to.equal("Alice_123");
                expect(basicUser.name).to.equal("Alice");
                expect(basicUser.email).to.equal("Alice@hotmail.com");
                expect(basicUser.type).to.equal("client");
                expect(res.body.token).to.exist;
                done();
            });
        });

        it('should return error as email is already in use', function(done) {
            request(app)
            .post(`/basicUsers/register`)
            .send({
                username: 'Alice_1234',
                email: 'Alice@hotmail.com',
                password: 'Alice@1231234',
                name: 'Alice4'
            })
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body.errors).to.equal("Email already in use.");
                done();
            });
        });
    });

    describe('post /basicUsers/login', function() {

        let bannedUser;
        before(() => {
            bannedUser = new BasicUser({
                username: 'Banned',
                email: 'banned@hotmail.com',
                password: 'banned@1231234',
                name: 'Banned',
                isBanned: true
            });
            bannedUser.save();
        });

        it('should login a basic user and returns a web token and user', function(done) {
            request(app)
            .post(`/basicUsers/login`)
            .send({
                email: 'Alice@hotmail.com',
                password: 'Alice@123123',
            })
            .end((err, res) => {
                basicUser = res.body.user;
                expect(res.status).to.equal(200);
                expect(basicUser.username).to.equal("Alice_123");
                expect(basicUser.name).to.equal("Alice");
                expect(basicUser.email).to.equal("Alice@hotmail.com");
                expect(basicUser.type).to.equal("client");
                expect(res.body.token).to.exist;
                done();
            });
        });

        it('should return error as no user with this email exist', function(done) {
            request(app)
            .post(`/basicUsers/login`)
            .send({
                email: 'NOT_Alice@hotmail.com',
                password: 'Alice@1231234',
            })
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body.errors).to.equal('User with that email does not exist. Please signup');
                done();
            });
        });

        it('should return error as the password does not match the email', function(done) {
            request(app)
            .post(`/basicUsers/login`)
            .send({
                email: 'Alice@hotmail.com',
                password: 'NOT_Alice@1231234',
            })
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body.errors).to.equal('Email and password do not match');
                done();
            });
        });

        it('should return error as the user is banned', function(done) {
            request(app)
            .post(`/basicUsers/login`)
            .send({
                email: 'banned@hotmail.com',
                password: 'banned@1231234'
            })
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body.errors).to.equal("You cannot login, as you are banned.");
                done();
            });
        });
    });

    describe('put /basicUsers/forgotpassword', function() {

        //For some reason res.body.message = 'Unauthorized'
        //BasicUserAuth controller line 313
        //${process.env.CLIENT_URL}/user/password/reset/${token}

        it('should return a sent message on successful delivery on reset email', function(done) {
            request(app)
            .put('/basicUsers/forgotpassword')
            .send({
                email: "Alice@hotmail.com"
            })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.message).to.equal("Email has been sent to Alice@hotmail.com. Follow the instruction to reset your password.");
                done();
            });
        });

        it('should return an error message as no user with the email address supplied', function(done) {
            request(app)
            .put('/basicUsers/forgotpassword')
            .send({
                email: "NoUser@hotmail.com"
            })
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body.error).to.equal("User with that email does not exist");
                done();
            });
        });
    });

    after((done) => {
        BasicUser.collection.deleteMany({});
        done();
    });
});