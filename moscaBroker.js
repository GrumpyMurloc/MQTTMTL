// Source and sample found on https://github.com/mcollina/mosca/wiki/

var mosca = require('mosca')

var settings = {
	interfaces: [
    { type: "mqtt", port: 3000 },
  ]
}
var queue = []

var server = new mosca.Server(settings)
server.on('ready', setup)

var authenticate = function(client, username, password, callback) {
  const publisher = (username === 'publisher' && password.toString() === 'publisher-password')
  const subscriber = (username === 'subscriber' && password.toString() === 'subscriber-password')
  const authorized = publisher || subscriber
  if (authorized) client.user = username
  callback(null, authorized)
}

var authorizePublish = function(client, topic, payload, callback) {
  callback(null, client.user == 'publisher')
}

server.on('published', function (packet, client) {
	if(client && client.user == "publisher"){
		const message = {
			topic: "packet.topic",
			payload: "packet.payload.toString()",
			retain: false
		}
		server.publish(message,null)
	}
})

function setup() {
	server.authenticate = authenticate
  server.authorizePublish = authorizePublish
}

const message = {
	topic: "test",
	payload: "packet.payload.toString()",
	retain: false
}