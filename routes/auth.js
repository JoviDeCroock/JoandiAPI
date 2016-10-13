/**
 * Created by jovi on 13/10/2016.
 */
// Dependencies express etc
var mongoose = require('mongoose');
var express = require('express');
var passport = require('passport');
var router = express.Router();

var tokenGen = require('../config/tokenGenerator');

//model import
var User = mongoose.model('User');

//Sanity test
router.get('/', function(req,res,next)
{
    return res.json({message: 'API works like a charm'});
});

//testmiddel
router.get('/users',function(req,res,next)
{
   User.find(function(err,users)
   {
      if(err) {return next(err);}
      return res.json(users);
   });
});

//uiteindelijke API methods
router.post('/register', function(req,res,next)
{

});

router.post('/login', function(req,res,next)
{

});


module.exports = router;