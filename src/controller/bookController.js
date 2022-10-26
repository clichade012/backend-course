const bookModel = require("../models/booksModel")
const userModel = require("../models/userModel")
const reviewModel = require("../models/ReviewModel")
const aws = require('aws-sdk')

const { isValid, isValidISBN, isvalidObjectId, isValidName, isValidDate, isValidMixed } = require("../validator/validator")



    

const createBook = async function (req, res) {
    try {
        let data = req.body;
        const { title, excerpt, ISBN, category, subcategory, releasedAt } = data;


        

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: "Body is Empty,please provide data" })
        }


        //<<----------------------------title---------------------------- >>//
        if (!title){
            return res
                .status(400).send({ status: false, message: "Provide title field!" })
        }
        if (!isValid(title.trim()) || isValidMixed(title.trim()) ) {
            return res
                .status(400)
                .send({ status: false, message: "Please provide Title & alphabet only" })
        }

        let checkTitle = await bookModel.findOne({ title: title })
        if (checkTitle)
            return res
                .status(400)
                .send({ status: false, message: "title is already exit." })
         if (!excerpt){
                    return res
                        .status(400).send({ status: false, message: "Provide excerpt field!" })
                }
    
        if (!isValid(excerpt.trim())) {
            return res
                .status(400)
                .send({ status: false, message: "Please provide excerpt." })

        }
        if (!isValidMixed(excerpt.trim()))
            return res
                .status(400)
                .send({ status: false, message: " Please enter valid excerpt" })
        //<<---------------------------------ISBN-------------------------------->>//
        if (!ISBN){
            return res
                .status(400).send({ status: false, message: "Provide ISBN field!" })
        }

        if (!isValid(ISBN.trim()) || !isValidISBN(ISBN.trim())) {
            return res
                .status(400)
                .send({ status: false, message: "Please provide valid standard ISBN.[Ex:978-0-596-56668-7]" })
        }
        let checkISBN = await bookModel.findOne({ ISBN: ISBN })
        if (checkISBN)
            return res
                .status(400)
                .send({ status: false, message: "ISBN is already exists." })
        //<<---------------------catagory--------------------------------------->>//

        if (!category){
            return res
                .status(400).send({ status: false, message: "Provide category field!" })
        }
        if (!isValid(category.trim()) || (!isValidName(category.trim()))) {
            return res
                .status(400)
                .send({ status: false, message: "Please provide category & alphabet only." })
        }
        //<<---------------------subcatagory------------------------------------>>//

        if (!subcategory){
            return res
                .status(400).send({ status: false, message: "Provide subcategory field!" })
        }
        if (!isValid(subcategory.trim()) || (!isValidName(subcategory.trim()))) {
            return res
                .status(400)
                .send({ status: false, message: "Please provide subcategory & alphabet only." })
        }
        if (!releasedAt){
            return res
                .status(400).send({ status: false, message: "Provide released At field!" })
        }
        if (!isValidDate(releasedAt.trim())) {
            return res.status(400).send({ status: false, message: "please provide valid format date [Ex: format(YYYY-MM-DD)]" })
        }


        let createdata = await bookModel.create(data);
        return res.status(201).send({ status: true, data: createdata });


    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}
//<<----------------------------------------get books -------------------------->>//

const getBook = async function (req, res) {
    try {
        let data = req.query


        if (Object.keys(data).length == 0) {
            let finddata = await bookModel.find({ isDeleted: { $eq: false } }).select({ _id: 1, title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1 }).sort({ title: 1 })
            if (finddata.length == 0) {
                return res.status(404).send({ status: false, message: "No Documents found" })
            }
            return res.status(200).send({ status: true, message: "Book list", data: finddata })
        }

        let { userId, category, subcategory } = req.query
        let filter = { isDeleted: false }

        if (userId) {

            filter.userId = userId

        }
        if (data.hasOwnProperty('userId')) {
            if (!isvalidObjectId(data.userId)) return res.status(400).send({ status: false, msg: "Enter valid user id" })
        }
        if (category) {
            filter.category = category
        }
        if (data.hasOwnProperty('category')) {
            if (!isValidName(data.category)) return res.status(400).send({ status: false, msg: "Enter category" })
        }
        if (subcategory) {
            filter.subcategory = subcategory
        }
        if (data.hasOwnProperty('subcategory')) {
            if (!isValidName(data.subcategory)) return res.status(400).send({ status: false, msg: "Enter subcategory" })
        }

        let getobj = await bookModel.find(filter).select({ _id: 1, title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1 }).sort({ title: 1 })
        if (getobj.length == 0) {
            return res.status(404).send({ status: false, message: "No Documents found" })
        }
        return res.status(200).send({ status: true, message: "Book list", data: getobj })


    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

//<<--------------------------get by param -------------------------------->>//
const Bookbyparams = async function (req, res) {
    try {
        let Bookid = req.params.bookId


        if (!isvalidObjectId(Bookid))
            return res
                .status(400)
                .send({ status: false, message: "Please provide valid bookId." })

        let checkBookid = await bookModel.findOne({ _id: Bookid,isDeleted:false })

        if (!checkBookid) {
            return res.status(404).send({ status: false, message: "No document founded!" })
        }
        let review = await reviewModel.find({ _id: checkBookid })


        let obj = {
            title: checkBookid.title,
            excerpt: checkBookid.excerpt,
            userId: checkBookid.userId,
            ISBN: checkBookid.ISBN,
            category: checkBookid.category,
            subcategory: checkBookid.subcategory,
            reviews: checkBookid.reviews,
            isDeleted: checkBookid.isDeleted,
            reviewData: review
        }
        return res.status(200).send({ status: true, message: "Book list", data: obj })


    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}
//<<-------------------------------------update book------------------------------------------>>//

const updateBook = async function (req, res) {
    try {
        let bookId = req.params.bookId

        let { title, excerpt, releasedAt, ISBN } = req.body


        if (!bookId) {
            return res.status(400).send({ status: false, message: "Please enter bookId." });

        }
        if (!isvalidObjectId(bookId))
            return res
                .status(400)
                .send({ status: false, message: "Please provide valid bookId." })

        let checkBookid = await bookModel.findOne({ _id: bookId })

        if (!checkBookid) 
        return res.status(404).send({ status: false, message: "This BookId is wrong!" })

        // valid bookid
        if (!(title || excerpt || releasedAt || ISBN)) {
            
            return res.status(400).send({ status: false, message: "Mandotory field  not present!" })
        }
        if ((title || excerpt || releasedAt || ISBN)) {
            if (title) {
                if (!isValidName(title)) {
                    return res.status(400).send({ status: false, message: "please enter title in Alphabet" })
                }
                let checkTitle = await bookModel.findOne({ title: title })
                if (checkTitle)
                    return res
                        .status(409)
                        .send({ status: false, message: "title is already exit." })
            }
            if (excerpt) {
                if (!isValidMixed(excerpt)) {
                    return res.status(400).send({ status: false, message: "please enter excerpt" })
                }
                let checkexcerpt = await bookModel.findOne({ excerpt: excerpt })
                if (checkexcerpt)
                    return res
                        .status(409)
                        .send({ status: false, message: "excerpt is already exit." })
            }
            if (ISBN) {
                if (!isValidISBN(ISBN)) {
                    return res.status(400).send({ status: false, message: "Please provide valid standard ISBN.[Ex:978-0-596-56668-7]" })
                }
                let checkISBN = await bookModel.findOne({ ISBN: ISBN })
                if (checkISBN) {
                    return res
                        .status(409)
                        .send({ message: "ISBN is already exists." })
                }
            }
        }
        let updtebook = await bookModel.findOneAndUpdate({ _id: bookId, isDeleted: false }, { $set: { title: title, excerpt: excerpt, releasedAt: releasedAt, ISBN: ISBN } }, { new: true })

        if (!updtebook) {
            return res.status(404).send({ status: false, message: "Book not found!" })
        }
        return res.status(200).send({ status: true, message: 'Success', data: updtebook })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }

}
//<<------------------------------------delete book by params-------------------------------->>//

const deleteBookByParams = async function (req, res) {
    try {
        let id = req.params.bookId;

        const allbooks = await bookModel.findOne({ _id: id, isDeleted: false });
        if (!allbooks) {
            return res.status(404).send({ status: false, message: "This book is not found or  already deleted." });
        }

        allbooks.isDeleted = true;
        allbooks.deletedAt = Date.now()
        const updated = await bookModel.findByIdAndUpdate({ _id: id }, allbooks, { new: true });
        return res.status(200).send({ status: true, message: "Successfully book Deleted" });

    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};



module.exports = { createBook, getBook, Bookbyparams, updateBook, deleteBookByParams }
