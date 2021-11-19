const mysql = require('mysql');

let conn = mysql.createConnection({
    host:'34.134.150.79',
    user: 'root',
    password:'icecream12#',
    database:'TimeSlote'
});

conn.connect();

conn.query(`Drop Table Guest`,
                (err,rows,fields) => {
                    if (err)
                        console.log(err);
                    else
                        console.log('Table Dropped');
                }
            )

conn.query(`CREATE TABLE Guest
            (
                Name varchar (100),
                One varchar(100),
                Two varchar(100),
                Three varchar(100),
                Four varchar(100),
                Five varchar(100),
                Six varchar(100),
                Seven varchar(100),
                Eight varchar(100),
                Nine varchar(100),
                Ten varchar(100)
            )
            ` 
            , (err,rows,fields) => {
                if (err)
                    console.log(err);
                else
                    console.log('Table Created');
            })
conn.query( `insert into Guest values ("Admin","11","11","11","11","11","11","11","11","11","11")`
            , (err,rows,fields) => {
                if (err)
                    console.log(err);
                else
                    console.log('One row inserted');
            });

conn.query( `select * from Guest `
            , (err,rows,fields) => {
                if (err)
                    console.log(err);
                else
                    console.log('One row inserted');
                for (r of rows)
                    console.log(r);
            });
conn.end();