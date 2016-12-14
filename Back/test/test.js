/**
 * Created by jovi on 12/13/2016.
 */
var User = require('../models/Users');
var Cart = require('../models/Cart');
var assert = require('assert');
var should = require('should');
var request = require('supertest');
var mongoose = require('mongoose');
var url = 'http://localhost:3000/';
var config = require('../config/config');
var sinon = require('sinon');
var app = require('../app');

describe('Sanity', function () {
    describe("real sanity", function()
    {
        it('Sanity should be proven here', function * () {
            expect('test').to.equal('test');
            done();
        });
    });
});

describe('Models', function()
{
    describe('UserCreation', function () {
        it('admin default false', function * () {
            var user = new User();
            assert.equal(user.admin,false);
        });
    });
});

describe('Routes', function()
{
    describe('Response', function(){
        it("Should get basic response", function(done)
        {
            request(app)
                .get('/')
                .expect(200,done);
        });
    });

    describe('Post Register', function()
    {
        it("Register should work", function(done)
        {
            request(app)
                .post('/register')
                .send({username:"Jovi@gmail.com", password: "wachtwoord"})
                .expect(200,done);
        });
    });
    describe('Post RegisterFail', function()
    {
        it("Register shouldn't succeed (already exists)", function(done)
        {
            request(app)
                .post('/register')
                .send({username:"Jovi@gmail.com", password: "wachtwoord"})
                .expect(500,done);
        });
    });
    describe('GET Products', function()
    {
        it("Products should be found", function(done)
        {
            request(app)
                .get('/shop/getAllProducts')
                .expect(200,done);
        });
    });
    describe('GET Categories', function()
    {
        it("Should fail because no token", function(done)
        {
            request(app)
                .get('/admin/AllCategories')
                .expect(401,done);
        });
    });
});
