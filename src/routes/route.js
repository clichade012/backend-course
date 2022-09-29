const express = require('express')
const router = express.Router()
const {createUrl,geturl} = require('../controller/urlcontroller')


router.post('/url/shorten' , createUrl)
router.get('/:urlCode' , geturl)


//API for wrong route-Of-API
router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        message: "The api you request is not available"
    })
})
module.exports = router;