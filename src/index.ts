import express from "express"
import bodyParser from "body-parser"
import FileDispatcher from "./Dispatcher/FileDispatcher"
import MQTTDispatcher from "./Dispatcher/MQTTDispatcher"
import DataDispatcher from "./Dispatcher/DataDispatcher"
import { start } from "repl"

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(FileDispatcher)
app.use(MQTTDispatcher)
app.use(DataDispatcher)
const port = 8080 // default port to listen

app.get( "/", ( req, res ) => {
  res.send("./")
})

// start the Express server
app.listen( port, () => {
  console.log( `server started at http://localhost:${ port }` )
})

