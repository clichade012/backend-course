//=====================Importing Module =====================//
const CollegeModel = require('../Model/CollegeModel')
const InternModel = require('../Model/InternModel')
const isValid = require('../Validaters/Collgevalidater')



//=====================This function is used for Creating College Doucment=====================//
const createCollege = async function (req, res) {
  try {
    let data = req.body
    if (Object.keys(data).length == 0) {
      return res.status(400).send({ status: false, message: "Body should not be empty" })
    }
    let Name = isValid.isValidName(data.name)
    if (Name) {
      return res.status(400).send({ status: false, message: Name })
    }

    let fullName = isValid.isValidfullName(data.fullName)
    if (fullName) {
      return res.status(400).send({ status: false, message: fullName })
    }

    let LogoLink = isValid.isValidLogoLink(data.logoLink)
    if (LogoLink) {
      return res.status(400).send({ status: false, message: LogoLink })
    }
    let checkName = await CollegeModel.findOne({ name: data.name, isDeleted: false })
    if (checkName) {
      return res.status(404).send({ status: false, message: "collge name already exists." })
    }
    data['name'] = data.name.toLowerCase()
    let createdata = await CollegeModel.create(data)
    return res.status(201).send({ status: true, data: createdata })
  }
  catch (error) {
    return res.status(500).send({ status: false, message: error.message })
  }
}

//=====================TThis function used for Fetching a college document=====================//
const getCollege = async function (req, res) {
  try {
    let data = req.query
    let collegeName = data.collegeName

    //===================== Checking length of query=====================//

    if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "Need Some Parameter to get College" })
    //===================== Fetching collegeName from DB =====================//
    let college = await CollegeModel.findOne({ name: collegeName, isDeleted: false })
    if (college) {
      var id = college._id
    }

    if (college == null) return res.status(404).send({ status: false, message: "No College Found" })

    //===================== Fetching collegeId from DB =====================//
    let Interns = await InternModel.find({ collegeId: id, isDeleted: false }).select({ name: 1, email: 1, mobile: 1, _id: 0 })
    if (Interns.length == 0) {
      Interns = "Interns are not available in this college !"
    }

    let obj = {
      name: college.name,
      fullName: college.fullName,
      logoLink: college.logoLink,
      interns: Interns
    }

    res.status(200).send({ status: true, data: obj })
  }
  catch (err) {
    console.log(err.message)
    res.status(500).send({ msg: err.message })
  }
}



module.exports.createCollege = createCollege
module.exports.getCollege = getCollege
