const express = require('express');
const loggermodule = require('../logger/logger')
const router = express.Router();

router.get('/test-me', function (req, res) {
    console.log( loggermodule.abc)
    loggermodule.bcd()
    res.send('My second ever chance')
});

//const express = require('express');
const helpermodule = require('../util/helper')
//const router = express.Router();


router.get('/test-you', function(req, res){
    console.log( helpermodule.xyz)
    console.log(helpermodule.cat)
    helpermodule.pqrs()
    res.send('This is the second routes chaitanya')
})


const formattermodule = require('../formatter/formatter')
router.get('/give-me-students-data',function(req, res){
    console.log(formattermodule.parrot)
    formattermodule.prince
    console.log(formattermodule.peacock)
    console.log(formattermodule.pink)
    res.send("this a three question of nodejs assigment")
})
module.exports = router;
// adding this comment for no reason