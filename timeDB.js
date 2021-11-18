const mysql = require('mysql');

let conn = mysql.createConnection({
    host:'34.134.150.79',
    user: 'root',
    password:'icecream12#',
    database:'MyStoreDB'
});

conn.connect();

conn.query(`CREATE TABLE Time
            (
                Time1 varchar(10),
                Time2 varchar(10),
                Time3 varchar(10),
                Time4 varchar(10),
                Time5 varchar(10),
                Time6 varchar(10),
                Time7 varchar(10),
                Time8 varchar(10),
                Time9 varchar(10),
                Time10 varchar(10),
            )
            ` 
            , (err,rows,fields) => {
                if (err)
                    console.log(err);
                else
                    console.log('Table Created');
            })

conn.query( `select * from Time `
            , (err,rows,fields) => {
                if (err)
                    console.log(err);
                else
                    console.log('One row inserted');
                for (r of rows)
                    console.log(r);
            });
conn.end();