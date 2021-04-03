import request from 'supertest';
import chai from 'chai';
const expect = chai.expect;
import app from '../../index.js';
import Report from '../../models/reports.js'
import BasicUser from '../../models/basicUser.model.js'
import ProfessionalUser from '../../models/professionalUser.model.js'
import PostMessage from '../../models/postMessage.js'


describe('report routes', function() {

    let reporter, reported, reportedPost, report;
    
    before((done) => {
        reporter = new BasicUser({
            username: 'Bob_123',
            email: 'bob@hotmail.com',
            password: 'bOb@123123',
            name: 'Bob'
        })
        reported = new ProfessionalUser({
            username: 'Alice_123',
            email: 'alice@hotmail.com',
            password: 'aliCe@123123',
            name: 'Alice'
        })
        reportedPost = new PostMessage({
            creator: reported.username,
            userFrom: reported._id,
            title: 'Test Post'
        })
        done();
    });

    describe('post /reports', function() {

        it('should make a new report', function(done) {
            request(app)
            .post('/reports')
            .send({
                reporterUsername: reporter.username,
                reportedUsername: reported.username,
                postId: reportedPost._id,
                reason: 'Test Report'
            })
            .end((err, res) => {
                report = res.body;
                expect(res.status).to.equal(201);
                expect(report).to.have.property("reason");
                expect(report.reason).to.equal('Test Report');
                expect(report).to.have.property("reporterUsername");
                expect(report).to.have.property('reporterUsername')
                expect(report.reporterUsername).to.eq(reporter.username)
                expect(report).to.have.property('reportedUsername')
                expect(report.reportedUsername).to.eq(reported.username)
                expect(report).to.have.property('postId')
                expect(report.postId).to.eq("" +reportedPost._id)
                done();
            })
            
        })

        it('should return a 409 if the report could not be added', function(done) {
            request(app)
            .post('/posts')
            .send({
                reason: 'Test Report'
            })
            .end((err, res) => {
                expect(res.status).to.equal(400);
            });
            done();
        });
    });

    describe('get /reports/:id', function() {

        it('should retrieve a specific report', function(done) {
            request(app)
            .get(`/reports/${report._id}`)
            .send()
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('_id');
                expect(res.body._id).to.equal(report._id);
                done();
            }); 
        });

        it('should return a 404 status code as an invalid id is supplied', function(done) {
            request(app)
            .get(`/reports/${1233}`)
            .send()
            .end((err, res) => {
                expect(res.status).to.equal(404);
                done();
            });
        });
    });

    describe('get /reports', function() {

        it('should get all reports and return a 200 status code', function(done) {
            request(app)
            .get('/reports')
            .send()
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.length).to.equal(1);
                expect(res.body[0]).to.have.property('_id');
                expect(res.body[0]._id).to.equal(report._id);
                done();
            }); 
        });
    });

    describe('delete /reports/:id', function() {

        it('should delete the report associated with the uri', function(done) {
            request(app)
            .delete(`/reports/${report._id}`)
            .send()
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.message).to.equal("Report deleted successfully");
                done();
            }); 
        });

        it('should return 404 status code as the uri is not associated with a report', function(done) {
            request(app)
            .delete(`/reports/${1234}`)
            .send()
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body).to.not.equal("Report deleted successfully");
                done();
            });
        });
    });

    after((done) => {
        Report.collection.deleteMany({});
        BasicUser.collection.deleteMany({});
        ProfessionalUser.collection.deleteMany({});
        PostMessage.collection.deleteMany({});
        done();
    });
});

