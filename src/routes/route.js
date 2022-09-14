const express = require('express');
const router=express.Router()

let {createcolge} = require('../Controllers/CollegeControllers')
let {createinten} = require('../Controllers/IntenControllers')

router.post('/functionup/colleges',createcolge)
router.post('/functionup/interns',createinten)
router.get('/functionup/collegeDetails')
module.exports = router;
