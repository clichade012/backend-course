const CollegeModel = require('../Model/CollegeModel')
const InternModel = require('../Model/InternModel')


  let checkvalid = function(value){
    if (typeof value == "undefined" || typeof value == "number" || typeof value == null) { return false }
    if (typeof value == "string" && value.trim().length == 0) { return false }
    return true
  }

  const createIntern= async function(req,res){
    try{
      let data = req.body
//=====================Checking the validation=====================//
      let { name, mobile, email } = data 
       
      if(! ( name && mobile && email )){
        return res.status(400).send({ status: false, msg: "name, mobile and email fields are mandatory." })
      }

      //=====================Validation of  name=====================//
      if(!checkvalid(name))return res.status(400).send({ status: false, message: "Please Provide valid Input" })
      if((!(/^[a-zA-Z]+([\s][a-zA-Z]+)*$/).test(name)) ) return res.status(400).send({ status: false, msg: "Please Use Correct Characters in name or Extra space is not allowed"} )

    //=====================Validation of mobile =====================//
    if(!checkvalid(mobile))return res.status(400).send({ status: false, message: "Please Provide valid Input" })
    if((!(/^([+]\d{2})?\d{10}$/).test(mobile))) return res.status(400).send({ status: false, msg: "Please provide valid Mobile Number" }) 
    let DuplicateNumber = await InternModel.findOne({mobile:mobile})
    if(DuplicateNumber) return res.status(409).send({status : false , message: "This Mobile Number Already exists!"})

      //=====================Validation of EmailID=====================//
      if(!checkvalid(email))return res.status(400).send({ status: false, message: "Spaces aren't Allowed." })
      if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/).test(email)) return res.status(400).send({ status: false, msg: "Please provide valid Email" }) 
      let DuplicateEmail = await InternModel.findOne({email:email})
      if(DuplicateEmail) return res.status(409).send({status : false , message: "This EmailId Already exists!"})


      //=====================Finding the name of college by db call=====================//

      let collegeName = data.collegeName
      let college= await CollegeModel.findOne({name:collegeName})
      let id = college._id
      data["collegeId"]= id
       //=====================db call to create document=====================//
    let createdata = await InternModel.create(data)
    res.status(201).send({status : true , data: createdata})
}
catch(err){
  console.log(err.message)
  res.status(500).send({msg: err.message})
}
  }

module.exports.createIntern=createIntern