const express = require('express');

const newConnection = require('./DBConnection');

const app = express();

app.use(express.static('static'))

app.use(express.urlencoded({
    extended : true
}))

app.post('/login', (req,res) => {

    let userName = req.body.usr;
    let password = req.body.pwd;
    let message = 'Access Denied';
    
    if(userName == 'admin' && password == '123'){
        res.redirect('/timeSheet.html'); 
    }
    res.send(message);
})



app.get('/add-time', (req,res) => {
    let conn = newConnection();
    conn.connect();
    conn.query(`insert into Time values ('${req.query.time1}','${req.query.time2}','${req.query.time3}','${req.query.time4}',
    '${req.query.time5}','${req.query.time6}','${req.query.time7}','${req.query.time8}','${req.query.time9}','${req.query.time10}')`
            ,(err,rows,fields) => {
                res.redirect('/time');        
            } );

    conn.end();
})

app.get('/time', (request, response) => {
    let conn=newConnection();
    conn.connect();
    let productList;
    conn.query(`select * from Time`, (err,rows,fields) => {

        if (err)
            response.send('ERROR: ' +err)
        else
        {
            timeAvaliable = rows;

            let content ='';
            for (t of timeAvaliable)
            {
                content += '<div>';
                content += t.time1 + " " + t.time2 + " " + t.time3+ " " + t.time4+ " " + t.time5+ " " + t.time6+ " " + t.time7+ " " + t.time8+
                 " " + t.time9 + " " + t.time10
                content += '</div>'
                content += '\n';
            }

            response.send(content);
        }
    })    

    conn.end();
})


app.listen(80);