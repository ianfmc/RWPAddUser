var AWSMock = require('aws-sdk-mock');
var AWS = require('aws-sdk');

var app = require('../index.js');
var chai = require('chai');
var sinon = require('sinon');

var expect = require('chai').expect;
var should = require('chai').should;
var assert = require('chai').assert;

describe('Add a New Team', function() { 

	var callback;

	var userCorrect;
	var userNoEmail;
	var userBadEmail;


	beforeEach(function() {
		context = { };
		userCorrect = {
		    "email" : "pete.smith@corp.com"
			};
		userNoEmail = {
			
			};
		userBadEmail = {
			"email" : "pete.smith"
			};
	});

	afterEach(function() {
	});

	it('-- Adds a User with correct data', sinon.test(function(done) {
		app.handler(userCorrect, context, function (err, data) {
			expect(err).to.be(null);
			expect(data).to.contain('user');
			done();
		})
		done();
	}));

	it('-- Fails when no Email is found', sinon.test(function(done) {

		app.handler(userNoEmail, context, function (err, data) {
			expect(err.message).equal('No email');
			done();
		});
	}));

	it('-- Fails when the Email is malformed', sinon.test(function(done) {

		app.handler(userBadEmail, context, function (err, data) {
			expect(err.message).equal('Malformed email');
			done();
		});
	}));	
});


