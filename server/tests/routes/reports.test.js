// import request from 'supertest';
// import chai from 'chai';
// const expect = chai.expect;
// import app from '../../index.js';
// import Report from '../../models/reports.js'
// import BasicUser from '../../models/basicUser.model.js'
// import ProfessionalUser from '../../models/professionalUser.model.js'
// import PostMessage from '../../models/postMessage.js'



// describe('report routes', () => {
//     let reporter, reported, reportedPost;
//     before(() => {
//         reporter = new BasicUser({
//             username: 'Bob_123',
//             email: 'bob@hotmail.com',
//             password: 'bOb@123123',
//             name: 'Bob'})
//     });

//     before(() => {
//         reported = new ProfessionalUser({
//             username: 'Alice_123',
//             email: 'alice@hotmail.com',
//             password: 'aliCe@123123',
//             name: 'Alice'})
//     });


//     before((done) => {
//         reportedPost = new PostMessage({
//             creator: reported.username,
//             userFrom: reported._id,
//             title: 'Test Post'
//         })
//         done()
//     });


//     let report;
//     describe('post /reports', () => {
//         it('should make a new report', (done) => {
//             request(app)
//             .post('/reports')
//             .send({
//                 reporterUsername: reporter.username,
//                 reportedUsername: reported.username,
//                 postId: reportedPost._id,
//                 reason: 'Test Report'
//             })
//             .end((err, res) => {
//                 report = res.body
//                 expect(res.status).to.equal(201);
//                 expect(res.body.reason).to.equal('Test Report');
//                 expect(report).to.have.property("reporterUsername");
//                 expect(report.reporterUsername).to.equal(reporter.username);
//                 expect(report).to.have.property("reportedUsername");
//                 expect(report.reportedUsername).to.equal(reported.username);
//                 expect(report).to.have.property("postId");
//                 expect(report.postId).to.equal("" + reportedPost._id);
//                 done();
//             })
//         })
//         // it('should have the reporter username', () => {
//         //     expect(report).to.have.property(reporterUsername)
//         //     expect(report.reporterUsername).to.eq(reporter.username)
//         // })
//         // it('should have the reported username', () => {
//         //     expect(report).to.have.property(repotedUsername)
//         //     expect(report.repotedUsername).to.eq(reported.username)
//         // })
//         // it('should have the reported post id', () => {
//         //     expect(report).to.have.property(postId)
//         //     expect(report.postId).to.eq(reportedPost._id)
//         // })
//     })

//     after((done) => {
//         Report.deleteMany({});
//         BasicUser.deleteMany({});
//         ProfessionalUser.deleteMany({});
//         PostMessage.deleteMany({});
//         done()
//     });
// });
