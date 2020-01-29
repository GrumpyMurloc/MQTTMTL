//lien pour installer MySQL : http://dev.mysql.com/downloads/installer/
//https://www.w3schools.com/nodejs_mysql.asp


const CONFIG = require('../config');
var mysql = require('mysql');
var app = express();

var connection = mysql.createCon6nection({
    host : CONFIG.db_host,
    user: CONFIG.db_host,
    password: CONFIG.db_password,
    database: CONFIG.db_port,
});

connection.connect(function(error){
    //callback
    if(error){
        console.log('Error');
    } else {
        console.log('Connected');
    }
});

app.get('/',function(req, resp){
    // about mysql
    connection.query("SELECT * FROM sampleDB"), function(error, rows, fields){
        if(error){
            console.log('Error in the query');
        } else {
            console.log('Successful query')
        }

    }
})
