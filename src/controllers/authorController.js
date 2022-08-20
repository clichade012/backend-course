const AuthorModel= require("../models/authorModel")

const createAuthor= async function (req, res) {
     let data = req.body
    let dataCreated = await AuthorModel.create(data)
    res.send({msg: dataCreated})
}


// const getAuthorsData= async function (req, res) {
//     let authors = await AuthorModel.find()
//     res.send({data: authors})
// }

module.exports.createAuthor= createAuthor
//module.exports.getAuthorsData= getAuthorsData