const UserModel= require("../models/userModel")

const createUser= async function (req, res) {
    let data= req.body
    let savedData= await UserModel.create(data)
    res.send({msg: savedData})
}

const getUsersData= async function (req, res) {
    let allUsers= await UserModel.find()
    res.send({msg: allUsers})
}

const CreateUser = async function(req,res){
    let data =req.body
    let savedData = await UserModel.create(data)
    res.send({msg:savedData})
}

const getUsersdata = async function ( req,res){
    let allUsers = await UserModel.find()
    res.send({msg:allUsers})
}
module.exports.createUser= createUser
module.exports.getUsersData= getUsersData
module.exports.cool = CreateUser
module.exports.kool = getUsersdata