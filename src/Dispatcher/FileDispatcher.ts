import express from "express"
import bodyParser from "body-parser"
import Quarantine from "../ErrorManagement/Quarantine"
import FileDataSource from "../DataSource/FileDataSource"
import asyncHandler from "express-async-handler"
import AgregatorFactory from "../Agregateur/AgregatorFactory"
import AgregatorAdapter from "../ErrorManagement/PassiveRedundancy/AgregatorAdapter"


const app = express()

app.get( "/read/:file", asyncHandler(async (req, res, next) => {
  const file = req.params.file
  if(!Quarantine.isInQuarantine(file)){
    const fileDataSource = new FileDataSource(file)
    await fileDataSource.fetchData()
    const data = fileDataSource.getData()
    if(data.length == 0){
      res.status(500)
      res.send("File given was invalid or empty")
    } else {
      res.send(data)
    }
  } else {
    res.send({
      error : "Selected file "+file+" is currently unavailable"
    })
  }
}))

app.get( "/read/:file/agregator/:type", asyncHandler(async (req, res, next) => {
  const file = req.params.file
  if(!Quarantine.isInQuarantine(file)){
    const agregator = new AgregatorAdapter(
      AgregatorFactory.createAgregator(req.params.type),
      2
    )
    const fileDataSource = new FileDataSource(file)
    await fileDataSource.fetchData()
    const data = fileDataSource.getData()
    if(data.length == 0){
      res.status(500)
      res.send("File given was invalid or empty")
    } else {
      await agregator.process(data).then((result)=>{
        res.send(result)
      }).catch((e)=>{
        res.status(500)
        res.send("Error during agregation")
      })
    }
  } else {
    res.send({
      error : "Selected file "+file+" is currently unavailable"
    })
  }
}))

export default app