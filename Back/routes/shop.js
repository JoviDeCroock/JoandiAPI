/**
 * Created by jovi on 10/15/2016.
 */
// Dependencies express etc
var mongoose = require('mongoose');
var express = require('express');
var jwt = require('express-jwt');
var router = express.Router();
var path = require('path');
var config = require('../config/config');

var auth = jwt({secret:config.secret,userProperty:config.userProperty});

// model import
var User = mongoose.model('User');
var Cart = mongoose.model('Cart');
var Product = mongoose.model('Product');
var Categorie = mongoose.model('Categorie');


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

router.get("/getCart/:cart", auth,function(req,res,next)
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
    p.populate('categorie', function(err, product)
    {
        if(err) {return  next(err);}
         res.json(product);
    });
});

router.post("/:user/updateAmount/:product", auth,function(req,res,next)
{
    var p = req.product;
    req.user.populate('cart', function(err, cart)
    {
        if(err){return next(err);}
        Cart.populate(cart.cart,{
            path:'product',
            model:'Product'
        },function(err, carts)
        {
            carts.products.forEach(function(entry)
            {
                if(entry.product._id = p._id)
                {
                    entry.amount = req.body.amount;
                }
            });
            var query = {_id: cart.cart._id};
            Cart.update(query, cart.cart ,{upsert:true}, function(err, doc) {
                if (err) return res.status(500).json({error: err});
                return res.json(cart.cart);
            });
        });
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
                path:'cart.products.product',
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
                        res.json(cat.cart);
                    })
            });
    });
});

router.post("/:user/removeFromCart/:product", function(req,res,next)
{
    var q = Cart.findById(req.user.cart);
    q.exec(function(err, cart)
    {
        if(err){return next(err);}
        if(!cart) {return next(new Error('ongeldige cart'));}
        Cart.populate(cart, {
            path:'products.categories',
            model:'Categorie'
        },function(err, products) {
            Cart.populate(products, {
                path: 'products.product',
                model: 'Product'
            }, function (err, af) {
                af.products.forEach(function (entry) {
                    if(entry.product.image === req.product.image)
                    {
                        var z = af.products.indexOf(entry);
                        af.products.splice(z,1);
                        var query = {_id: cart._id};
                        console.log(af);
                        Cart.update(query, af, {upsert:true}, function(err,doc)
                        {
                            if(err){return console.log(err);}
                            return res.json({message:'succes'});
                        });
                    }
                });
            });
        });
    });
});

router.post("/:user/addToCart/:product",function(req, res, next)
{
    var q = Cart.findById(req.user.cart);
    q.exec(function(err, cart)
    {
        if(err){return next(err);}
        if(!cart) {return next(new Error('ongeldige cart'));}
        Cart.populate(cart, {
            path:'products.categories',
            model:'Categorie'
        },function(err, products) {
            Cart.populate(products, {
                path: 'products.product',
                model: 'Product'
            }, function (err, af) {
                var there = false;
                af.products.forEach(function (entry) {
                    if(entry.product.image === req.product.image)
                    {
                        there = true;
                    }
                    console.log(there);
                });
                if(there)
                {
                    return res.status(400).json({message:"fail"});
                }else{
                    af.products.push({product: req.product, amount: 1});
                    var query = {_id: af._id};
                    Cart.update(query, af, {upsert:true}, function(err,doc) {
                        if (err) {
                            return console.log(err);
                        }
                        return res.json(cart);
                    });
                }
            });
        });

    });
});

router.post("/:user/buy",auth, function(req,res,next)
{
    /*NOT IMPLEMENTED*/
});

module.exports = router;