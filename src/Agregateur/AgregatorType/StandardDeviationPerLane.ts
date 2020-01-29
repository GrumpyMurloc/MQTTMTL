import Agregator, {AgregatedData} from "../Agregator"
import AgregatorUtils from "../AgregatorUtils"
import { ParsedData, isDet0} from "../../DataSource/DataSource"

class StandardDeviationPerLane extends Agregator {

	constructor(){ 
  	super()
  	this.description = "Ecart type du volume de véhicule par voie."
  }

	protected work(data: ParsedData[]) : AgregatedData {
		const cleaned = data.filter((element) => {
			return isDet0(element.topic) && element.topic.statistique == "volume"
		})
    let result = {
	    description: this.description,
      result: AgregatorUtils.standardDeviation(cleaned, 7),
    };
    return result;
	}
	
	public clone() : Agregator{
    return new StandardDeviationPerLane();
  }
}

export default StandardDeviationPerLane

