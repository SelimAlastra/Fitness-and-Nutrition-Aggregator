import { expect } from 'chai';
import PostMessage from '../../models/postMessage.js';
import mongoose  from 'mongoose';

describe('Testing Post model', function() {
	let newPostMessage;

	beforeEach(() => {
		const postMessageBody = {
			title: "mytitle",
			message: "mymessage",
			userFrom: mongoose.mongo.ObjectId(),
			creator: "BobSmith",
			tags: ["tag1", "tag2"],
			url: "http://fakesite.co.uk"
		};
		newPostMessage = new PostMessage(postMessageBody);
	});

	it('is valid as all mandatory fields are supplied', function(done) {
		expect(newPostMessage.title).to.equal("mytitle");
		expect(newPostMessage.message).to.equal("mymessage");
		expect(newPostMessage).to.have.property('userFrom');
		//expect(newPostMessage.name).to.equal("bob123");
		expect(newPostMessage.creator).to.equal("BobSmith");
		expect(newPostMessage.tags[0]).to.equal("tag1");
		expect(newPostMessage.tags[1]).to.equal("tag2");
		expect(newPostMessage.url).to.equal("http://fakesite.co.uk");
		newPostMessage.validate(function(error) {
			expect(error).to.not.exist;
			done();
		});
	});

	it('is invalid as not all mandatory fields are supplied', function(done) {
		newPostMessage.title = null;
		newPostMessage.message = null;
		newPostMessage.creator = null;
		newPostMessage.validate(function(error) {
			expect(error.errors).exist;
			done();
		});
	});

	it('has a default empty array for likes', function(done) {
		expect(newPostMessage.likes.length).to.equal(0);
		done();
	});

	after((done) => {
        PostMessage.collection.deleteMany({});
        done();
    });
});