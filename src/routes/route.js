const express = require('express');
const loggermodule = require('../logger/logger')
const router = express.Router();
const lodash = require('lodash')

router.get('/test-me', function (req, res) {
    console.log( loggermodule.abc)
    loggermodule.bcd()
    const array = ["Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sept","Oct","Nov","Dec"]
    const subarray = lodash.chunk(array,3)
    console.log(subarray)
    const oddnumber = [1,3,5,7,9,11,13,15,17,19]
    const array1 = lodash.tail(oddnumber,1)
    console.log(array1)
    const a = [1,3,6]
   const b= [5,9,3]
   const c = [1,4,5]
   const d =[23,43,21]
   const e =[21,22,25]
    
    const unionArr = lodash.union([1,3,6], [5,9,3],[1,4,5],[23,43,21],[21,22,25]);
console.log(unionArr);
  
   let films =  [
    ["horror" ,"The Shining"],
    ["drama" , "Titanic"],
    ["thriller", "Shutter Island"],
    [ "fantasy", "Pans Labyrinth" ]
]

                  const object = lodash.fromPairs(films)
                  console.log(object);

    res.send('My second ever chance')
});

//const express = require('express');
//const helpermodule = require('../util/helper')
//const router = express.Router();


// router.get('/test-you', function(req, res){
//     console.log( helpermodule.xyz)
//     console.log(helpermodule.cat)
//     helpermodule.pqrs()
//     res.send('This is the second routes chaitanya')
// })


// const formattermodule = require('../formatter/formatter')
// router.get('/give-me-students-data',function(req, res){
//     console.log(formattermodule.parrot)
//     formattermodule.prince
//     console.log(formattermodule.peacock)
//     console.log(formattermodule.pink)
//     res.send("this a three question of nodejs assigment")
// })
module.exports = router;
// adding this comment for no reason