import { expect } from 'chai';
import BasicUser from '../../models/basicUser.model.js';

describe('Testing BasicUser model', function() {
    let newBasicUser;
    let duplicateUser;
    beforeEach(() => {
        const basicUserBody = {
            username: "bob123",
            name: "Bob Smith",
            email: "bobsmith@test.com",
            password: "password123",
            gender: "Male",
            dob: new Date(),
            address: "Cambridge, UK",
            isBanned: false,
            bodyType: "Average",
            weight: "68kg",
            tags: ["tag1", "tag2"],
            bio: "This is my bio!",
        };
        newBasicUser = new BasicUser(basicUserBody);
        duplicateUser = new BasicUser(basicUserBody);
    });


    it('is valid when all of the mandatory fields are provided', function(done) {
        newBasicUser.validate(function(error) {
            expect(error).to.not.exist;
        });
        expect(newBasicUser.username).to.equal("bob123");
        expect(newBasicUser.name).to.equal("Bob Smith");
        expect(newBasicUser.email).to.equal("bobsmith@test.com");
        expect(newBasicUser.password).to.equal("password123");
        expect(newBasicUser.gender).to.equal("Male");
        expect(newBasicUser.address).to.equal("Cambridge, UK");
        expect(newBasicUser.isBanned).to.be.false;
        expect(newBasicUser.bodyType).to.equal("Average");
        expect(newBasicUser.weight).to.equal("68kg");
        expect(newBasicUser.tags.length).to.equal(2);
        expect(newBasicUser.bio).to.equal("This is my bio!"); 
        done();
    });

    it('is invalid as the madatory fields are null', function(done) {
        newBasicUser.username = null;
        newBasicUser.name = null;
        newBasicUser.email = null;
        newBasicUser.password = null;
        newBasicUser.bundles = null;
        newBasicUser.buckets = null;
        newBasicUser.validate(function(error) {
            expect(error.errors).to.exist;
            done();
        });
    });

    it('is invalid as the username does not meet the minimum length', function(done) {
        newBasicUser.username = "ab";
        newBasicUser.validate(function(error) {
            expect(error).to.exist;
            done();
        });
    });

    it('is invalid as the username is not unique', function(done) {
        duplicateUser.save();
        newBasicUser.save();
        newBasicUser.validate(function(error) {
            expect(error).to.exist;
            done();
        });
    });

    it('is invalid as the email is not unique', function(done) {
        duplicateUser.save();
        newBasicUser.save();
        newBasicUser.validate(function(error) {
            expect(error).to.exist;
            done();
        });
    });

    it('is invalid as the gender is not one of the enumerated values', function(done) {
        newBasicUser.gender = "abca";
        newBasicUser.validate(function(error) {
            expect(error).to.exist;
            done();
        });
    });

    it('has the correct default value for resetPasswordLink', function(done) {
        expect(newBasicUser.resetPasswordLink).to.equal('');
        done();
    });

    it('trims the username', function(done) {
        newBasicUser.username = "abc         ";
        expect(newBasicUser.username).to.equal("abc");
        expect(newBasicUser.username.length).to.equal(3);
        done();
    });


    after((done) => {
        BasicUser.collection.deleteMany({});
        done();
    });
    
});