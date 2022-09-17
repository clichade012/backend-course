//=====================Importing Module =====================//
const CollegeModel = require('../Model/CollegeModel')
const InternModel = require('../Model/InternModel')
const isValid = require('../Validaters/Internsvalidater')


const createIntern = async function (req, res) {
  try {
    let data = req.body
    if (Object.keys(data).length == 0) {
      return res.status(400).send({ status: false, message: "Body should not be empty" })
    }

    let name = isValid.isValidName(data.name)
    if (name) {
      return res.status(400).send({ status: false, message: name })
    }
    let email = isValid.isValidEmail(data.email)
    if (email) {
      return res.status(400).send({ status: false, message: email })
    }

    let mobile = isValid.isValidMobile(data.mobile)
    if (mobile) {
      return res.status(400).send({ status: false, message: mobile })
    }
   
    let collegename = isValid.isValidcollegeName(data.collegeName)
    if (collegename) {
      return res.status(400).send({ status: false, message: collegename })
    }
    let checkemail = await InternModel.findOne({ email: data.email, isDeleted: false })
    if (checkemail) {
      return res.status(400).send({ status: false, message: "email already exists." })
    }
    let checkmobile = await InternModel.findOne({ mobile: data.mobile, isDeleted: false })
    if (checkmobile) {
      return res.status(400).send({ status: false, message: "mobile number already exists." })
    }
    
   
    let createdata = await InternModel.create(data)
    
    return res.status(201).send({ status: true, data: createdata })
  }
  catch (error) {
    return res.status(500).send({ status: false, message: error.message })
  }
}

module.exports.createIntern = createIntern