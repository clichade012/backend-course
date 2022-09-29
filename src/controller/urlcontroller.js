const UrlModel = require('../model/urlModel')
const validUrl = require('valid-url')
const shortid = require('shortid')

const isValid = function (value){
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    if (typeof value === 'number' && value.toString().trim().length === 0) return false
    return true;
}
// create a short URL====================================//
const createUrl = async function(req, res) {
    try {
        let data = req.body
        let { longUrl } = data // destructuring

        if (Object.keys(data).length = 0) {
            return res.status(400).send({ status: false, message: "request body is empty, BAD request" })
        }
        if (!isValid(longUrl)) {
            return res.status(400).send({ status: false, message: "longUrl is required in body" })
        }
        if (!validUrl.isUri(longUrl)) {
            return res.status(400).send({ status: false, msg: "longUrl is not a valid url" })
        }

        if (!(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g.test(longUrl))) {
            return res.status(400).send({ status: false, message: "longUrl is not a valid URL" })
        }

        


        let urlCode = shortid.generate()
        let urlAlreadyUsed = await UrlModel.findOne({ longUrl })
        if (urlAlreadyUsed) {
            return res.status(400).send({ status: false, message: "url already used" })
            
        } else {

            let baseUrl = 'http://localhost:3000'
            let shortUrl = baseUrl + '/' + urlCode

            let urlCreated = { urlCode: urlCode, longUrl, shortUrl: shortUrl }
            let newUrl = await UrlModel.create(urlCreated)
            
            return res.status(201).send({ status: true, message: "url created successfully", data: newUrl })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, error: error.message })
    }
}


const geturl = async function(req,res){
    let urlc = req.params.urlCode

    if(!urlc){
        return res.status(400).send({ status: false , message : "Urlcode must be present !"})
    }

    const checkurl = await UrlModel.findOne({ urlCode:urlc}).select({longUrl:1 })
    if(!checkurl){
        return res.status(403).send({ status:false , message: " Url code is invalid"})
    }
     return res.status(302).send({status:true , data:checkurl})
  

}

module.exports= {createUrl,geturl}
