const express = require('express');
const router=express.Router()

let {createCollege,getCollege} = require('../Controllers/CollegeControllers')
let {createIntern} = require('../Controllers/InternControllers')

router.post('/functionup/colleges',createCollege)
router.post('/functionup/interns',createIntern)
router.get('/functionup/collegeDetails',getCollege)
module.exports = router;
