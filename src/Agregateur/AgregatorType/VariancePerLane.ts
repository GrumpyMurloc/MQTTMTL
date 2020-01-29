import Agregator, {AgregatedData} from "../Agregator"
import AgregatorUtils from "../AgregatorUtils"
import { ParsedData, isDet0} from "../../DataSource/DataSource"

class VariancePerLane extends Agregator {

  constructor(){ 
  	super()
  	this.description = "Variance du volume de véhicule par voie."
  }

	protected work(data: ParsedData[]) : AgregatedData {
		const cleaned = data.filter((element) => {
			return isDet0(element.topic) && element.topic.statistique == "volume"
		})
    let result = {
	    description: this.description,
      result: AgregatorUtils.variance(cleaned, 7),
    };
    return result;
	}

  public clone() : Agregator{
    return new VariancePerLane();
  }
}

export default VariancePerLane

