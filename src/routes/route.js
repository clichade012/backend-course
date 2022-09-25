 const bookController= require("../controller/bookController");
 const reviewController= require("../controller/reviewController")
 const userController=  require("../controller/userController")
 const middleware= require("../middleware/auth")
const express = require('express');
const router = express.Router();


router.post("/register", userController.createuser)
router.post("/login",userController.userLogin)
router.post("/books", middleware.authentication,middleware.authorisation ,bookController.createBook)
router.get("/books",middleware.authentication,bookController.getBook)
router.get("/books/:bookId",middleware.authentication,bookController.Bookbyparams)
router.put("/books/:bookId",middleware.authentication,middleware.authorise,bookController.updateBook)
router.delete("/books/:bookId",middleware.authentication,middleware.authorise,bookController.deleteBookByParams)
router.post("/books/:bookId/review",reviewController.createReview)
router.put("/books/:bookId/review/:reviewId",reviewController.updatereview )
router.delete('/books/:bookId/review/:reviewId', reviewController.deleteReview)

router.all("/*", function (req, res) {
    res.status(400).send({
        status: false,
        message: "The api you request is not available"
    })
})


module.exports = router;
