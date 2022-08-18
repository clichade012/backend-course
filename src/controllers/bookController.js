const { count } = require("console")
const BookModel= require("../models/bookModel")
const AuthorModel= require("../models/authorModel")

const createBook1= async function (req, res) {
    let data= req.body
    let authorId =data.author_id
    if(!authorId){
        res.send({status : false , msg : "author_id is not present"})
    }
     
    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
   }
 
const createcall2 = async function( req,res) {
    let data = req.body
    let savedData = await BookModel.findOneAndUpdate(
        { name : "Two states"},
        { $set : data},
        { new : true}
         )  

         let cdata = await AuthorModel.find({author_id : {$eq : savedData.author_id}}).select({ author_name : "Chetan Bhagat"})
         res.send({ msg : cdata ,savedData})
}


const showrange = async function (req,res){
    let boat = await BookModel.find( { price : { $gte: 50, $lte: 100} } )
    let goat= boat.map( x =>x.author_id)
    console.log(goat)
    let newrange = await AuthorModel.find({author_id:goat}).select({ author_name :1 , _id :0})
    console.log(newrange)
    res.send ({newrange})
}



// const createBook2 = async function ( req,res){
//     let allBooks = await BookModel.find({ authorName : "Chetan Bhagat"}).select({ author_id : 0})
//     res.send({msg : allBooks})
// }
// const getBooksData= async function (req, res) {
//     let allBooks= await BookModel.find( {authorName : "HO" } )
//     console.log(allBooks)
//     if (allBooks.length > 0 )  res.send({msg: allBooks, condition: true})
//     else res.send({msg: "No books found" , condition: false})
// }


// const updateBooks= async function (req, res) {
//     let data = req.body // {sales: "1200"}
//     // let allBooks= await BookModel.updateMany( 
//     //     { author: "SK"} , //condition
//     //     { $set: data } //update in data
//     //  )
//     let allBooks= await BookModel.findOneAndUpdate( 
//         { authorName: "ABC"} , //condition
//         { $set: data }, //update in data
//         { new: true , upsert: true} ,// new: true - will give you back the updated document // Upsert: it finds and updates the document but if the doc is not found(i.e it does not exist) then it creates a new document i.e UPdate Or inSERT  
//      )
     
//      res.send( { msg: allBooks})
// }

// const deleteBooks= async function (req, res) {
//     // let data = req.body 
//     let allBooks= await BookModel.updateMany( 
//         { authorName: "FI"} , //condition
//         { $set: {isDeleted: true} }, //update in data
//         { new: true } ,
//      )
     
//      res.send( { msg: allBooks})
// }




// // CRUD OPERATIONS:
// // CREATE
// // READ
// // UPDATE
// // DELETE



module.exports.Book= createBook1
module.exports.createcall2= createcall2
 module.exports.showrange= showrange
// module.exports.deleteBooks= deleteBooks
