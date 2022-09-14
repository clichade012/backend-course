const CollegeModel = require('../Model/CollegeModel')
const InternModel = require('../Model/InternModel')

let checkvalid = function (value) {
  if (typeof value == "undefined" || typeof value == "number" || typeof value == null) { return false }
  if (typeof value == "string" && value.trim().length == 0) { return false }
  return true
}
function extraspace(str) {
  return str.indexOf(' ') >= 0
}

const createCollege = async function (req, res) {
  try {
    let data = req.body
    if (Object.keys(data).length == 0) {   // here we check body is empty or not
      return res.status(400).send({ status: false, message: "Body should be not empty" })
    }
    const { name, fullName, logoLink } = data  //Destructring of data object
    if (!(name && fullName && logoLink)) {     // here we give  requirement of mandatory fields
      return res.status(400).send({ status: false, message: "name , fullName and Logolink are required fields !" })
    }
    if (extraspace(name)) {   // here we are removing extra inside string space
      return res.status(400).send({ status: false, message: "space are not allowed in name field" })
    }
    let createdata = await CollegeModel.create(data)
    res.status(201).send({ status: true, data: createdata })
  }
  catch (err) {
    console.log(err.message)
    res.status(500).send({ msg: err.message })
  }
}


const getCollege = async function (req, res) {
  try {
    let data = req.query
    let collegeName = data.collegeName
    if (Object.keys(data).length == 0) {
      return res.status(400).send({ status: false, message: "Need Some Parameter to get College" })
    }
    let college = await CollegeModel.findOne({ name: collegeName , isDeleted:false})
    let id = college._id
    if (!college) {
      return res.status(404).send({ status: false, message: "No College Found" })
    }
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
