
const jwt = require("jsonwebtoken");
const authenticate = function (req, res, next) {
  try {
    let token = req.headers["x-auth-token"];
   // if (!token) token = req.headers["x-auth-token"];

    //If no token is present in the request header return error
    if (!token) return res.status(401).res.send({ status: false, msg: "token must be present" });

    console.log(token);

    let decodedToken = jwt.verify(token, "functionup-plutonium");
    if (!decodedToken)
      return res.status(403).res.send({ status: false, msg: "token is invalid" });
    //  let userLoggedIn = decodedToken.userId
    next()
  }
  catch (err) {
    //console.log("this is the error:", err.message)
    res.status(500).send({ msg: "Errwertor", error: err})
  }
}
//check the token in request header
//validate this token

const authorise = function (req, res, next) {
  try {
     // comapre the logged in user's id and the id in request
    let userToBeModified = req.params.userId
    //userId for the logged-in user
    //let token = req.headers["x-auth-token"];
    //let decodedToken = jwt.verify(token, "functionup-plutonium");
    let userLoggedIn = decodedToken.userId
    //  let userToBeModified = req.params.userId
    //userId comparision to check if the logged-in user is requesting for their own data
    if (userToBeModified != userLoggedIn) return res.status(403).res.send({ status: false, msg: 'User logged is not allowed to modify the requested users data' })
    next()
  }
  catch (err) {
    // console.log("this is the error:", err.message)
    res.status(500).send({ msg: "Errror", error: err })
  }
}

module.exports.authenticate = authenticate
module.exports.authorise = authorise