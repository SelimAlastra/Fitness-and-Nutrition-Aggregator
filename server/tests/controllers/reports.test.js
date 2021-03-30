import request from 'supertest';
import chai from 'chai';
const expect = chai.expect;
const {app} = require('../../index.js');
import Report from '../../models/reports.js'
import BasicUser from '../../models/basicUser.model.js'
import ProfessionalUser from '../../models/professionalUser.model.js'
import PostMessage from '../../models/postMessage.js'

let reporter, reported, reportedPost;
before(() => {
    reporter = new BasicUser({
        username: 'Bob_123',
        email: 'bob@hotmail.com',
        password: 'bOb@123123',
        name: 'Bob'})
});

before(() => {
    reported = new ProfessionalUser({
        username: 'Alice_123',
        email: 'alice@hotmail.com',
        password: 'aliCe@123123',
        name: 'Alice'})
});


before((done) => {
    reportedPost = new PostMessage({
        creator: reported.username,
        userFrom: reported._id,
        title: 'Test Post'
    })
    done()
});

describe('report routes', () => {
    let report;
    describe('post /reports', () => {
        it('should make a new report', (done) => {
            app.router()
            .post('/reports')
            .send({
                repoterUsername: reporter.username,
                reportedUsername: reported.username,
                postId: reportedPost._id,
                reason: 'Test Report'
            })
            .end((err, res) => {
                report = res.body
                expect(res.status).to.eq(200);
                expect(res.body.reason).to.eq('Test Report');
                done()
            })
        })
        it('should have the reporter username', (done) => {
            expect(report).to.have.property(repoterUsername)
            expect(report.repoterUsername).to.eq(reporter.username)
            done()
        })
        it('should have the reported username', (done) => {
            expect(report).to.have.property(repotedUsername)
            expect(report.repotedUsername).to.eq(reported.username)
            done()
        })
        it('should have the reported post id', (done) => {
            expect(report).to.have.property(postId)
            expect(report.postId).to.eq(reportedPost._id)
            done()
        })
    })
});


after(async (done) => {
    await Report.deleteMany({});
    await BasicUser.deleteMany({});
    await ProfessionalUser.deleteMany({});
    await PostMessage.deleteMany({});
    done()
});
