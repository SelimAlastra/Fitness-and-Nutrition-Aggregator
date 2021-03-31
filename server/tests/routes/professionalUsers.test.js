// import request from 'supertest';
// import chai from 'chai';
// const expect = chai.expect;
// import app from '../../index.js';
// import ProfessionalUser from '../../models/professionalUser.model.js'
// import mongoose  from 'mongoose';


// describe('professional user routes', function() {
//     let professionalUser, professionalUserId,
//      deleteProfessionalUser, deleteProfessionalUserId;
//     before( (done) => {
//         professionalUserId = mongoose.mongo.ObjectId();
//         professionalUser = ProfessionalUser.create({
//             username: Math.random()*10,
//             name: "Professional User",
//             email: Math.random() + "@yahoo.com",
//             password: "password123",
//             profession: "Health Expert",
//         });
//         professionalUser =  new ProfessionalUser({
//             username: "4433ddddkks",
//             email: "josh232@gmail.com", 
//             _password: "password123",
//             name: "Jon Smith",
//             profession: "Weight Lifter"
//         });
//         professionalUser.save();
//         console.log(professionalUser);
//         // deleteProfessionalUserId = mongoose.mongo.ObjectId();
//         // deleteProfessionalUser = ProfessionalUser.create({
//         //     _id: deleteProfessionalUserId,
//         //     username: "232111",
//         //     name: "Bob Smith",
//         //     email: "bobsmith@yahoo.co.uk",
//         //     password: "password123",
//         //     profession: "Personal Trainer",
//         // });
//         done();
//     });


//     describe('post /professionalUsers', function() {

//         it('should make a new professional user', function(done) {
//             request(app)
//             .post('/professionalUsers')
//             .send({
//             username: Math.random()*10,
//             name: "Bob Smith",
//             email: Math.random() + "@yahoo.com",
//             password: "password123",
//             profession: "Nutrition Expert",
//             })
//             .end((err, res) => {
//                 console.log(res.body);
//                 expect(res.status).to.equal(200);
//                 expect(res.body).to.equal("Professional user added!");
//             });
//             done();
//         });

//         // it('should return a 400 if the professional user could not be added', function(done) {
//         //     request(app)
//         //     .post('/professionalUsers')
//         //     .send({
//         //         username: Math.random()*10,
//         //         name: "Bob Smith",
//         //         email: Math.random() + "@yahoo.com",
//         //     })
//         //     .end((err, res) => {
//         //         expect(res.status).to.equal(400);
//         //     });
//         //     done();
//         // });
//     });

//     // describe('get /professionalUsers', function() {

//     //     it('should get all professional users and return a 200 status code', async function(done) {
//     //         request(app)
//     //         .get('/professionalUsers')
//     //         .send()
//     //         .end((err, res) => {
//     //             expect(res.status).to.equal(200);
//     //         });
//     //         done();
//     //     });
//     // });

//     // describe('get /professionalUsers/:id', function() {

//     //     it('should get the goals object that have UserId equal to basicUserId', function(done) {
//     //         request(app)
//     //         .get(`/professionalUsers/${professionalUserId}`)
//     //         .send()
//     //         .end((err, res) => {
//     //             expect(res.status).to.equal(200);
//     //             console.log("use " + professionalUser._id);
//     //             console.log(professionalUserId);
//     //             //expect(res.body._id).to.equal("" + professionalUserId);
//     //             //expect(professional.description).to.equal("Goal Description");
//     //             //expect(professional.deadline).to.equal("Tuesday 6th May");
//     //         });
//     //         done();
//     //     });

//     //     it('should return a 400 status code as an invalid id is supplied', function(done) {
//     //         request(app)
//     //         .get(`/professionalUsers/${1233}`)
//     //         .send()
//     //         .end((err, res) => {
//     //             expect(res.status).to.equal(400);
//     //         });
//     //         done();
//     //     });
//     // });

//     // describe('patch /goals/:id', function() {

//     //     it('should update the goal', function(done) {
//     //         request(app)
//     //         .patch(`/goals/${goalId}`)
//     //         .send({
//     //             description: "Update Description",
//     //             tags: ["nutrition", "health"],
//     //             userID: basicUserId,
//     //             deadline: "New Deadline"
//     //         })
//     //         .end((err, res) => {
//     //             expect(res.body).to.equal("goal updated!");
//     //             expect(res.status).to.equal(200);
//     //         });
//     //         done();
//     //     });

//     //     it('should return a 400 status code as the id does not link to a goal', function(done) {
//     //         request(app)
//     //         .patch(`/goals/${1232}`)
//     //         .send({
//     //             description: "Update Description",
//     //             tags: ["nutrition", "health"],
//     //             userID: basicUserId,
//     //             deadline: "New Deadline"
//     //         })
//     //         .end((err, res) => {
//     //             expect(res.status).to.equal(400);
//     //         });
//     //         done();
//     //     });
//     // });

//     // describe('delete /goals/:id', function() {

//     //     it('should delete the goal associated with the uri', function(done) {
//     //         request(app)
//     //         .delete(`/goals/${deleteGoalId}`)
//     //         .send()
//     //         .end((err, res) => {
//     //             expect(res.body).to.equal("goal deleted.");
//     //             expect(res.status).to.equal(200);
//     //         });
//     //         done();
//     //     });
        
//     //     it('should return 400 status code as the uri is not associated with a goal', function(done) {
//     //         request(app)
//     //         .delete(`/goals/${1234}`)
//     //         .send()
//     //         .end((err, res) => {
//     //             expect(res.body).to.not.equal("goal deleted.");
//     //             expect(res.status).to.equal(400);
//     //         });
//     //         done();
//     //     });
//     // });

//     after((done) => {
//         ProfessionalUser.deleteMany({});
//         done();
//       });
// });