const mqtt = require('mqtt')

function createClient(id){
  const options =  {
    username:"subscriber",
    password:"subscriber-password",
  }
  const client = mqtt.connect("mqtt://localhost:3000",options)

  client.on('connect', function () {
    console.log("Client "+id+" connected")
  })

  client.subscribe('aggregated')

  client.on('message', function (topic, message) {
    console.log("Client "+id+":"+ message.toString())
  })

  return client 
}

const client = createClient(1) 