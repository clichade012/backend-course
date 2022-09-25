const userModel = require('../models/userModel')
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken")
const { isValid, isValidEmail, isValidPhone, isValidName, isvalidTitle, isValidPassword, isValidMixed, isValidPinCode } = require("../validator/validator");



//<<----------------------------------------create a new user-------------------------------->>//
const createuser = async function (req, res) {
    try{
    let data = req.body
    let { title, name, phone, email, password } = data

    if (Object.keys(data).length == 0) {
        return res.status(400).send({ status: false, message: 'Body is Empty' })
    }
    if (!title) {
        return res
            .status(400)
            .send({ status: false, message: 'Please enter title  !' })
    }

    if (!name) {
        return res
            .status(400)
            .send({ status: false, message: 'Please enter name  !' })
    }

    if (!phone) {
        return res
            .status(400)
            .send({ status: false, message: 'Please enter  phone  !' })
    }

    if (!email) {
        return res
            .status(400)
            .send({ status: false, message: 'Please enter email  !' })
    }

    if (!password) {
        return res
            .status(400)
            .send({ status: false, message: 'Please enter password !' })
    }

    if (!isValid(title.trim()) || !isvalidTitle(title.trim())) {
        return res
            .status(400)
            .send({ status: false, message: "Please Use Valid Title.[Ex:Mr, Mrs, Miss]" })
    }

    if (!isValid(name.trim()) || !isValidName(name.trim())) {
        return res
            .status(400)
            .send({ status: false, message: "name is required or its should contain aplhabets" })
    };

    if (!isValid(phone.trim()) || !isValidPhone(phone.trim())) {
        return res
            .status(400)
            .send({ status: false, message: "Invalid Mobile Number" })
    }
    let checkDuplicatePhone = await userModel.findOne({ phone: phone })
    if (checkDuplicatePhone) {
        return res
            .status(409)
            .send({ status: false, message: "This phone already exists,please provide another phone number." })
    }

    if (!isValid(email.toLowerCase().trim()) || !isValidEmail(email.toLowerCase().trim())) {
        return res
            .status(400)
            .send({ status: false, message: "please provide a valid emailId." });
    }
    let checkDuplicateEmail = await userModel.findOne({ email: email })
    if (checkDuplicateEmail) {
        return res
            .status(409)
            .send({ status: false, message: "This email already exists,please provide another emailId." })
    }



    if (!isValid(password.trim()) || !isValidPassword(password.trim())) {
        return res
            .status(400)
            .send({ status: false, message: "Invalid Password, It should be length(8-15) character [Ex - Abc@123]" })
    }

    if (data.address) {
        if (data.address.street) {
            if ((!isValid(data.address.street.trim()) || !isValidName(data.address.street.trim())))
                return res
                    .status(400)
                    .send({ status: false, message: "please enter street in Alphabet" })
        }
        if (data.address.city) {
            if ((!isValid(data.address.city.trim()) || !isValidName(data.address.city.trim())))
                return res
                    .status(400)
                    .send({ status: false, message: "please enter city in Alphabet" })
        }
        if (data.address.pincode) {
            if ((!isValid(data.address.pincode.trim()) || !isValidPinCode(data.address.pincode.trim())))
                return res
                    .status(400)
                    .send({ status: false, message: "Invalid pincode" })
        }
    }
    const createdata = await userModel.create(data)
    res.status(201).send({ status: true, message: 'Success', data: createdata })

}catch(err) {  return res.status(500).send({ status: false, message: err.message }) }
}


//<<----------------------------------------Login User----------------------------->>//

const userLogin = async function (req, res) {
    try {

        let data = req.body
        let { email, password } = data
        email = email.toLowerCase()

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: 'Body is Empty' })
        }
        if (!email.trim())
            return res.status(400).send({ status: false, message: "EmailId is mandatory" })
        if (!password.trim())
            return res.status(400).send({ status: false, message: "Password is mandatory" })
        let user = await userModel.findOne({ email: email, password: password });
        if (!user)
            return res.status(401).send({ status: false, message: "Your Credential is not valid." })
        let token = jwt.sign(
            {
                userId: user._id.toString(),
                batch: "Plutonium",
                organisation: "FunctionUp-bookmanagement"
            },
            "FunctionUp-bookmanagement-library", { expiresIn: '1d' }
        );
        let Token = {
            token: token,
            userId: user._id.toString(),
            exp: '1d',
            iat: Date.now(),

        }
        return res.status(201).send({ status: true, message: 'Success', data: Token })
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { createuser, userLogin }