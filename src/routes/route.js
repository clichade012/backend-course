const express = require('express');
const router = express.Router();
//const authorController= require("../controllers/authorController")
const bookController= require("../controllers/bookController")


//  router.post("/createAuthor", authorController.createAuthor)

// // router.get("/getAuthorsData", authorController.getAuthorsData)

// router.post("/createBook", bookController.createBook  )

router.put("/createpricechange",bookController.pricechange ) 


//router.post("/createpublisher" ,publisherController.createpublisher)

 //router.get("/getData", bookController.getData)

 //router.get("/getBooksWithAuthorDetails", bookController.getBooksWithAuthorDetails)

 router.put("/createupdate",bookController.Bookpublic)

module.exports = router;