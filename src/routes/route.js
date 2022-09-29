const express = require('express')
const router = express.Router()

const { createurl, geturl} = require('../controller/urlcontroller')


router.post('/url/shorten' , createurl)
router.get('/:urlCode' ,geturl)
module.exports = router;