/**
 * Created by jovi on 10/15/2016.
 */
// Dependencies express etc
var mongoose = require('mongoose');
var express = require('express');
var passport = require('passport');
var router = express.Router();
var config = require('../config/config');

var auth = jwt({secret:config.secret,userProperty:config.userProperty});
var tokenGen = require('../config/tokenGenerator');

// model import
var User = mongoose.model('User');
var Cart = mongoose.model('Cart');
var Product = mongoose.model('Product');
var Categorie = mongoose.model('Categorie');

// Param Product
router.param('product', function(req,res,next,id)
{
   var q = Product.findById(id);
   q.exec(function(err, product)
   {
       if(err){return next(err);}
       if(!product) {return next(new Error('ongeldig product'));}
       req.product = product;
       return next();
   });
});


// API methods
router.get("/AllProducts", function(req, res, next)
{
    Product.find(function(err, products)
    {
        if(err) {return next(err);}
        return res.json(products);
    });
});

router.post("/AddToCart", auth,function(req, res, next)
{
    Cart.find({user: req.payload._id}).products.push(req.product);
});