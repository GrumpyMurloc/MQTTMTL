import mqtt from "mqtt"
import Agregator from "./Agregateur/Agregator"
import {ParsedData} from "./DataSource/DataSource"
import {AgregatedData} from "./Agregateur/Agregator"
import AgregatorFactory from "./Agregateur/AgregatorFactory"
import AgregatorAdapter from "./ErrorManagement/PassiveRedundancy/AgregatorAdapter"
import Error from "./ErrorManagement/Error"
import ErrorTreatment from "./ErrorManagement/ErrorTreatment"

interface Worker
 {
  topic: string;
  agregator: AgregatorAdapter; 
}

class Publisher {

  workers: Worker[]
  client: any
  username: string
  password: string


  constructor(username: string, password: string){
    this.client = null
    this.username = username
    this.password = password
    this.workers = []
    this.connect()
  }

  connect(): void {
    this.client = mqtt.connect("mqtt://localhost:3000", {username: this.username, password: this.password})
    this.client.on('error', (err: any) => {
      console.log(err)
      this.client.end()
    });
  }

  subscribe(topic: string): string {
    const exist = this.workers.find((worker) => {
      return worker.topic == topic 
    })  
    if(!exist){
      const agregator = AgregatorFactory.createAgregator(topic)
      if(agregator == null) { throw "Invalid agregator"; }
      this.workers.push({
        topic : topic,
        agregator : new AgregatorAdapter(agregator,2)
      })
      this.client.subscribe(topic);
    }
    return topic
  }

  unsubscribe(topic: string): string {
    this.client.unsubscribe(topic)
    this.workers = this.workers.filter(worker => worker.topic != topic)
    return topic
  }

  publish(topic: string, message: string){
    this.client.publish(topic, message)
  }

  sendResult(data: ParsedData[]){
    for (const worker of this.workers) {
      worker.agregator.process(data).then((result)=>{
        this.publish(worker.topic, JSON.stringify(result))
      }).catch(error => {
        ErrorTreatment.handleAgregatorError(
          new Error(new Date(), worker.topic, error, "agregatorError")
        )
        this.unsubscribe(worker.topic)
      })
    }
  }
}
export default Publisher