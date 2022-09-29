const urlmodel = require('../model/urlmodel')
const validurl = require('valid-url')
const short=require('shortid')


const baseUrl = 'http:localhost:3000'
const createurl = async function(req,res){
     let { longUrl} =req.body


     if (!validurl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base URL')
    }
    const urlCode = short.generate()
    if (validurl.isUri(longUrl)){
        try{
            let url = await urlmodel.findOne({
                longUrl
            })
            if (url) {
                res.json(url)
            }else {
                const shortUrl = baseUrl + '/' + urlCode
                url = new urlmodel({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                })
                await url.save()
                res.json(url)
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json('Server Error')
    }
} else {
    res.status(401).json('Invalid longUrl')
}
}
const geturl = async function(req,res){
    let urlc = req.params.urlCode

    if(!urlc){
        return res.status(400).send({ status: false , message : "Urlcode must be present !"})
    }

    const checkurl = await urlmodel.findOne({ urlCode:urlc}).select({longUrl:1 })
    if(!checkurl){
        return res.status(403).send({ status:false , message: " Url code is invalid"})
    }
     return res.status(302).send({status:true , data:checkurl})
  

}

module.exports={ createurl ,geturl }