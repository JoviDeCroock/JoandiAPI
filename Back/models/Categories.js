/**
 * Created by jovi on 13/10/2016.
 */
var mongoose = require('mongoose');

var catSchema = new mongoose.Schema(
    {
        name: String
    });

mongoose.model("Categorie",catSchema);