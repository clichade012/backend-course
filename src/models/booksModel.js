const mongoose = require('mongoose');
const moment = require('moment');
const objectId = mongoose.Schema.Types.ObjectId;
let bookSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        unique: true,
        trim: true

    },
    excerpt: {
        type: String,
        require: true,
        trim: true
    },
    userId: {
        type: objectId,
        ref: 'userList',
        require: true,
        trim: true
    },
    ISBN: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    category: {
        type: String,
        require: true,
        trim: true
    },
    subcategory: {
        type: String,
        require: true,
        trim: true
    },
    reviews: {
        type: Number,
        default: 0,
        trim: true

    },
    deletedAt: {
        type: Date,
        trim: true,
        default: null     // when the document is deleted
    },
    isDeleted: {
        type: Boolean,
        default: false,
        trim: true
    },
    releasedAt: {
        type: Date,    //moment(new Date("YYYY-MM-DD"))//format("YYYY-MM-DD"),
        required: true,
        trim: true
    },
    BookCover:{
        type: String,
        require: true
    }

}, { timestamps: true });


module.exports = mongoose.model('bookList', bookSchema)
