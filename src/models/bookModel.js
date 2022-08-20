const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema( {
    name:String,
		author:{
            require : true,
            type : ObjectId,
            ref :"Authorx",
           
        },
	price:Number,
		ratings:Number,
		publisher: {
            type: ObjectId,
            ref :"Publicx",
            require : true
        },
    HardCover :{
      type : Boolean,
      default : false
    }

    });


module.exports = mongoose.model('BookX', bookSchema)
