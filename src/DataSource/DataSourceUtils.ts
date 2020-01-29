import {Det0, Det1} from "./DataSource"

class DataSourceUtils {

  public static getTopic(topic: string): Det0 | Det1 {
    if(!topic.includes("heartbeat")){
      // Trim the topic line from the detector type (det0:radar, det1:Thermal)
      const cleaned = topic.replace(
        new RegExp(".+?(?=(det[0-9]))"),
        ""
      ).split("/")
      const det = cleaned[0]
      switch (det) {
        case "det0": return  DataSourceUtils.createDet0(cleaned)
        default:
          return  DataSourceUtils.createDet1(cleaned)
      }
    }
    return null
  }

  public static createDet0(topic: string[]): Det0 { 
    return { lane:topic[2], vehicleType:topic[4], statistique:topic[5] } 
  }
  
  public static createDet1(topic: string[]): Det1 { 
    let det1: Det1 = { statistique: topic.pop() }
    if(topic.length > 3){
      det1 = {
        ...det1,
        zone: topic[2],
      }
      if(topic[3].includes("class")){
        det1 = {
          ...det1, 
          class:topic[3]
        }
      }

    }
    return det1
  }

}

export default DataSourceUtils
