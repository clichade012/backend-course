const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId


const orderSchema = new mongoose.Schema({
    userId: {
      
        type : ObjectId,
        ref : "Userssss"
    },
	productId:{
        
        type :ObjectId,
        ref : "Productsss"
    },
	amount: Number,
	isFreeAppUser: {
        type: Boolean
      
    }, 
	date: String

})

module.exports = mongoose.model('Orderssss', orderSchema )