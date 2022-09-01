let axios = require("axios")


let getStates = async function (req, res) {

    try {
        let options = {
            method: 'get',
            url: 'https://cdn-api.co-vin.in/api/v2/admin/location/states'
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


let getDistricts = async function (req, res) {
    try {
        let id = req.params.stateId
        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getDistrictsIDSS = async function (req, res) {
    try {
        let pin = req.query.district_id
        let date = req.query.date
        var options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${pin}&date=${date}}`,
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getByPin = async function (req, res) {
    try {
        let pin = req.query.pincode
        let date = req.query.date
        console.log(`query params are: ${pin} ${date}`)
        var options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getOtp = async function (req, res) {
    try {
        let blahhh = req.body

        console.log(`body is : ${blahhh} `)
        var options = {
            method: "post",
            url: `https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`,
            data: blahhh
        }

        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let currentweather = async function (req, res) {
    try {
        let citys = req.query.q
        let ap = req.query.appid
        console.log(`query params are: ${citys} ${ap}`)
        var options = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${citys}&appid=${ap}`
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let sortedcities = async function (req, res) {
    let city = ["Bengaluru", "Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
    let cityx = []
    for (let i = 0; i < city.length; i++) {
        let cityy = { cities: city[i] }
        var options = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city[i]}&appid=58e24abd21860c0ece98f86957f483f7 `
        }
        let resp = await axios(options)
        console.log(resp.data.main.temp)

        cityy.temp = resp.data.main.temp
        cityx.push(cityy)
    }
    let sorted = cityx.sort(function (a, b) { return a.temp - b.temp })
    console.log(sorted)
    res.status(200).send({ status: true, data: sorted })
}

let getmems = async function( req,res ){
    let memes = req.body.template_id
    let txt = req.body.text0 
    let txtq = req.body.text1 

    var options = {
        method : "post",
        url : `https://api.imgflip.com/caption_image?template_id=${memes}&text0=${txt}&text1=${txtq}&username=chewie12345&password=meme@123`
        //data: memes
    }
    let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
}


module.exports.getStates = getStates
module.exports.getDistricts = getDistricts
module.exports.getByPin = getByPin
module.exports.getOtp = getOtp
module.exports.getDistrictsIDSS = getDistrictsIDSS
module.exports.sortedcities = sortedcities
module.exports.currentweather = currentweather

module.exports.getmems = getmems
