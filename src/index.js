const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const mongoose=require('mongoose');


const router = require('./routes/route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

 mongoose.connect("mongodb+srv://rakib123:rakib1234@cluster0.bwxs7wf.mongodb.net/group55Database", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )


app.use('/', router);

app.use(function (req, res) {
    return res.status(404).send({status: false, message: 'Path not found'})
})

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});