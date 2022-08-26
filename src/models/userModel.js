const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {
    name: String,
    balance:{
        type : Number,
        default : 100
    } ,
    address :  String,
    age: Number,
   
    gender: {
        type: String,
        enum: ["male", "female", "LGBTQ"] //"falana" will give an error
    },
    age: Number,
    isFreeAppUser:{
        type : Boolean,
        default : false
    }
    
});

module.exports = mongoose.model('Usersss', userSchema) //users



// String, Number
// Boolean, Object/json, array