const ProductModel = require("../models/productModel")


const createProduct = async function ( req,res){
    const data= req.body
    
    const savedData = await ProductModel.create(data)
    res.send({ msg : savedData})
}


module.exports.createProduct=createProduct