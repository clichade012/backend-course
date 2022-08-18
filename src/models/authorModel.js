const mongoose = require('mongoose');

const authorschema = new mongoose.Schema({
        author_id:{
            type :Number,
            require : true
        },
            author_name: String,
            age:Number,
            address:String
        } )


        module.exports = mongoose.model('Author', authorschema)