import Agregator from "./Agregator"
import AverageVehiclePerLane from "./AgregatorType/AverageVehiclePerLane"
import StandardDeviationPerLane from "./AgregatorType/StandardDeviationPerLane"
import VariancePerLane from "./AgregatorType/VariancePerLane"

class AgregatorFactory{

	public static createAgregator(type:string): Agregator {
		switch (type) {
			case "VVPL":
				return new VariancePerLane()
			case "SDVPL":				
				return new StandardDeviationPerLane()
			case "AVPL":				
				return new AverageVehiclePerLane()			
			default:
				return null
		}

	}
}

export default AgregatorFactory