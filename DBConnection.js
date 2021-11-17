const mysql = require('mysql');

function newConnection()
{
    let conn = mysql.createConnection({
        host:'34.133.120.25',
        user: 'root',
        password: 'Icecream12#',
        database: 'usersDB'
    });
    return conn;
}
module.exports = newConnection;