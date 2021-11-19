const mysql = require('mysql');

let conn = mysql.createConnection({
    host:'34.134.150.79',
    user: 'root',
    password:'icecream12#',
    database:'TimeSlote'
});

conn.connect();

conn.query(`Drop Table Time`,
                (err,rows,fields) => {
                    if (err)
                        console.log(err);
                    else
                        console.log('Table Dropped');
                }
            )

conn.query(`CREATE TABLE Time
            (
                Time1 varchar(100),
                Time2 varchar(100),
                Time3 varchar(100),
                Time4 varchar(100),
                Time5 varchar(100),
                Time6 varchar(100),
                Time7 varchar(100),
                Time8 varchar(100),
                Time9 varchar(100),
                Time10 varchar(100)
            )
            ` 
            , (err,rows,fields) => {
                if (err)
                    console.log(err);
                else
                    console.log('Table Created');
            })
conn.query( `insert into Time values ("10","10","10","10","10","10","10","10","10","10")`
            , (err,rows,fields) => {
                if (err)
                    console.log(err);
                else
                    console.log('One row inserted');
            });

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