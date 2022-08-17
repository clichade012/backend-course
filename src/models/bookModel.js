const mongoose = require('mongoose');



const bookSchema = new mongoose.Schema( {
    bookName: {
        type : String,
        require : true
    }, 
    authorName: String, 
    tags: [String],
    
    stockAvailable : Boolean,
    prices: {
        indianPrice: String,
        europePrice: String,
    },
   // sales: {type: Number, default: 10}
   year : {
    type : Number, default :2021
   },
   pages : Number
}, { timestamps: true });


const Bookschema = mongoose.sche


module.exports = mongoose.model('Book', bookSchema) //users

//Validation:
//require:true
//unique
// default

//String
//Number
//Date
//Boolean
// Arrays
// Object
// ObjectId
// Buffer - not cover
