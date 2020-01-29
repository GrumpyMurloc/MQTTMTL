var mysql = require('mysql');
const CONFIG = require('../config');

var con = mysql.createConnection({
    host : CONFIG.db_host,
    user: CONFIG.db_user,
    password: CONFIG.db_password,
    database: CONFIG.db_name,
    port: CONFIG.db_port
})

con.connect(function(error){
    if(error){
        throw error;
    }
    ///////////////
    ///Création d'une table pour l'historique des données agrégé
    let sql =
    // `USE ${CONFIG.db_name};,`
    `CREATE TABLE IF NOT EXISTS ${CONFIG.db_data_tableName}(`+
    'date VARCHAR(100),'+
    'data VARCHAR(500)'+
    ')';
    
    con.query(sql, function(error, result) {
        if(error) {
            throw error;
        }
        console.log(`table ${CONFIG.db_data_tableName} created`)
    });

    ///////////////
    ///Création d'une table pour l'historique des erreur soulevé
    sql =
    // `USE ${CONFIG.db_name};,`
    `CREATE TABLE IF NOT EXISTS ${CONFIG.db_error_tableName}(`+
    'date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,'+
    'contexte VARCHAR(50),'+
    'element VARCHAR(50),'+
    'erreur_souleve VARCHAR(300)'+
    ')';

    con.query(sql, function(error, result) {
        if(error) {
            throw error;
        }
        console.log(`table ${CONFIG.db_error_tableName} created`)
    });

    con.end();
});