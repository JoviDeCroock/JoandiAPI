/**
 * Created by jovi on 13/10/2016.
 */
var mongoose = require('mongoose');

var CartSchema = new mongoose.Schema(
{
    products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

mongoose.model('Cart', CartSchema);