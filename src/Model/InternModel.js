const mongoose= require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const internSchema = new mongoose.Schema(
    {
        name :{
            type:String,
            required :"Name is Required",
            trim : true
        },

        email:{
            type:String,
            required :"Email is Required",
            unique :true,
            trim: true,
            lowercase:true,
            match: [/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/, 'Please fill a valid email address']

        },
        mobile:{
            type : String,
            unique : true,
            required :"Mobile No. is Required",
            trim :true
    
        },
        collegeId : {
            type:ObjectId,
            ref :"collegeModel",
            trim: true
        },

        isDeleted:{
            type : Boolean,
            default :false
        }

})


module.exports = mongoose.model("Intern",internSchema)