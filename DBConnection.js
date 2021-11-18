const mysql = require('mysql');

function newConnection()
{
    let conn = mysql.createConnection({
        host:'34.134.150.79',
        user: 'root',
        password:'icecream12#',
        database:'MyStoreDB'
    });
    return conn;
}
module.exports = newConnection;