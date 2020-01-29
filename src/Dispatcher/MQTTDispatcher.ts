import express from "express"
import Publisher from "../Publisher"
import MQTTDataSource from "../DataSource/MQTTDataSource"

const app = express()

const topic = "worldcongress2017/pilot_resologi/odtf1/ca/qc/mtl/mobil/traf/detector/det0/+/+/+/car/volume"
var dataSource: MQTTDataSource = new MQTTDataSource(topic)
let publisher: Publisher = new Publisher("publisher","publisher-password")

app.get( "/connect/agregator/:type", ( req, res ) => {
  try {
    const agregator = req.params.type
    publisher.subscribe(agregator)
    res.send({
      host: "mqtt://Localhost:3000",
      topic: agregator
    })
  } 
  catch(e) {
    res.status(500)
    res.send({
      message : e
    })
  } 
})

setInterval((publisher:Publisher)=>{
  if(dataSource != null){
    const data = dataSource.getData()
    publisher.sendResult(data)
  }
}, 15000, publisher)

export default app
