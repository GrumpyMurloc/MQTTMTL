import mqtt from "mqtt"
import {DataSource, ParsedData} from "./DataSource"
import DataSourceUtils from "./DataSourceUtils"
import DAOData from "../DAO/DAOData"

class MQTTDataSource implements DataSource {

  topic: string
  client: any
  data: ParsedData[]
  result: any
  dao_data: DAOData

  constructor(topic: string){
    this.client = null
    this.topic = topic
    this.data = []
    this.dao_data = new DAOData()
		this.connect()
  }

  connect(): void {
    const onMessage = (topic: any, message: any): void => {
      try{     
        const currentTopic = DataSourceUtils.getTopic(topic)
        this.data.push({
          topic: currentTopic,
          data: JSON.parse(message.toString())
        })
        let currentData = {
          topic: DataSourceUtils.getTopic(topic),
          data: JSON.parse(message.toString())
        }
        this.dao_data.insertData(currentData)
      } catch(e) { console.log(e) }   
    }

    this.client = mqtt.connect("mqtt://mqtt.cgmu.io", {port:1883})
    this.client.subscribe(this.topic, {qos: 0});
    this.client.on('connect', () => { console.log(`mqtt client connected`); });
    this.client.on('message', onMessage)
    this.client.on('close', () => { console.log(`mqtt client disconnected`); });
    this.client.on('error', (err: any) => {
      console.log(err);
      this.client.end();
    });
  }
  
  isTopic(topic: string): boolean {
    return topic == this.topic
  }

  getData(): ParsedData[] {
    return this.data
  }

  disconnect(): void {
    this.client.end()
  }
}

export default MQTTDataSource;
