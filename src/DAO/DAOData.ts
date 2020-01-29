import { ParsedData, isDet0} from "../DataSource/DataSource"
import util from "util"

const CONFIG = require('../../server/config')
var mysql = require('mysql')

class DAOData {
  
  con:any

  constructor(){
    this.connect()
  }

  public insertData(data :ParsedData){
    this.connect()
    let sql = `
      INSERT INTO ${CONFIG.db_data_tableName} (date, data) 
      VALUES (?,?)
    `
    const params = [data.data.CreateUtc, JSON.stringify(data)]
    this.con.query(sql, params, (error:any, result:any) => {
      if(error) { throw error }
    })
    this.con.end()
  }

  public async selectData(from:Date, to:Date){
    return new Promise(resolve => {
      this.connect()
      var rows
      let sql = `
        SELECT * 
        FROM ${CONFIG.db_data_tableName}
        WHERE date Between DATE(?) and DATE(?)
      `
      const params = [from, to]
      this.con.query(sql, params, (error:any, results:any) => {
        if(error) { throw error }
        rows = []
        for (var result of results) {
          rows.push(JSON.parse(result.data))
        }
        resolve(rows)
      })
    })
  }

  private connect() {
    this.con = mysql.createConnection({
      host : CONFIG.db_host,
      user: CONFIG.db_user,
      password: CONFIG.db_password,
      database: CONFIG.db_name,
      port: CONFIG.db_port
    })
  }
}

export default DAOData