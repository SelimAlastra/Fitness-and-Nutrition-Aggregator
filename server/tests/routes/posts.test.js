import request from 'supertest';
import chai from 'chai';
const expect = chai.expect;
import app from '../../index.js';
import PostMessage from '../../models/postMessage.js';
import BasicUser from '../../models/basicUser.model.js';
import ProfessionalUser from '../../models/professionalUser.model.js';
import Bucket from '../../models/buckets.js';

describe('Posts routes', function() {

    let post, basicUser, professional;

    before((done) => {
        basicUser = new BasicUser({
            username: 'Bob_123',
            email: 'bob@hotmail.com',
            password: 'bOb@123123',
            name: 'Bob'
        });
        professional = new ProfessionalUser({
            username: 'Alice_123',
            email: 'alice@hotmail.com',
            password: 'aliCe@123123',
            name: 'Alice'
        });
        done();
    });

    describe('post /posts', function() {

        it('should make a new post', function(done) {
            request(app)
            .post('/posts')
            .send({
                creator: professional.username,
                userFrom: professional._id,
                title: 'TEST POST',
                message: 'THIS IS A TEST POST',
            })
            .end((err, res) => {
                post = res.body;
                expect(res.status).to.equal(201);
                expect(post).to.have.property('creator');
                expect(post.creator).to.equal(professional.username);
                expect(post).to.have.property('userFrom');
                expect(post.userFrom).to.equal('' + professional._id);
                expect(post).to.have.property('title');
                expect(post.title).to.equal('TEST POST');
                expect(post).to.have.property('message');
                expect(post.message).to.equal('THIS IS A TEST POST');
                done();
            });
        });

        it('should return a 400 if the post could not be added', function(done) {
            request(app)
            .post('/posts')
            .send({
                userFrom: professional._id,
                title: 'TEST POST',
                message: 'THIS IS A TEST POST',
            })
            .end((err, res) => {
                expect(res.status).to.equal(400);
                done();
            });
        });
    });

    describe('get /posts/:id', function() {

        it('should retrieve a specific post', function(done) {
            request(app)
            .get(`/posts/${post._id}`)
            .send()
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('_id');
                expect(res.body._id).to.equal(post._id);
                done();
            }); 
        });

        it('should return a 404 status code as an invalid id is supplied', function(done) {
            request(app)
            .get(`/posts/${1233}`)
            .send()
            .end((err, res) => {
                expect(res.status).to.equal(404);
                done();
            });
        });
    });

    describe('get /posts', function() {

        it('should get all posts and return a 200 status code', function(done) {
            request(app)
            .get('/posts')
            .send()
            .end((err, res) => {
                expect(res.status).to.equal(200);
                done();
            }); 
        });
    });

    describe('get /posts/:id/bucket', function() {
        let bucket;
        before((done) => {
            bucket = new Bucket({
                title: "New Bucket",
                description: "new bucket added",
                postsId: [post._id],
                userId: basicUser._id,
            });
            bucket.save().then(() => done());
        });

        it('should get all posts froma bucket, and return a 200 status code', function(done) {
            request(app)
            .get(`/posts/${bucket._id}/bucket`)
            .send()
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body[0]._id).to.equal(post._id);
                done();
            }); 
        });
    });

    describe('patch /posts/:id', function() {

        it('should update the post', function(done) {
            request(app)
            .patch(`/posts/${post._id}`)
            .send({
                title: 'NOT A TEST POST',
            })
            .end((err, res) => {
                post = res.body;
                expect(res.status).to.equal(200);
                expect(post).to.have.property('creator');
                expect(post.creator).to.equal(professional.username);
                expect(post).to.have.property('userFrom');
                expect(post.userFrom).to.equal('' + professional._id);
                expect(post).to.have.property('title');
                expect(post.title).to.equal('NOT A TEST POST');
                expect(post).to.have.property('message');
                expect(post.message).to.equal('THIS IS A TEST POST');
                done();
            });
        });

        it('should return a 404 status code as the id does not link to a post', function(done) {
            request(app)
            .patch(`/posts/${1232}`)
            .send({
                title: 'NOT A TEST POST',
            })
            .end((err, res) => {
                expect(res.status).to.equal(404);
                done();
            });
        });
    });

    describe('patch /posts/:userId/likePost', function() {

        it('should add a user id to the like array of the post', function(done) {
            request(app)
            .patch(`/posts/${post._id}/${basicUser._id}/likePost`)
            .send()
            .end((err, res) => {
                post = res.body;
                expect(res.status).to.equal(200);
                expect(post).to.have.property('likes');
                expect(post.likes[0]).to.equal('' + basicUser._id);
                done();
            });
        });

        it('should return a 404 status code as the id does not link to a post', function(done) {
            request(app)
            .patch(`/posts/${1232}/${basicUser._id}/likePost`)
            .send()
            .end((err, res) => {
                expect(res.status).to.equal(404);
                done();
            });
        });
    });

    describe('delete /posts/:id', function() {

        it('should delete the post associated with the uri', function(done) {
            request(app)
            .delete(`/posts/${post._id}`)
            .send()
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.message).to.equal("Post deleted successfully!");
                done();
            }); 
        });

        it('should return 404 status code as the uri is not associated with a post', function(done) {
            request(app)
            .delete(`/posts/${1234}`)
            .send()
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body).to.not.equal("Post deleted successfully!");
                done();
            });
        });
    });

    after((done) => {
        BasicUser.collection.deleteMany({});
        ProfessionalUser.collection.deleteMany({});
        PostMessage.collection.deleteMany({});
        Bucket.collection.deleteMany({});
        done();
    });
});