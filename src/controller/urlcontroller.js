const UrlModel = require('../model/urlModel')
const validUrl = require('valid-url')
const shortid = require('shortid')
const redis = require("redis");
const { promisify } = require("util");

const isValid = function (value){
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    if (typeof value === 'number' && value.toString().trim().length === 0) return false
    return true;
}
// create a short URL====================================//

const redisClient = redis.createClient(
    17456,
    "redis-17456.c301.ap-south-1-1.ec2.cloud.redislabs.com",
    { no_ready_check: true }
  );
  redisClient.auth("vZZ1EVOuSk5IAI7ffEGstefqr64pyNiR", function (err) {
    if (err) throw err;
  });
  
  redisClient.on("connect", async function () {
    console.log("Connected to Redis..");
  });


//Connection setup for redis

const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient)


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

        


        let urlCode = shortid.generate().toLowerCase()
        let urlAlreadyUsed = await UrlModel.findOne({ longUrl })
        if (urlAlreadyUsed) {
            return res.status(200).send({ status: true, message: "already present in db", data: urlAlreadyUsed })
            
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

    const checkurl = await UrlModel.findOne({ urlCode:urlc})
      if(!checkurl){
        return res.status(403).send({ status:false , message: " Url code is not found"})
    }
     return res.redirect(checkurl.longUrl)
  

}





module.exports= {createUrl,geturl}
