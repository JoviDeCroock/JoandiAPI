/**
 * Created by jovi on 10/15/2016.
 */
// Dependencies express etc
var mongoose = require('mongoose');
var express = require('express');
var jwt = require('express-jwt');
var router = express.Router();
var config = require('../config/config');

// model import
var User = mongoose.model('User');
var Cart = mongoose.model('Cart');
var Product = mongoose.model('Product');
var Categorie = mongoose.model('Categorie');

var auth = jwt({secret:config.secret,userProperty:config.userProperty});

// Params
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

router.param('user', function(req,res,next,id)
{
    var q = User.findById(id);
    q.exec(function(err, user)
    {
        if(err){return next(err);}
        if(!user) {return next(new Error('ongeldige user'));}
        req.user = user;
        return next();
    });
});

router.param('cart', function(req,res,next,id)
{
    var q = Cart.findById(id);
    q.exec(function(err, cart)
    {
        if(err){return next(err);}
        if(!cart) {return next(new Error('ongeldige winkelkar'));}
        req.cart = cart;
        return next();
    });
});

// API methods
router.get("/getAllProducts", function(req, res, next)
{
    Product.find()
        .populate('categories')
        .exec(function(err, products)
        {
            if(err) {return next(err);}
            return res.json(products);
        });
});

router.get("/getCart/:cart",function(req,res,next)
{
   var c = req.cart;
    c.populate('products', function(err, cart)
    {
        if(err) {return  next(err);}
        Cart.populate(cart, {
            path:'products.categories',
            model:'Categorie'
        },function(err, products)
        {
            if(err){return next(err);}
            res.json(products);
        });
    });
});

router.get("/getProduct/:product",function(req,res,next)
{
    var p = req.product;
    p.populate('categories', function(err, product)
    {
        if(err) {return  next(err);}
         res.json(product);
    });
});

router.get("/getUser/:user", function(req,res,next)
{
    var u = req.user;
    u.populate('cart', function(err, cart)
    {
        if(err) {return  next(err);}
        User.populate(cart,
            {
                path:'cart.products',
                model:'Product'
            },function(err, products)
            {
                if(err) {return  next(err);}
                User.populate(products,
                    {
                        path:'cart.products.categories',
                        model:'Categorie'
                    },function(err,cat)
                    {
                        if(err) {return  next(err);}
                        res.json(cat);
                    })
            });
    });
});

router.post("/:user/addToCart/:product",function(req, res, next)
{
    var p = req.product;
    var q = Cart.findById(req.user.cart);
    q.exec(function(err, cart)
    {
        if(err){return next(err);}
        if(!cart) {return next(new Error('ongeldige cart'));}
        cart.products.push(p);
        cart.populate('products', function(err,cart)
        {
            cart.save(function(err){
                if(err){return next(err);};
            });
            if(err) {return  next(err);}
            Cart.populate(cart, {
                path:'products.categories',
                model:'Categorie'
            },function(err, products)
            {
                if(err){return next(err);}
                res.json(products);
            });
        });
    });
});

module.exports = router;