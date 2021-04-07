import { expect } from 'chai';
import Report from '../../models/reports.js';
import mongoose  from 'mongoose';

describe('Testing Report model', function() {
	let newReport;

	beforeEach(() => {
		const reportBody = {
			reporterUsername: "rep123",
			reportedUsername: "usr232",
			reason: "Fake news",
			postId: mongoose.mongo.ObjectId()
		};
		newReport = new Report(reportBody);
	});

	it('is valid as all fields are valid ', function(done) {
		expect(newReport.reporterUsername).to.equal("rep123");
		expect(newReport.reportedUsername).to.equal("usr232");
		expect(newReport.reason).to.equal("Fake news");
		expect(newReport).to.have.property('postId');
		newReport.validate(function(error) {
			expect(error).to.not.exist;
			done();
		});
	});

	it('is invalid as the mandatory fields are not supplied', function(done) {
		newReport.reportedUsername = null;
		newReport.reporterUsername = null;
		newReport.postId = null;
		newReport.validate(function(error) {
			expect(error).to.exist;
            done();
		});
	});

	after((done) => {
        Report.collection.deleteMany({});
        done();
    });

});