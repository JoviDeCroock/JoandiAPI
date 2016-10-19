/**
 * Created by jovi on 10/15/2016.
 */
// Dependencies express etc
var mongoose = require('mongoose');
var express = require('express');
var passport = require('passport');
var router = express.Router();

var tokenGen = require('../config/tokenGenerator');

// model import
var User = mongoose.model('User');
var Cart = mongoose.model('Cart');
var Product = mongoose.model('Product');
var Categorie = mongoose.model('Categorie');

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
    // product aan de auth zijn cart adden
    // user.cart.push(product)
});