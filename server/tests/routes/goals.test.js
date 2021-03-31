import request from 'supertest';
import chai from 'chai';
const expect = chai.expect;
import app from '../../index.js';
import BasicUser from '../../models/basicUser.model.js'
import Goal from '../../models/goal.model.js'
import mongoose  from 'mongoose';


describe('goals routes', function() {
    let basicUser, basicUserId, goal, goalId, deleteGoal, deleteGoalId;
    before((done) => {
        basicUserId = mongoose.mongo.ObjectId();
        basicUser = BasicUser.create({
            _id: basicUserId,
            username: "232",
            name: "Bob Smith",
            email: "bobsmith@fakesite.com",
            password: "password123",
            buckets: ["bucket1"],
            bundles: ["bundle1"]
        });
        goalId = mongoose.mongo.ObjectId();
        goal = Goal.create({
            _id: goalId,
            description: "Goal Description",
            tags: ["nutrition", "health"],
            userID: basicUserId,
            deadline: "Tuesday 6th May"
        });
        deleteGoalId = mongoose.mongo.ObjectId();
        deleteGoal = Goal.create({
            _id: deleteGoalId,
            description: "Goal Description",
            tags: ["nutrition", "health"],
            userID: basicUserId,
            deadline: "Tuesday 6th May"
        });
        done();
    });


    describe('post /goals', function() {

        it('should make a new goal', function(done) {
            request(app)
            .post('/goals')
            .send({
                description: "Service description",
                userID: basicUserId,
                deadline: "Monday 6th April",
                tags: ["tag1", "tag2"]
            })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.equal("Goal added!");
            });
            done();
        });

        it('should return a 400 if the goal could not be added', function(done) {
            request(app)
            .post('/goals')
            .send({
                description: "Goal description",
                tags: ["tag1", "tag2"],
            })
            .end((err, res) => {
                expect(res.status).to.equal(400);
            });
            done();
        });
    });

    describe('get /goals', function() {

        it('should get all goals and return a 200 status code', function(done) {
            request(app)
            .get('/goals')
            .send()
            .end((err, res) => {
                expect(res.status).to.equal(200);
            });
            done();
        });
    });

    describe('get /goals/:id', function() {

        it('should get the goals object that have UserId equal to basicUserId', function(done) {
            request(app)
            .get(`/goals/${basicUserId}`)
            .send()
            .end((err, res) => {
                expect(res.status).to.equal(200);
                let goal = res.body[0];
                expect(goal.userID).to.equal("" + basicUserId);
                expect(goal.description).to.equal("Goal Description");
                expect(goal.deadline).to.equal("Tuesday 6th May");
            });
            done();
        });

        it('should return a 400 status code as an invalid id is supplied', function(done) {
            request(app)
            .get(`/goals/${1233}`)
            .send()
            .end((err, res) => {
                expect(res.status).to.equal(400);
            });
            done();
        });
    });

    describe('patch /goals/:id', function() {

        it('should update the goal', function(done) {
            request(app)
            .patch(`/goals/${goalId}`)
            .send({
                description: "Update Description",
                tags: ["nutrition", "health"],
                userID: basicUserId,
                deadline: "New Deadline"
            })
            .end((err, res) => {
                expect(res.body).to.equal("goal updated!");
                expect(res.status).to.equal(200);
            });
            done();
        });

        it('should return a 400 status code as the id does not link to a goal', function(done) {
            request(app)
            .patch(`/goals/${1232}`)
            .send({
                description: "Update Description",
                tags: ["nutrition", "health"],
                userID: basicUserId,
                deadline: "New Deadline"
            })
            .end((err, res) => {
                expect(res.status).to.equal(400);
            });
            done();
        });
    });

    describe('delete /goals/:id', function() {

        it('should delete the goal associated with the uri', function(done) {
            request(app)
            .delete(`/goals/${deleteGoalId}`)
            .send()
            .end((err, res) => {
                expect(res.body).to.equal("goal deleted.");
                expect(res.status).to.equal(200);
            });
            done();
        });
        
        it('should return 400 status code as the uri is not associated with a goal', function(done) {
            request(app)
            .delete(`/goals/${1234}`)
            .send()
            .end((err, res) => {
                expect(res.body).to.not.equal("goal deleted.");
                expect(res.status).to.equal(400);
            });
            done();
        });
    });

    after((done) => {
        Goal.collection.deleteMany({});
        BasicUser.collection.deleteMany({});
        done();
      });
});