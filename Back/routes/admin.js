/**
 * Created by jovi on 10/15/2016.
 */
// Dependencies express etc
var mongoose = require('mongoose');
var express = require('express');
var jwt = require('express-jwt');
var router = express.Router();
var config = require('../config/config');
var fs = require('fs');
var multi = require('connect-multiparty');

var auth = jwt({secret:config.secret,userProperty:config.userProperty});
var mp = multi();

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
router.get('/users',function(req,res,next)
{
    User.find(function(err,users)
    {
        if(err) {return next(err);}
        return res.json(users);
    });
});

router.get('/allCategories', function(req,res,next)
{
    Categorie.find(function(err, categories)
    {
        if(err) {return next(err);}
        return res.json(categories);
    });
});

router.post('/addProduct', mp, function(req,res,next)
{
    if (!req.body.name || !req.body.description || !req.body.price || !req.body.image || !req.body.categorie)
    {
        return res.status(400).json({message:'Vul alle velden in.'});
    }

    var p = new Product();
    p.name = req.body.name;
    p.description = req.body.description;
    p.price = req.body.price;
    p.image = req.body.image;
    fs.readFile(req.files.file.path, function(err,data)
    {
        var fPath = path.join(__dirname, '..', 'public', req.files.file.name);
        console.log(fPath);
        fs.writeFile(fPath, data, function(err)
        {
            return res.status(400).json({message: 'Upload failed'});
        });
    });
    Categorie.find({_id: req.body.categorie.id}, function(err, cat)
    {
        if(err){console.log(err);}
        p.categorie = cat;
    });
    p.save(function(err)
    {
        if(err){console.log(err);}
    });
    return res.json(p);
});

router.post('/addCategorie', function(req,res,next)
{
    if (!req.body.name)
    {
        return res.status(400).json({message:'U heeft geen categorienaam ingevuld.'});
    }

    var c = new Categorie();
    c.name = req.body.name;
    c.save(function(err)
    {
        if(err){console.log(err);}
    });

    return res.json(c);
});

module.exports = router;