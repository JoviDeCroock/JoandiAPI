/**
 * Created by jovi on 10/15/2016.
 */
var mongoose = require('mongoose');
//model import
var Cart = mongoose.model('Cart');
var User = mongoose.model('User');
//eerst if checken of user nog niet bestaat
var user = new User();
user.password = "admin"
user.username = "admin@gmail.com"
user.cart = new Cart();
user.save(function(err) {
    if (err) {
        return next(err);
    }
    //return res.json(user);
});
