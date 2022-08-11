const express = require('express');

const myHelper = require('../util/helper')
const underscore = require('underscore');
//const  application  = require('application');

const router = express.Router();

// let players =
//    [
//        {
//            "name": "manish",
//            "dob": "1/1/1995",
//            "gender": "male",
//            "city": "jalandhar",
//            "sports": [
//                "swimming"
//            ]
//        },
//        {
//            "name": "gopal",
//            "dob": "1/09/1995",
//            "gender": "male",
//            "city": "delhi",
//            "sports": [
//                "soccer"
//            ],
//        },
//        {
//            "name": "lokesh",
//            "dob": "1/1/1990",
//            "gender": "male",
//            "city": "mumbai",
//            "sports": [
//                "soccer"
//            ],
//        },
//    ]

//    router.post('/players', function (req, res) {
//    let Student = req.body    
//    let CPlayers = Student.city
//    let iscityRepeated = false

//    for ( let i =0; i<players.length; i++){
//      if(players[i].city == CPlayers){
//         iscityRepeated = true
//         break;
//      }
//    }
//          if (iscityRepeated){
//             res.send({msg: "This player was already added!"})
//          } else {
//             players.push(Student)
//             res.send(players)
//          }

//         })
       
       
 
       // you will be given an array of persons (1.e an array of objects)..each person will have a 
        //(name: String, age: Number, yatingStatus: true/false(Boolean)} take input in query param as votingAge..
        //and for all the people above that age, change votingStatus as true also return an array consisting of only
        // the person that can vote
        
        // WRITE A POST API TO THE ABOVE
        
        // take this as sample for array of persons: 
        let persons = [
        
            {
                nane: "PK",
        
                age: 10, votingStatus: false
            },
        
            {
                nane: "SK",
        
                age: 20,
        
                votingStatus: false
            },
        
            {
                nane: "AA", age: 70,
        
                votingStatus: false
            },
        
            {
                nane: "SC",
        
                age: 5, votingStatus: false
            },
        
            {
                name: "HO",
        
                age: 40,
        
                votingStatus: false
            }
        ]

        router.post('/post-query-4', function (req,res){
            let votingAge= req.query.votingAge
       
              let cutage = persons.filter(Element => Element.age >votingAge)
                

                //  let cutage = persons.filter(function(e){
                //     return e.age > votingAge;
                //     })
                
             cutage.map(Element =>Element.votingStatus= true);
           // console.log(cool)
           res.send( {data :cutage , status : true }) 
    })
         
        
module.exports = router ;
