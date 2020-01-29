import PassiveAdapter from "./PassiveAdapter"
import Agregator from "../../Agregateur/Agregator"
import {AgregatedData} from "../../Agregateur/Agregator"
import {ParsedData} from "../../DataSource/DataSource"
import Timer from "../Timer"
import BBPromise from "blueBird"

BBPromise.config({
  warnings:true,
  cancellation: true,
})

class AgregatorAdapter extends PassiveAdapter<Agregator, ParsedData[], AgregatedData> {

  public async process(input: ParsedData[]) : Promise<AgregatedData> {
    const changeCurrentComponent = this.changeCurrentComponent.bind(this)
    var result: AgregatedData = undefined 
    while(this.current != null) {
      let agregation = this.current.agregateData(input)
      var timer = new Timer<AgregatedData>(agregation, "agregator")
      try{
        timer.startTimer()    
        await agregation.then((x)=>{ result = x })
        break;
      } catch(e){
        this.changeCurrentComponent()
      } finally {
        timer.stopTimer()
      } 
    }
    if(!result){throw new Error("All existing instance used during PassiveRedundancy")}
    return result
  }

}

export default AgregatorAdapter