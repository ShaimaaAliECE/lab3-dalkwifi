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
        message = 'Welcome';
    }
    res.send(message);
})



app.listen(80);