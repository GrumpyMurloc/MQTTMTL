import { ParsedData } from "../DataSource/DataSource"

class AgregatorUtils {
  
  public static sum(data: ParsedData[]){
    return data.reduce((total,current)=> total + current.data.Value, 0) 
  }

  public static average(data: ParsedData[], count: number): number {
    count = count != 0 ? count : 1
    return this.sum(data) / count
  }

  public static variance(data: ParsedData[], count: number): number {
    count = count != 0 ? count : 1
    const average = this.average(data,count)
    const total = data.reduce((total,current) => {
      return total + Math.pow(current.data.Value - average, 2)
    }, 0)
    return total / count
  }

  public static standardDeviation(data: ParsedData[], count: number): number {
    count = data.length != 0 ? data.length : 1
    const variance = this.variance(data,count)
    return Math.sqrt(variance)
  }

}

export default AgregatorUtils