const express = require('express')
const router = express.Router()
const UrlController = require('../controller/urlController')

router.post('/url/shorten', UrlController.createUrl)

const { createurl, geturl} = require('../controller/urlcontroller')


router.post('/url/shorten' , createurl)
router.get('/:urlCode' ,geturl)
module.exports = router;