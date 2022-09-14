//=====================Importing Module =====================//
const CollegeModel = require('../Model/CollegeModel')
const InternModel = require('../Model/InternModel')

//=====================Checking the input value is Valid or Invalid=====================//

let checkvalid = function (value) {
  if (typeof value == "undefined" || typeof value == "number" || typeof value == null) { return false }
  if (typeof value == "string" && value.trim().length == 0) { return false }
  return true
}
function extraspace(str) {
  return str.indexOf(' ') >= 0
}


//=====================This function is used for Creating College Doucment=====================//
const createCollege = async function (req, res) {
  try {


    let data = req.body
 //=====================Destructring of data object=====================//
     const { name, fullName, logoLink } = data 
//=====================here we check persence of body =====================//

    if (Object.keys(data).length == 0) {   
      return res.status(400).send({ status: false, message: "Body should be not empty" })
    }

   //=====================we give  requirement of mandatory fields =====================//
    if (!(name && fullName && logoLink)) {     
      return res.status(400).send({ status: false, message: "name , fullName and Logolink are required fields !" })
    }

    //=====================Validation of name=====================//
    if(!checkvalid(name)) return res.status(400).send({ status: false, message: "Please Provide valid Input" })
    if (extraspace(name))  return res.status(400).send({ status: false, message: "space are not allowed in name field" })
    if (!(/^[A-Za-z]+$\b/).test(name)) return res.status(400).send({ status: false, msg: "Please Use Correct Characters  name" })

    //=====================Validation of fullName=====================//
    if(!checkvalid(fullName)) return res.status(400).send({ status: false, message: "Please Provide valid Input" })
   if (!(/^[A-Za-z]+$\b/).test(fullName)) return res.status(400).send({ status: false, msg: "Please Use Correct Characters  FullName" })

    //===================== Create college Doucment=====================//
    let createdata = await CollegeModel.create(data)
    res.status(201).send({ status: true, data: createdata })
  }
  catch (err) {
    console.log(err.message)
    res.status(500).send({ msg: err.message })
  }
}

//=====================TThis function used for Fetching a college document=====================//
const getCollege = async function (req, res) {
  try {
    let data = req.query
    let collegeName = data.collegeName

    //===================== Checking length of query=====================//
    if (Object.keys(data).length == 0) {
      return res.status(400).send({ status: false, message: "Need Some Parameter to get College" })
    }

    //===================== Fetching collegeName from DB =====================//
    let college = await CollegeModel.findOne({ name: collegeName , isDeleted:false})
    let id = college._id
    if (!college) {
      return res.status(404).send({ status: false, message: "No College Found" })
    }


     //===================== Fetching collegeId from DB =====================//
    let Interns = await InternModel.find({ collegeId: id ,isDeleted:false})
    if (!Interns) {
      return res.status(404).send({ status: false, message: "Interns Not Found" })
    }
    let InternsLength = Interns.length

    res.status(200).send({ status: true, Count: InternsLength, data: college, Interns: Interns })
  }
  catch (err) {
    console.log(err.message)
    res.status(500).send({ msg: err.message })
  }
}



module.exports.createCollege = createCollege
module.exports.getCollege = getCollege