import { expect } from 'chai';
import Admin from '../../models/admin.model.js';

describe('Testing Admin model', function() {
    let newAdminUser;
    beforeEach(() => {
        const adminUserBody = {
            username: "user123",
            password: "password123"
        };
        newAdminUser = new Admin(adminUserBody);
    });

    it('is valid when all of the fields are valid', function(done) {
        expect(newAdminUser.username).to.equal("user123");
        expect(newAdminUser.password).to.equal("password123");
        newAdminUser.validate(function(error) {
            expect(error).to.not.exist;
            done();
        });
    });

    it('is invalid when no username is supplied', function(done) {
        newAdminUser.username = null;
        newAdminUser.validate(function(error) {
            expect(error).to.exist;
            done();
        });
    });

    it('is invalid when no password is supplied', function(done) {
        newAdminUser.password = null;
        newAdminUser.validate(function(error) {
            expect(error).to.exist;
            done();
        });
    });

    it('is invalid if the username is less than 3 characters', function(done) {
        newAdminUser.username = "ab";
        newAdminUser.validate(function(error) {
            expect(error).to.exist;
            done();
        });
    });

    it('trims the username to remove whitespaces', function(done) {
        newAdminUser.username = "pass123          ";
        expect(newAdminUser.username).to.equal("pass123");
        expect(newAdminUser.username.length).to.equal(7);
        done();
    });

    it('is invalid as the username is not unique', function(done) {
        const duplicateUser = new Admin({username: "admin123", password: "pass123"});
        duplicateUser.save();
        newAdminUser.save(function(error) {
            expect(error).to.exist;
            done();
        });
        done();
    });
});