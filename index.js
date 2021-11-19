const { response } = require('express');
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
    conn.query(`insert into Time values ('${req.query.time1}','${req.query.time2}','${req.query.time3}','${req.query.time4}','${req.query.time5}','${req.query.time6}','${req.query.time7}','${req.query.time8}','${req.query.time9}','${req.query.time10}')`
            ,(err,rows,fields) => {
                res.redirect('/time');        
            } );

    conn.end();
})

app.get('/time', (request, response) => {
    let conn=newConnection();
    conn.connect();
    let timeAvaliable;
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
                content += "Time Slote 1: "+t.Time1 + ", Time Slote 2: " + t.Time2 + ", Time Slote 3: " + t.Time3+ ", Time Slote 4: " + t.Time4+ ", Time Slote 5: " + t.Time5+ ", Time Slote 6: " + t.Time6+ ", Time Slote 7: " + t.Time7+ ", Time Slote 8: " + t.Time8+
                 ", Time Slote 9: " + t.Time9 + ", Time Slote 10: " + t.Time10
                content += "</div>";
                content += '\n';
            }

            response.send(content);
        }
    })    

    conn.end();
})


app.get('/guestPage', (request, response) => {
    let conn=newConnection();
    conn.connect();
    let timeAvaliable;
    conn.query(`SELECT * FROM Time ORDER BY time1 ASC LIMIT 1`, (err,rows,fields) => {

        if (err)
            response.send('ERROR: ' +err)
        else
        {
            timeAvaliable = rows;

            let content ='';
            for (p of timeAvaliable)
            {
                content += `<p>`+ 'name' +`</p>` + " "
                content += `<p>`+ p.Time1 +`</p>` + " "
                content += `<p>`+ p.Time2 +`</p>` + " "
                content += `<p>`+ p.Time3 +`</p>` + " "
                content += `<p>`+ p.Time4 +`</p>` + " "
                content += `<p>`+ p.Time5 +`</p>` + " "
                content += `<p>`+ p.Time6 +`</p>` + " "
                content += `<p>`+ p.Time7 +`</p>` + " "
                content += `<p>`+ p.Time8 +`</p>` + " "
                content += `<p>`+ p.Time9  +`</p>` + " "
                content += `<p>`+ p.Time10 +`</p>` + " "
            }

            response.send(content);
        }
    })    

    conn.end();
})
    
//add data to the Guest tabel
app.get('/add-guest', (req,res) => {
    let conn = newConnection();
    conn.connect();
    conn.query(`insert into Guest values ('${req.query.guest}','${req.query.time1}','${req.query.t2}','${req.query.t3}','${req.query.t4}','${req.query.t5}','${req.query.t6}','${req.query.t7}','${req.query.t8}','${req.query.t9}','${req.query.t10}')`
            ,(err,rows,fields) => {
                res.redirect('/schedule');        
            } );

    conn.end();
})

//displays the data from the Guest table
app.get('/schedule', (req, res) => {
    let conn=newConnection();
    let guestList;
    conn.connect();
        conn.query(`select * from Guest`,(err,rows,fields) =>{
            guestList = rows;
            let content ='';
            for (g of guestList){
                content += '<div>';
                content += g.Name+':'+g.One+ ','+g.Two + ','+g.Three + ','+g.Four + ','+g.Five + ','+g.Six + ','+g.Seven + ','+g.Eight + ','+g.Nine + ','+g.Ten
                content +='</div>';
                content += '\n'
            }
            res.send(content);
        });
    conn.end();
})

app.listen(80);