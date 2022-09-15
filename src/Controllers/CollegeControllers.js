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
    // if (!(name && fullName && logoLink)) {     
    //   return res.status(400).send({ status: false, message: "name , fullName and Logolink are required fields !" })
    // }
    const error = {};
    if(!name) error.nameError = "please enter the name";
    if(!fullName) error.fullNameError = "please enter the fullName";
    if(!logoLink) error.logoLinkError = "please enter the logoLink";
    if(Object.keys(error).length > 0) return res.status(400).send({status:false, message:error});

    //=====================Validation of name=====================//
    if(!checkvalid(name)) return res.status(400).send({ status: false, message: "Please Provide valid Input" })
    if (extraspace(name))  return res.status(400).send({ status: false, message: "space are not allowed in name field" })
 
    if (!(/^[A-Za-z]+$\b/).test(name.trim().toLowerCase())) return res.status(400).send({ status: false, msg: "Please Use Correct Characters  name" })
    let DuplicateName = await CollegeModel.findOne({name:name})
    if(DuplicateName) return res.status(409).send({status : false , message: "This name Already exists!"})

    //=====================Validation of fullName=====================//
    if(!checkvalid(fullName)) return res.status(400).send({ status: false, message: "Please Provide valid Input" })
   if (!(/^[a-zA-Z]+([\s][a-zA-Z]+)*$/).test(fullName.trim())) return res.status(400).send({ status: false, msg: "Please Use Correct Characters  FullName" })

    //=====================Validation of Logolink=====================//
    if(!checkvalid(logoLink)) return res.status(400).send({ status: false, message: "Please Provide valid Input for logolink"})


    //===================== Create college Doucment=====================//
    let createdata = await CollegeModel.create(data)
    res.status(201).send({ status: true, data: createdata })
  }
  catch (err) {
    console.log(err.message)
    res.status(500).send({ msg: err.message })
  }
}

//=====================This function used for Fetching a college document=====================//
const getCollege = async function (req, res) {
  try {
    let data = req.query
    let collegeName = data.collegeName

    //===================== Checking length of query=====================//
    if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "Need Some Parameter to get College" })

    if(Object.keys(data).length > 1) return res.status(400).send({status: false, message:"Only one parameter is allowed"})

     if(Object.keys(req.body).length!== 0)return res.status(400).send({status: false, message:"Invalid request"})

   
    
    
     //===================== Fetching collegeId from DB =====================//
     let college = await CollegeModel.findOne({ name: collegeName , isDeleted:false})
    if(college){
      var id = college._id
    }
    
    if (college == null) return res.status(404).send({ status: false, message: "No College Found" })
  
     //===================== Fetching collegeId from DB =====================//
    let Interns = await InternModel.find({ collegeId:id ,isDeleted:false}).select({name:1,email:1,mobile:1,_id:0})
    if(Interns.length == 0){
      Interns = "No one applied for Interns"
    }
  
    let obj={name:college.name , fullName:college.fullName, logoLink:college.logoLink, interns:Interns}



    res.status(200).send({ status: true, data:obj})
  }
  catch (err) {
    console.log(err.message)
    res.status(500).send({ msg: err.message })
  }
}



module.exports.createCollege = createCollege
module.exports.getCollege = getCollege
