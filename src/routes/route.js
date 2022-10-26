const bookController= require("../controller/bookController");
 const reviewController= require("../controller/reviewController")
 const userController=  require("../controller/userController")
 const middleware= require("../middleware/auth")
const express = require('express');
const aws = require('aws-sdk');
const router = express.Router();

aws.config.update({
    accessKeyId: "AKIAY3L35MCRZNIRGT6N",
    secretAccessKey: "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",
    region: "ap-south-1"
})

let uploadFile= async ( file) =>{
   return new Promise( function(resolve, reject) {
    // this function will upload file to aws and return the link
    let s3= new aws.S3({apiVersion: '2006-03-01'}); // we will be using the s3 service of aws

    var uploadParams= {
        ACL: "public-read",   // access comtrol list
        Bucket: "classroom-training-bucket",  //HERE
        Key: "abc/" + file.originalname, //HERE 
        Body: file.buffer
    }


    s3.upload( uploadParams, function (err, data ){
        if(err) {
            return reject({"error": err})
        }l
        console.log(data)
        console.log("file uploaded succesfully")
        return resolve(data.Location)
    })

    // let data= await s3.upload( uploadParams)
    // if( data) return data.Location
    // else return "there is an error"

   })
}

router.post("/write-file-aws", async function(req, res){

    try{
        let files= req.files
        console.log(req.body)
        console.log(files)
        if(files && files.length>0){
            //upload to s3 and get the uploaded link
            // res.send the link back to frontend/postman
            let uploadedFileURL= await uploadFile( files[0] )
            res.status(201).send({msg: "file uploaded succesfully", data: uploadedFileURL})
        }
        else{
            res.status(400).send({ msg: "No file found" })
        }
        
    }
    catch(err){
        res.status(500).send({msg: err})
    }
    
})



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