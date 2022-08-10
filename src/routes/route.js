const express = require('express');

const myHelper = require('../util/helper')
const underscore = require('underscore');
//const  application  = require('application');

const router = express.Router();

let players =
   [
       {
           "name": "manish",
           "dob": "1/1/1995",
           "gender": "male",
           "city": "jalandhar",
           "sports": [
               "swimming"
           ]
       },
       {
           "name": "gopal",
           "dob": "1/09/1995",
           "gender": "male",
           "city": "delhi",
           "sports": [
               "soccer"
           ],
       },
       {
           "name": "lokesh",
           "dob": "1/1/1990",
           "gender": "male",
           "city": "mumbai",
           "sports": [
               "soccer"
           ],
       },
   ]

   router.post('/players', function (req, res) {
          //let players=[]
          let Players = req.body.Players
          players.push(Players)
       
       res.send(  { data: players , status: true }  )
   })


module.exports = router;
