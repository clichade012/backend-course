const { count } = require("console")
const AuthorModel= require("../models/authorModel")
const BookModel= require("../models/bookModel")

const createAuthor= async function (req, res) {
    let data= req.body
     let savedData= await AuthorModel.create(data)
    res.send({msg: savedData})
}

// const createBook2 = async function ( req,res){
//     let allBooks = await AuthorModel.find({ author_name : "Chetan Bhagat"}).select({ author_id :1 , id :0})
//     res.send({msg : allBooks})
// }


const getAuthorId= async function (req, res) {
    let xdata= await AuthorModel.find({author_name:"Chetan Bhagat"}).select( { author_id: 1, _id: 0})
    let ndata= await BookModel.find({author_id:{$eq : xdata[0].author_id}})
    res.send({msg:ndata})
}
//module.exports.createAuthor= createAuthor
module.exports.getAuthorId=getAuthorId

 
// const createtAuthor = async function (req,res){
//     let data = req.body
//     let savedData = await AuthorModel.findOne(data)
//     if(!author_id) res.send({msg : !savedData})
// }
module.exports.author=createAuthor
//module.exports.createBook2=createBook2
//module.exports.tauthor = createtAuthor