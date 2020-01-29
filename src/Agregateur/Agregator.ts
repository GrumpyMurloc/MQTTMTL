import {ParsedData} from "../DataSource/DataSource"
import BBPromise from "bluebird"

BBPromise.config({
  cancellation: true,
})

interface AgregatedData {
  description : string;
  result      : number;
}

abstract class Agregator {
  description:string; 

  constructor(){ this.description = "" }

  public agregateData(data: ParsedData[]) : BBPromise<AgregatedData> {
    const work = this.work.bind(this) 
    // throw "Error during agregation";
    return new BBPromise((resolve, reject, onCancel) => {
      onCancel(() => {
        return { status : "cancelled" }
      })
      resolve(work(data))
    })
  }

  protected abstract work(data: ParsedData[]) : AgregatedData;

  public abstract clone() : Agregator;
}

export { AgregatedData }
export default Agregator

