import { expect } from 'chai';
import BasicUser from '../../models/basicUser.model.js';
import Bucket from '../../models/buckets.js';

describe('Testing Buckets model', function() {
	let newBucket;
	let basicUser;

	beforeEach(() => {
		const basicUserBody = {
            username: "bob123",
            name: "Bob Smith",
            email: "bobsmith@test.com",
            password: "password123",
            bundles: ["bundle1", "bundle2"],
            buckets: ["bucket1", "bucket2"]
        };
        basicUser = new BasicUser(basicUser);
        const bucketBody = {
			title: "Nutrition",
			postsId: [],
			userId: basicUser._id
		};
		newBucket = new Bucket(bucketBody);
	});

	it('is valid as all fields are valid', function(done) {
		newBucket.validate(function(error) {
			expect(error).not.exist;
			done();
		});
	});

	it('is invalid as the title is not supplied', function(done) {
		newBucket.title = null;
		newBucket.validate(function(error) {
			expect(error).to.exist;
			done();
		});
	});

	it('is invalid as the userId is not supplied', function(done) {
		newBucket.userId = null;
		newBucket.validate(function(error) {
			expect(error).to.exist;
			done();
		});
	});

});