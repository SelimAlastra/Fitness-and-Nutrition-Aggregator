import { expect } from 'chai';
import Report from '../../models/reports.js';

describe('Testing Report model', function() {
	let newReport;

	beforeEach(() => {
		const reportBody = {
			reporterUsername: "rep123",
			reportedUsername: "usr232",
			reason: "Fake news",
			postId: "342",
		};
		newReport = new Report(reportBody);
	});

	it('is valid as all fields are valid ', function(done) {
		expect(newReport.reporterUsername).to.equal("rep123");
		expect(newReport.reportedUsername).to.equal("usr232");
		expect(newReport.reason).to.equal("Fake news");
		expect(newReport.postId).to.equal("342");
		newReport.validate(function(error) {
			expect(error).to.not.exist;
		});
	});

	
});