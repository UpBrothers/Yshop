const mysql = require('mysql');
var dbinfo=require('./db');

var dbconnect = (schema,callback)=>{
    var db = mysql.createConnection({
        host: dbinfo.host,
        user : dbinfo.user,               
        password : dbinfo.password,
        database : schema,
        multipleStatements: true,
        dateStrings : 'date'
    });
    db.connect();

    callback(undefined,{
        db
    })
}

module.exports=dbconnect;