const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {
    Name: String,
    lastName: String,
    mobilfirste: {
        type: String,

        required: true
    },
    emailId: String,
    password: String,
    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },
    age: Number,
    isDeleted : Boolean,
    posts: {type: [], deafult: []}
}, { timestamps: true });

module.exports = mongoose.model('Userttt', userSchema)
