import request from 'supertest';
import chai from 'chai';
const expect = chai.expect;
import app from '../../index.js';
import Report from '../../models/reports.js'
import BasicUser from '../../models/basicUser.model.js'
import ProfessionalUser from '../../models/professionalUser.model.js'
import PostMessage from '../../models/postMessage.js'



describe('report routes', () => {
    let reporter, reported, reportedPost;
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

    describe('post /reports', () => {
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
                expect(res.status).to.equal(200);
                expect(res.body.reason).to.equal('Test Report');
                expect(res.body).to.have.property("reporterUsername");
                expect(res.body).to.have.property('reporterUsername')
                expect(res.body.reporterUsername).to.eq(reporter.username)
                expect(res.body).to.have.property('reportedUsername')
                expect(res.body.reportedUsername).to.eq(reported.username)
                expect(res.body).to.have.property('postId')
                expect(res.body.postId).to.eq("" +reportedPost._id)
            })
            
        })

        it('should return a 409 if the report could not be added', function(done) {
            request(app)
            .post('/posts')
            .send({
                reason: 'Test Report'
            })
            .end((err, res) => {
                expect(res.status).to.equal(409);
            });
            done();
        });
    });

    describe('get /reports', function() {

        it('should get all reports and return a 200 status code', function(done) {
            request(app)
            .get('/reports')
            .send()
            .end((err, res) => {
                expect(res.status).to.equal(200);
            }); 
            done();
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
