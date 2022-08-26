const orderModel = require("../models/orderModel")
const UserModel= require("../models/userModel")
const ProductModel = require("../models/productModel")


const createorder =  async function ( req,res){
   let data =  req.body
    let lion = req.body.userId
    let leo = req.body.productId
    let liger = req.headers.isfreeappuser
   data.isFreeAppUser = liger


      let lions = await UserModel.findById(lion)
    if(!lions){
        return res.send({msg : "This userid is invalid"})
    }
   
    let leos = await ProductModel.findById(leo)
    if(!leos){
        return res.send({msg : "This productid is invalid"})
    }

    if( liger == "true" ){ 
        req.body['amount']=0
        let savedData = await orderModel.create(data)
        return res.send({ savedData})
    } 

    if( liger == "false"){
        if( lions['balance'] >= leos['price']){
        // let deducted = lions['Balance']-leos['price']
        const upus= await UserModel.updateOne( {  _id : lions},{ $inc : {balance : -leos['price']}})
        const nptc = await UserModel.updateOne({_id : lions},{ $set: {isFreeAppUser:liger}} )
       let savedData = await orderModel.create(data)
   return res.send( {savedData})
} else if (lions['balance'] <= leos['price']){
  return   res.send({status:false , msg:"error that the user doesn't have enough balance"})
}
}
}




module.exports.createorder=createorder