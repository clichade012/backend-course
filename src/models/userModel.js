const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    title: {
        type: String,
        enum: ["Mr", "Mrs", "Miss"],
        trim: true,
        require: true,
    },
    name: {
        type: String,
        require: true,
        trim: true 
       },
    phone: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    email: {
        type: String ,
        require: true,
        unique: true,
        trim: true,
        lowercase: true
        
    },
    password: {
        type: String,
        require: true,
        trim: true,
        minLen: 8,
        maxLen: 15
    },
    address: {
        street: {
            type: String,
            trim: true
        },
        city: {
            type: String,
            trim: true
        },
        pincode: {
            type: String,
            trim: true,
            //match :[/^[1-9]{6}$/, 'Please enter valid pincode .']
        }
    },

}, { timestamps: true });
module.exports = mongoose.model('userList', userSchema)