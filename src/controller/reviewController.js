const bookModel = require("../models/booksModel")
// const userModel = require("../models/userModel")
const reviewModel = require("../models/ReviewModel")
const { isvalidObjectId, isValidRating, isValidName, isValidDate, isValid, isValidBody } = require("../validator/validator")



const createReview = async function (req, res) {
    try {
        let bookId = req.params.bookId
        if (!isvalidObjectId(bookId))
            return res
                .status(400)
                .send({ status: false, message: "please provide a valid bookId" })

        const checkBookId = await bookModel.findOne({ _id: bookId, isDeleted: false })
        if (!checkBookId)
            return res
                .status(404)
                .send({ status: false, message: "Book Id is not found or already deleted" })


        let data = req.body

        const { rating, review, reviewedAt } = data

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: "Body is Empty,please provide data!" })
        }
        if (!rating)
            return res
                .status(400).send({ status: false, message: "Provide rating field!" })

        if (!review)
            return res.status(400).send({ status: false, message: "Provide review field!" })

        if (!reviewedAt)
            return res
                .status(400).send({ status: false, message: "Provide reviewaAt field!" })


        if (!isValidDate(reviewedAt.trim())) {
            return res.status(400).send({ status: false, message: "please provide valid format date [Ex: format(YYYY-MM-DD)]" })
        }

        if (!isValidName(review.trim()))
            return res.status(400).send({ status: false, message: "Please enter review in Alphabet only!" })



        if (!isValidRating(rating)) {
            return res
                .status(400).send({ status: false, message: "please provide rating from 1 to 5  in number" })

        }


        let saveData = await reviewModel.create(data)
        let updateCount = await bookModel.findByIdAndUpdate({ _id: checkBookId._id }, { $inc: { reviews: 1 } }, { new: true })

        let finalData = {
            _id: checkBookId._id,
            title: checkBookId.title,
            excerpt: checkBookId.excerpt,
            userId: checkBookId.userId,
            category: checkBookId.category,
            subcategory: checkBookId.subcategory,
            isDeleted: checkBookId.isDeleted,
            reviews: checkBookId.reviews,
            releasedAt: checkBookId.releasedAt,
            createdAt: checkBookId.createdAt,
            updatedAt: checkBookId.updatedAt,
            reviewsData: [saveData]
        }


        return res.status(201).send({ status: true, message: "success", data: finalData })


    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const updatereview = async function (req, res) {
    try {
        let bookid = req.params.bookId

        if (!isvalidObjectId(bookid))
            return res
                .status(400)
                .send({ status: false, message: "Please provide a valid bookId" })


        let reviewid = req.params.reviewId

        if (!isvalidObjectId(reviewid))
            return res
                .status(400)
                .send({ status: false, message: "Please provide a valid review Id" })


        let checkBookId = await bookModel.findOne({ _id: bookid, isDeleted: false })
        if (!checkBookId) {
            return res.status(400).send({ status: false, message: "bookid does not exists!" })
        }
        let checkreview = await reviewModel.findOne({ _id: reviewid, isDeleted: false })
        if (!checkreview) {
            return res.status(400).send({ status: false, message: "review id does not exists! " })
        }
        let checkboth = await reviewModel.findOne({ _id: reviewid, bookId: bookid, isDeleted: false })
        if (!checkboth) {
            return res.status(400).send({ status: false, message: "This bookId does not match with reviewid!" })
        }
        let { review, rating, reviewedBy } = req.body

        if (!(review || rating || reviewedBy)) {
            return res.status(400).send({ status: false, message: "Review or rating or reviewedBy field  not present!" })

        }
        if ((review || rating || reviewedBy)) {

            if (!isValidName(review)) {
                return res.status(400).send({ status: false, message: "please enter valid review" })

            }
            if (isValidBody(rating)) {
                return res.status(400).send({ status: false, message: "please provide rating " })
            }
            if (!isValidRating(rating)) {
                return res
                    .status(400).send({ status: false, message: "please provide rating in number [ 1-5 ]" })

            }

            if (!isValidName(reviewedBy)) {
                return res.status(400).send({ status: false, message: "please enter valid reviewedBy" })
            }

        }


        // console.log();
        let updreview = await reviewModel.findOneAndUpdate({ _id: reviewid, isDeleted: false }, { $set: { review: review, rating: rating, reviewedBy: reviewedBy } }, { new: true })
        console.log(updreview);
        if (!updreview) {
            return res.status(400).send({ status: false, message: "review id not found" })
        }

        let finalData = {
            _id: checkBookId._id,
            title: checkBookId.title,
            excerpt: checkBookId.excerpt,
            userId: checkBookId.userId,
            category: checkBookId.category,
            subcategory: checkBookId.subcategory,
            isDeleted: checkBookId.isDeleted,
            reviews: checkBookId.reviews,
            createdAt: checkBookId.createdAt,
            updatedAt: checkBookId.updatedAt,
            reviewsData: [updreview]
        }


        return res.status(200).send({ status: true, message: 'BookLists', data: finalData })


    } catch (error) {
        return res.status(500).send({ status: true, message: error.message })

    }
}


const deleteReview = async function (req, res) {
    try {

        const bookId = req.params.bookId;

        if (!isvalidObjectId(bookId))
            return res.status(400).send({ status: false, message: "Please provide a valid bookId" });

        const reviewId = req.params.reviewId;
        if (!isvalidObjectId(reviewId))

            return res.status(400).send({ status: false, message: "Please provide a valid review Id" });

        let bookIdCheck = await bookModel.findOne({ _id: bookId, isDeleted: false });
        if (!bookIdCheck)

            return res.status(404).send({ status: false, message: "BookId does not exist" });

        let reviewIdCheck = await reviewModel.findOne({ _id: reviewId, isDeleted: false });
        if (!reviewIdCheck)

            return res.status(404).send({ status: false, message: "ReviewId does not exist" })

        let checkboth = await reviewModel.findOne({ _id: reviewId, bookId: bookId, isDeleted: false })
        if (!checkboth) {
            
            return res.status(400).send({ status: false, message: "This bookId does not match with reviewid!" })
        }

        if (reviewIdCheck) {
            let update = await reviewModel.findOneAndUpdate({ _id: reviewIdCheck }, { isDeleted: true }, { new: true })
            let deleteReviewCount = await bookModel.findOneAndUpdate({ _id: update.bookId }, { $inc: { reviews: -1 } }, { new: true })

            return res.status(200).send({ status: true, message: "Success", data: "Review is successfully deleted" })
        }

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }

}

module.exports = { createReview, updatereview, deleteReview }