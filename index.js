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
        res.redirect('/doodlePage.html'); 
    }
    res.send(message);
})


/*
app.get('/add-time', (req,res) => {
    let conn = newConnection();
    conn.connect();
    conn.query(`insert into Product values ('${req.query.name}',${req.query.time})`
            ,(err,rows,fields) => {
                res.redirect('/timeAvaliable');        
            } );

    conn.end();
})

app.get('/timeAvaliable', (request, response) => {
    let conn=newConnection();
    conn.connect();
    let productList;
    conn.query(`select * from Product`, (err,rows,fields) => {

        if (err)
            response.send('ERROR: ' +err)
        else
        {
            productList = rows;

            let content ='';
            for (p of productList)
            {
                content += '<div>';
                content += p.name + ":" + p.time 
                content += '</div>'
                content += '\n';
            }

            response.send(content);
        }
    })    

    conn.end();
})
*/
app.listen(80);