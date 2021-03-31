// import request from 'supertest';
// import chai from 'chai';
// const expect = chai.expect;
// import app from '../../index.js';
// import ProfessionalUser from '../../models/basicUser.model.js'
// import mongoose  from 'mongoose';
// import BasicUser from '../../models/basicUser.model.js';


// describe('professional user routes', function() {
//     let bascUser;
//     before((done) => {
//         // basicUser = new BasicUser({
//         //     username: 'Bob_123',
//         //     email: 'bob@hotmail.com',
//         //     password: 'bOb@123123',
//         //     name: 'Bob'
//         // })
//         // });
//         // bannedProfessionalUser.save();
//         done();
//     });


//     describe('post /basicUsers', function() {

//         it('should make a new basic user', function(done) {
//             request(app)
//             .post('/basicUsers')
//             .send({
//                 username: 'Bob_123',
//                 email: 'bob@hotmail.com',
//                 password: 'bOb@123123',
//                 name: 'Bob'
//             })
//             .end((err, res) => {
//                 expect(res.status).to.equal(200);
//                 expect(res.body).to.equal("BasicUser added!");
//                 done();
//             });
//         });

//         it('should return a 400 if the basic user could not be added', function(done) {
//             request(app)
//             .post('/basicUsers')
//             .send({
//                 username: 'Bob_123',
//                 email: 'bob@hotmail.com',
//                 password: 'bOb@123123'
//             })
//             .end((err, res) => {
//                 expect(res.status).to.equal(400);
//                 expect(res.body).to.not.equal("BasicUser added!");
//                 done();
//             });
//         });
//     });

//     after((done) => {
//         ProfessionalUser.deleteMany({});
//         done();
//       });
// });