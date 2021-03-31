import { expect } from 'chai';
import mongoose from 'mongoose';
import Service from '../../models/service.model.js';

describe('Testing Service model', function() {
    it('should be valid, as all fields are supplied correctly ', function(done) {
        const serviceBody = {
            price: "23.45",
            description: "This is the description",
            urls: ["http://localhost:5000/abc"],
            title: "New Fitness Service",
            userID: mongoose.mongo.ObjectId()
          };
        const newService = new Service(serviceBody);
        expect(newService.price).to.equal("23.45");
        expect(newService.title).to.equal("New Fitness Service");
        expect(newService.description).to.equal("This is the description");
        expect(newService.urls[0]).to.equal("http://localhost:5000/abc");
        expect(typeof newService.userID).to.equal('object');
        newService.validate(function(error) {
            expect(error).to.not.exist;
            done();
        })
    });
    

    it('should be invalid, as userID is left out', function(done) {
        const serviceBody = {
            price: "23.45",
            description: "This is the description",
            urls: ["http://localhost:5000"],
            title: "New Fitness Service",
          };
        const newService = new Service(serviceBody);
        newService.validate(function(error) {
            expect(error).to.exist;
            done();
        })
    });

    it('should be invalid, as title is left out', function(done) {
        const serviceBody = {
            price: "23.45",
            description: "This is the description",
            urls: ["http://localhost:5000"],
            userID: mongoose.mongo.ObjectId()
          };
        const newService = new Service(serviceBody);
        newService.validate(function(error) {
            expect(error).to.exist;
            done();
        })
    });

    it('should be invalid, as description is left out', function(done) {
        const serviceBody = {
            price: "23.45",
            urls: ["http://localhost:5000"],
            title: "New Fitness Service",
            userID: mongoose.mongo.ObjectId()
          };
        const newService = new Service(serviceBody);
        newService.validate(function(error) {
            expect(error).to.exist;
            done();
        })
    });

    it('should be invalid, as price is left out', function(done) {
        const serviceBody = {
            description: "This is the description",
            urls: ["http://localhost:5000"],
            title: "New Fitness Service",
            userID: mongoose.mongo.ObjectId()
          };
        const newService = new Service(serviceBody);
        newService.validate(function(error) {
            expect(error).to.exist;
            done();
        })
    });

    it('should be valid, as price is converted to a string', function(done) {
        const serviceBody = {
            price: 2322,
            description: "This is the description",
            urls: ["http://localhost:5000"],
            title: "New Fitness Service",
            userID: mongoose.mongo.ObjectId()
          };
        const newService = new Service(serviceBody);
        expect(typeof newService.price).to.equal('string');
        newService.validate(function(error) {
            expect(error).to.not.exist;
            done();
        })
    });

    it('should be valid, as description and title are converted to strings', function(done) {
        const serviceBody = {
            price: "23.23",
            description: 454040303,
            urls: ["http://localhost:5000"],
            title: 33432202032,
            userID: mongoose.mongo.ObjectId()
          };
          const newService = new Service(serviceBody);
          expect(typeof newService.title).to.equal('string');
          expect(typeof newService.description).to.equal('string');
          newService.validate(function(error) {
            expect(error).to.not.exist;
            done();
        })
    });

    after((done) => {
        Service.collection.deleteMany({});
        done();
    });
});