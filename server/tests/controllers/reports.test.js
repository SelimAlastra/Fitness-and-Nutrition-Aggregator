import request from 'supertest';
import chai from 'chai';
const expect = chai.expect;
import app from '../../index.js';
import Report from '../../models/reports.js'
import BasicUser from '../../models/basicUser.model.js'
import ProfessionalUser from '../../models/professionalUser.model.js'
import PostMessage from '../../models/postMessage.js'


describe('report routes', () => {
    let reporter;
    let reported;
    let reportedPost;
    let report;

    before(() => {
        reporter = new BasicUser({
            username: 'Bob_123',
            email: 'bob@hotmail.com',
            password: 'bOb@123123',
            name: 'Bob'
        })

    });

    before(() => {
        reported = new ProfessionalUser({
            username: 'Alice_123',
            email: 'alice@hotmail.com',
            password: 'aliCe@123123',
            name: 'Alice'
        })
    });


    before((done) => {
        reportedPost = new PostMessage({
            creator: reported.username,
            userFrom: reported._id,
            title: 'Test Post'
        })
        done();
    });

    describe('post /reports', () => {
        it('should make a new report', (done) => {
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
                expect(res.status).to.equal(200);
                expect(res.body.reason).to.equal('Test Report');
                done();
            });
        });
        it('should have the reporter username', (done) => {
            expect(report).to.have.property("reporterUsername");
            expect(report.reporterUsername).to.eq(reporter.username);
            done();
        });
        it('should have the reported username', (done) => {
            expect(report).to.have.property("repotedUsername");
            expect(report.repotedUsername).to.eq(reported.username);
            done();
        });
        it('should have the reported post id', (done) => {
            expect(report).to.have.property("postId");
            expect(report.postId).to.eq(reportedPost._id);
            done();
        });
    })

});

after((done) => {
    Report.deleteMany({});
    BasicUser.deleteMany({});
    ProfessionalUser.deleteMany({});
    PostMessage.deleteMany({});
    done();
});