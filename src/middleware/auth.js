const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const booksModel = require("../models/booksModel")
const userModel = require("../models/userModel")
const { isValid } = require("../validator/validator")

//<<--------------------------------------authentication---------------------------->>//

const authentication = function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];

    if (!token) {
      res.status(401).send({ status: false, message: "Token not found" });
    }

    jwt.verify(token, "FunctionUp-bookmanagement-library", function (error, decodedToken) {
      if (error) {
        return res.status(401).send({ status: false, message: "Token is not valid" })
      } else {
        req.token = decodedToken

        next()

      }
    })

  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};


//<<-------------------------------------------authorization----------------------------->>//

const authorise = async function (req, res, next) {
  try {
    let token = req.headers["x-api-key"]
    let decodeToken = jwt.verify(token, "FunctionUp-bookmanagement-library")
    let userLoggedIn = decodeToken.userId

    let bookId = req.params.bookId
    if (!mongoose.Types.ObjectId.isValid(bookId))
      return res.status(400).send({ status: false, message: "bookId is Invalid.. Please Enter Correct Id" });

    let findBook = await booksModel.findById(bookId);
    if (!findBook)
      return res.status(404).send({ status: false, message: "No Such Book Available." })

    if (findBook.userId.toString() !== userLoggedIn)
      return res.status(403).send({ status: false, message: "Unauthorized access denied!" })

    next();


  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
}
// cretate book
const authorisation = async function (req, res, next) {
  try {
    let token = req.headers["x-api-key"]
    let decodeToken = jwt.verify(token, "FunctionUp-bookmanagement-library")
    let userLoggedIn = decodeToken.userId

    let userId = req.body.userId


    if (!isValid(userId))
      return res
        .status(400)
        .send({ status: false, message: "userId must be present!" })


    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.status(400).send({ status: false, message: "userId is Invalid.. Please Enter Correct Id" });

    let finduser = await userModel.findById(userId);
    if (!finduser)
      return res.status(404).send({ status: false, message: "No Such user Available." })
    if (userId.toString() !== userLoggedIn)
      return res.status(403).send({ status: false, message: "Unauthorized access denied!" })
    next()
  }
  catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
}



module.exports = { authentication, authorise, authorisation };

