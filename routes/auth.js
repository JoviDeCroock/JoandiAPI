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
var Cart = mongoose.model('Cart');
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
   if(!req.body.password || !req.body.username){
      return res.status(400).json({message:'Vul alle velden in'});
   }
   var user = new User();
   user.password = req.body.password;
   user.username = req.body.username;
   user.cart = new Cart();
   user.save(function(err){
      if(err){return next(err);}
      //return res.json(user);
      return res.json({token: tokenGen(user)});
   });
});

router.post('/login',function(req,res,next){
   if(!req.body.username || !req.body.password){
      return res.status(400).json({message:'Vul alle velden in'});
   }
   passport.authenticate('local',function(err,user,info){
      if(err){return next(err);}
      if(user){
         return res.json({token: tokenGen(user)});
      }
      else{
         return res.status(401).json(info);
      }
   })(req,res,next);
});

module.exports = router;