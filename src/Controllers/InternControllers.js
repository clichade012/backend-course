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
      let collegeName = data.collegeName
      let college= await CollegeModel.findOne({name:collegeName})
      let id = college._id
      data["collegeId"]= id
      
    let createdata = await InternModel.create(data)
    res.status(201).send({status : true , data: createdata})
}
catch(err){
  console.log(err.message)
  res.status(500).send({msg: err.message})
}
  }

module.exports.createIntern=createIntern