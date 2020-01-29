import { ParsedData, isDet0} from "../DataSource/DataSource"
const CONFIG = require('../../server/config');
var mysql = require('mysql');


var con = mysql.createConnection({
  host : CONFIG.db_host,
  user: CONFIG.db_user,
  password: CONFIG.db_password,
  database: CONFIG.db_name,
  port: CONFIG.db_port
})

export class DAOError {
  constructor(){

  }

  public insertError(contexte: string, element: string, erreur_souleve: string){
    contexte = con.escape(contexte)
    element = con.escape(element)
    erreur_souleve = con.escape(erreur_souleve)
    let sql = "INSERT INTO "+CONFIG.db_error_tableName+" (contexte, element, erreur_souleve) VALUES ("+contexte+", "+element+", "+erreur_souleve+");";

    con.query(sql, function(error:any, result:any) {
      if(error) {
        throw error;
      }
    });

  }

  public selectError(){
    var rows;
    let sql = "SELECT * FROM "+CONFIG.db_error_tableName+";"
    con.query(sql, function(error:any, results:any) {
      if(error) { throw error }
      rows = JSON.parse(JSON.stringify(results[0]));
    });

    return rows;
  }
}

export default DAOError