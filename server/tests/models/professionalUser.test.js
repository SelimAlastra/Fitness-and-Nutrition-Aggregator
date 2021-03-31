import { expect } from 'chai';
import ProfessionalUser from '../../models/professionalUser.model.js';

describe('Testing ProfessionalUser model', function() {
    let newFullUser = null;
    let duplicateUser = null;
    beforeEach(() => {
        const professionalBody = {
            username: "bob123",
            name: "Bob Tester",
            email: "bobtester@mysite.com",
            password: "password123",
            profession: "Yoga Instructor",
            gender: "Male",
            dob: new Date(),
            address: "London",
            isBanned: false,
            tags: ["tag1", 'tag2'],
            bio: "This is my bio!",
            instagramLink: "instaLink",
            youtubeLink: "youtubeLink"
        };
        newFullUser = new ProfessionalUser(professionalBody);
        duplicateUser = new ProfessionalUser(professionalBody);
        

    });

    it('is valid, as all of the mandatory fields are supplied', function(done) {
        const professionalBody = {
            username: "bob123",
            name: "Bob Tester",
            email: "bobtester@mysite.com",
            password: "password123",
            profession: "Yoga Instructor",
        };
        const newUser = new ProfessionalUser(professionalBody);
        newUser.validate(function(error) {
            expect(error).to.not.exist;
        });
        expect(newUser._id).to.exist;
        expect(newUser.username).to.equal("bob123");
        expect(newUser.name).to.equal("Bob Tester");
        expect(newUser.email).to.equal("bobtester@mysite.com");
        expect(newUser.password).to.equal("password123");
        expect(newUser.profession).to.equal("Yoga Instructor");
        done();
    });

    it('is valid, as all fields are supplied', function(done) {
   
        newFullUser.validate(function(error) {
            expect(error).to.not.exist;
        });
        expect(newFullUser._id).to.exist;
        expect(newFullUser.username).to.equal("bob123");
        expect(newFullUser.name).to.equal("Bob Tester");
        expect(newFullUser.email).to.equal("bobtester@mysite.com");
        expect(newFullUser.password).to.equal("password123");
        expect(newFullUser.profession).to.equal("Yoga Instructor");
        expect(newFullUser.gender).to.equal("Male");
        expect(newFullUser.isBanned).to.be.false;
        expect(newFullUser.tags[0]).to.equal("tag1");
        expect(newFullUser.tags[1]).to.equal("tag2");
        expect(newFullUser.bio).to.equal("This is my bio!");
        expect(newFullUser.instagramLink).to.equal("instaLink");
        expect(newFullUser.youtubeLink).to.equal("youtubeLink");
        done();
    });
    
    it('is invalid, as madatory fields are not supplied', function(done) {
        newFullUser.username = null;
        newFullUser.name = null;
        newFullUser.email = null;
        newFullUser.password = null;
        newFullUser.profession = null;
        newFullUser.validate(function(error) {
            expect(error.errors).to.exist;
            done();
        });
    });

    it('is invalid when the gender is lowercase', function(done) {
        newFullUser.gender = "male";
        newFullUser.validate(function(error) {
            expect(error.errors).to.exist;
            done();
        });
    });

    it('is invalid if gender is not one of the enumerated values', function(done) {
        newFullUser.gender = "abca";
        newFullUser.validate(function(error) {
            expect(error.errors).to.exist;
            done();
        });
    });

    it('is invalid if the username is shorter than 3 characters', function(done) {
        newFullUser.username = "ac";
        newFullUser.validate(function(error) {
            expect(error.errors).to.exist;
            done();
        });
    });

    after((done) => {
        ProfessionalUser.collection.deleteMany({});
        done();
    });
});