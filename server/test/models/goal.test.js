import { expect } from 'chai';
import BasicUser from '../../models/basicUser.model.js';
import Goal from '../../models/goal.model.js';

describe('Testing Goal Model', function() {
    let basicUser;
    let newGoal;
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
        const goalBody = {
            userID: basicUser._id,
            description: "my goals",
            deadline: "6th April",
            tags: ["tag1", "tag2"]
        };
        newGoal = new Goal(goalBody);
    });

    it('is valid as all fields are correct', function(done) {
        expect(newGoal.userID).to.equal(basicUser._id);
        expect(newGoal.description).to.equal("my goals");
        expect(newGoal.deadline).to.equal("6th April");
        expect(newGoal.tags[0]).to.equal("tag1");
        expect(newGoal.tags[1]).to.equal("tag2");
        newGoal.validate(function(error) {
            expect(error).to.not.exist;
            done();
        });
    });

    it('is invalid if the userID is not supplied', function(done) {
        newGoal.userID = null;
        newGoal.validate(function(error) {
            expect(error).to.exist;
            done();
        });
    });
});
