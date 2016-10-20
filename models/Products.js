/**
 * Created by jovi on 13/10/2016.
 */
var mongoose = require('mongoose');

var productSchema = new mongoose.Schema(
    {
        name: String,
        price: Number,
        description: String,
        image: String,
        categories: {type: mongoose.Schema.Types.ObjectId, ref: 'Categorie'}
    }
);

mongoose.model("Product",productSchema);