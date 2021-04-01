import request from 'supertest';
import chai from 'chai';
const expect = chai.expect;
import app from '../../index.js';
import Admin from '../../models/admin.model.js';


describe('admins routes', function() {
    let admin;
    before((done) => {
        admin = new Admin({
            username: 'admin123',
            password: 'admin123',
        });
        admin.save();
        done();
    });

    describe('get /admins', function() {

        it('should get all admins and return a 200 status code', function(done) {
            request(app)
            .get('/admins')
            .send()
            .end((err, res) => {
                expect(res.status).to.equal(200);
                done();
            }); 
        });
    });

    describe('post /admins/login', function() {

        it('should login an admin', function(done) {
            request(app)
            .post(`/admins/login`)
            .send({
                username: 'admin123',
                password: 'admin123',
            })
            .end((err, res) => {
                admin = res.body.user;
                expect(res.status).to.equal(200);
                expect(admin.username).to.equal("admin123");
                expect(admin.type).to.equal("admin");
                expect(res.body.token).to.exist;
                done();
            });
        });

        it('should not login an admin, as the username is wrong', function(done) {
            request(app)
            .post(`/admins/login`)
            .send({
                username: 'admin',
                password: 'admin123',
            })
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body.errors).to.equal('Error');
                done();
            });
        });

        it('should not login an admin, as the password is wrong', function(done) {
            request(app)
            .post(`/admins/login`)
            .send({
                username: 'admin123',
                password: 'admin',
            })
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body.errors).to.equal('Error');
                done();
            });
        });
        

    });

    after((done) => {
        Admin.collection.deleteMany({});
        done();
    });
});