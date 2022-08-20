
const bookModel= require("../models/bookModel")
const AuthorModel = require("../models/authorModel")
const PublicModel= require("../models/publisherModel")
const { default: mongoose } = require("mongoose")



const createBook= async function (req, res) {
   let lion=req.body
    let liger = lion.author 
    let tiger = lion.publisher

    let bookcreated = await PublicModel.findById(tiger)
    if(!bookcreated){ res.send({status:false, msg : "this id is not not found"})}

    if(!tiger){
        res.send({status:false , msg: "this id has error"})
    }

    if(!liger){
    res.send({status:false , msg: "this id has error"})
}
    let bockcreated = await AuthorModel.findById(liger)
    if(!bockcreated){ res.send({status:false, msg : "this id is not found"})}
   
   
    let bookCreated = await bookModel.create(lion)
     res.send({data: bookCreated})


}

const getBooksWithAuthorDetails = async function (req, res) {
    let specificBook = await bookModel.find().populate('author').populate('publisher')
    res.send({data: specificBook})

}

const Bookpublic = async function(req,res){
  //  const Penguin = "62ffe5470ed1177ee6e8f608"
 //const HarperCollins = "62ffe5bd0ed1177ee6e8f610"
     let privatebook =await bookModel.updateMany( 
        { name : 'Penguin'},{ name :'HarperCollins'},
         { $Set : { HardCover : true}},
         
         )
        
    res.send({msg : privatebook  })
    }
   const pricechange = async function(req,res){
    let publicprice = await bookModel.updateMany({ ratings : {$gt : 3.5}},{ $inc : { price : 10}})
    // let bookprice = await bookModel.findOneAndUpdate(
    //        { price : publicprice},
    //        { $set : {$inc:10}},
    //            { new : true}
    //  )
     //console.log( bookprice)
    res.send({msg:publicprice})
   }



   module.exports.pricechange = pricechange


module.exports.createBook= createBook
module.exports.Bookpublic=Bookpublic


module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails
