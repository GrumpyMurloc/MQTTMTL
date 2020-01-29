import express from "express"
import bodyParser from "body-parser"
import DAOData from "../DAO/DAOData"
import asyncHandler from "express-async-handler"
import AgregatorFactory from "../Agregateur/AgregatorFactory" 
import AgregatorAdapter from "../ErrorManagement/PassiveRedundancy/AgregatorAdapter"

const app = express()

app.get( "/history/agregator/:type/:from/:to", asyncHandler(async (req, res, next) => {
	const dao = new DAOData()
  const from = new Date(req.params.from)
  const to = new Date(req.params.to)
	var data 
	await dao.selectData(from,to).then((results)=>{
		data = results
	})
	const agregator = new AgregatorAdapter(
    AgregatorFactory.createAgregator(req.params.type),
    2
  )
	await agregator.process(data).then((result)=>{
    res.send(result)
  }).catch((e)=>{
    res.status(500)
    res.send("Error during agregation")
  })
}))

export default app