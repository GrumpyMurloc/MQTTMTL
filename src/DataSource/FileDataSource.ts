import readLine from "readline"
import {once} from "events"
import fs from "fs"
import {DataSource, ParsedData} from "./DataSource"
import DataSourceUtils from "./DataSourceUtils"
import Error from "../ErrorManagement/Error"
import ErrorTreatment from "../ErrorManagement/ErrorTreatment"

class FileDataSource implements DataSource {
  
  file: string
  reader: any
  data: ParsedData[]

  constructor(file: string){
    this.file = file
    this.reader = readLine.createInterface({
      input : fs.createReadStream("./data/"+file)
    })
    this.data = []
  }

  async fetchData(): Promise<void> {
    this.reader.on('line', (line: string) => {
      try{
        const lineArray = line.split(";")
        const topic = DataSourceUtils.getTopic(lineArray[1])
        if(topic != null){
          const currentData = JSON.parse(lineArray[2])
          this.data.push({
            topic: topic,
            data: currentData
          })          
        }
      } catch(e) { this.reportError(e) }
    })
    await once(this.reader, 'close');
  }

  getData(): ParsedData[] {
    return this.data
  }
  
  reportError(exception: any) : void {
    const error = new Error(new Date(), exception.message, this.file, "fileError")
    ErrorTreatment.handleFileError(error)
  }
}

export default FileDataSource;
