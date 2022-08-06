let printDate=new Date()
let todaydate = (printDate.getMonth()+1)+'-'+printDate.getDate()
const batchName = "Plutonium"


let  getBatchInfo= function() {
  console.log ( batchName, "W3D5 the topic for today is Nodejs module system")
 // console.log(todaydate)
} 


module.exports.xyz= batchName
module.exports.pqrs = getBatchInfo
module.exports.cat =todaydate