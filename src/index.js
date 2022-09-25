const express = require('express');
const bodyParser = require('body-parser');
const route =require("./routes/route.js");
const mongoose  = require('mongoose');

const app = express();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://rakib123:rakib1234@cluster0.bwxs7wf.mongodb.net/group68Database", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )


 app.use('/', route);

// app.use(function (req, res) {
//     var err = new Error('Not Found');
//     // err.status = 400;
//     return res.status(400).send({status :flase, msg : "Path not found"})
//     });



app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});


