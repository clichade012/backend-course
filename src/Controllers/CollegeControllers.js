  const CollegeModel = reqiure('../Models/CollegeModel')


  let checkvalid = function(value){
    if (typeof value == "undefined" || typeof value == "number" || typeof value == null) { return false }
    if (typeof value == "string" && value.trim().length == 0) { return false }
    return true
  }

  const createcolge = async function(req,res){
      let data = req.body
      
      let { name , fullName ,logoLink , isDeleted } = data
    let createdata = await CollegeModel.create(data)
    res.status(201).send({status : true , msg: createdata})
}

module.exports=createcolge