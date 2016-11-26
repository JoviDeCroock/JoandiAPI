/**
 * Created by jovi on 10/15/2016.
 */
var mongoose = require('mongoose');
//model import
var Cart = mongoose.model('Cart');
var User = mongoose.model('User');
var Product = mongoose.model('Product');
var Categorie = mongoose.model('Categorie');

//eerst if checken of user nog niet bestaat
User.find({}, function(err, ad)
{
    if(ad.length === 0)
    {
        //Admin aanmaken
        var user = new User();
        user.password = "admin";
        user.username = "admin@gmail.com";
        var cart = new Cart();
        cart.save(function(err)
        {
            if(err){console.log(err);}
        });
        user.cart = cart;
        user.save(function(err)
        {
            if(err){console.log(err);}
        });
        //Categorieeen aanmaken
        var deco = new Categorie();
        var badartikelen = new Categorie();
        deco.name= "Decoratie";
        badartikelen.name="Badartikelen";
        deco.save();
        badartikelen.save(function(err)
        {
            if(err){console.log(err);}
        });

        //Producten aanmaken
        var zeep = new Product();
        var tafel = new Product();
        var badjas = new Product();
        var kast = new Product();
        zeep.name = "stuk zeep";
        zeep.price = 5;
        zeep.description = "een goed ruikend stuk zeep";
        zeep.categories = badartikelen;
        zeep.image = "zeep.gif";
        zeep.save(function(err)
        {
            if(err){console.log(err);}
        });

        tafel.name = "Eikenhouten tafel";
        tafel.price = 110;
        tafel.description = "mooie tafel gemaakt van eikenhout";
        tafel.categories = deco;
        tafel.image = "tafel.jpg";
        tafel.save(function(err)
        {
            if(err){console.log(err);}
        });

        badjas.name = "Badjas";
        badjas.price = 50;
        badjas.description = "Bruine warme badjas";
        badjas.categories = badartikelen;
        badjas.image = "badjas.jpg";
        badjas.save(function(err)
        {
            if(err){console.log(err);}
        });

        kast.name="Eiken kast";
        kast.price=150;
        kast.description="Een praktische kast";
        kast.categories=deco;
        kast.image="kast.jpg";
        kast.save(function(err)
        {
            if(err){console.log(err);}
        });
    }
});

