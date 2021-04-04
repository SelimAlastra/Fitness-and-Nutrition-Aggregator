import request from 'supertest';
import chai from 'chai';
const expect = chai.expect;
import app from '../../index.js';
import BasicUser from '../../models/basicUser.model.js'
import Bucket from '../../models/buckets.js'
import mongoose  from 'mongoose';

describe('buckets routes', function() {
    let basicUser, basicUserId, bucket, bucketId, editBucket, editBucketId,
    deleteBucket, deleteBucketId;

    before((done) => {
        basicUser = new BasicUser({
            username: "232",
            name: "Bob Smith",
            email: "bobsmith@fakesite.com",
            password: "password123",
            buckets: ["bucket1"],
            bundles: ["bundle1"]
        });
        basicUser.save();
        basicUserId = basicUser._id;
        bucket = new Bucket({
            _id: bucketId,
            title: "New Bucket",
            postsId: ["", ""],
            userId: basicUserId,
        });
        bucket.save();
        bucketId = bucket._id;
        editBucket = Bucket({
            _id: editBucketId,
            title: "New Bucket",
            postsId: ["", ""],
            userId: basicUserId,
        });
        editBucket.save();
        editBucketId = editBucket._id;
        deleteBucket = Bucket({
            _id: deleteBucketId,
            title: "New Bucket",
            postsId: ["", ""],
            userId: basicUserId,
        });
        deleteBucket.save();
        deleteBucketId = deleteBucket._id;
        console.log("started");
        done();
    });

    describe('post /buckets', function() {

        it('should make a new bucket', function(done) {
            request(app)
            .post('/buckets')
            .send({
                title: "Nutrition",
                userId: basicUserId,
                postsId: ["123", "456"]
            })
            .end((err, res) => {
                expect(res.status).to.equal(201);
                expect(res.body.title).to.equal("Nutrition");
                expect(res.body.postsId[0]).to.equal("123");
                expect(res.body.postsId[1]).to.equal("456");
                expect(res.body.userId).to.equal("" + basicUserId);
                done();
            });
        });

        it('should return a 400 if the bucket could not be added', function(done) {
            request(app)
            .post('/buckets')
            .send({
                title: "New Bucket",
                postsId: [],
            })
            .end((err, res) => {
                expect(res.status).to.equal(400);
                done();
            });
        });
    });

    describe('get /buckets', function() {

        it('should get all buckets and return a 200 status code', function(done) {
            request(app)
            .get('/buckets')
            .send()
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.not.null;
                done();
            });
        });
    });

    describe('get /buckets/:id', function() {
      
        it('should get the buckets object that have userId equal to basicUserId', function(done) {
            request(app)
            .get(`/buckets/${bucketId}`)
            .send()
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body._id).to.equal("" + bucketId);
                expect(res.body.title).to.equal("New Bucket");
                done();
            });
        });

        it('should return a 404 status code as an invalid id is supplied', function(done) {
            request(app)
            .get(`/buckets/${1233}`)
            .send()
            .end((err, res) => {
                expect(res.status).to.equal(404);
                done();
            });
        });
    });

    describe('patch /buckets/:id', function() {

        it('should update the bucket', function(done) {
            request(app)
            .patch(`/buckets/${editBucketId}`)
            .send({
                _id: editBucketId,
                title: "Updated Bucket",
                postsId: ["56655555", "44303030302"],
                userID: basicUserId,
            })
            .end((err, res) => {
                expect(res.body._id).to.equal("" + editBucketId);
                expect(res.body.title).to.equal("Updated Bucket");
                expect(res.status).to.equal(200);
                done();
            });
        });

        it('should return a 404 status code as the id does not link to a bucket', function(done) {
            request(app)
            .patch(`/buckets/${1232}`)
            .send({
                _id: 1234,
                title: "Updated Bucket",
                postsId: ["", ""],
                userID: basicUserId,
            })
            .end((err, res) => {
                expect(res.status).to.equal(404);
                done();
            });
        });
    });

    describe('delete /buckets', function() {

        it('should delete the bucket associated with the uri', function(done) {
            request(app)
            .delete(`/buckets/${deleteBucketId}`)
            .send()
            .end((err, res) => {
                expect(res.body.message).to.equal("Bucket deleted successfully");
                expect(res.status).to.equal(200);
                done();
            });
        });
        
        it('should return 400 status code as the uri is not associated with a bucket', function(done) {
            request(app)
            .delete(`/buckets/${1234}`)
            .send()
            .end((err, res) => {
                expect(res.body).to.not.equal("bucket deleted.");
                expect(res.status).to.equal(404);
                done();
            });
        });
    });

    after(async (done) => {
        Bucket.collection.deleteMany({});
        BasicUser.collection.deleteMany({});
        done();
      });
});
