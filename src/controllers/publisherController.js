const PublicModel= require("../models/publisherModel")

const createpublisher= async function (req, res) {
    
    
    let data = req.body
    let publicdata = await PublicModel.create(data)
    res.send({data: publicdata})
}

module.exports.createpublisher=createpublisher