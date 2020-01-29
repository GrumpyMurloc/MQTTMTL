//lien pour installer MySQL : http://dev.mysql.com/downloads/installer/
//https://www.w3schools.com/nodejs_mysql.asp

const CONFIG = require('../config');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host : CONFIG.db_host,
    user: CONFIG.db_user,
    password: CONFIG.db_password,
});


connection.connect(function(error){
    //callback
    if(error){
        throw error; 
    } else {
        console.log('Connected');
        // console.log("test"+connection.state());

        connection.query(`DROP DATABASE IF EXISTS ${CONFIG.db_name}`, function(error, result){
            if(error){
                throw error;
            }
            console.log("Database dropped : ", CONFIG.db_name);
            connection.end();
        });
    }
});
