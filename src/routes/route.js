const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")
const BookController= require("../controllers/bookController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

// router.post("/createUser", UserController.createUser  )

// router.get("/getUsersData", UserController.getUsersData)

router.post("/createBook-1", BookController.createBook  )

router.get("/getBooksData-1", BookController.getBooksData)

router.post("/yearinput-1",BookController.year)

router.post("/getparticularBook",BookController.horse)

router.get("/getINRBook",BookController.kool)

router.get("/getrandombook", BookController.randombk)
module.exports = router;