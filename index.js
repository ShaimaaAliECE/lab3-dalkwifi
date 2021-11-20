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

//add time slot into the Time table
app.get('/add-time', (req,res) => {
    let conn = newConnection();
    conn.connect();
    conn.query(`insert into Time values ('${req.query.time1}','${req.query.time2}','${req.query.time3}','${req.query.time4}','${req.query.time5}','${req.query.time6}','${req.query.time7}','${req.query.time8}','${req.query.time9}','${req.query.time10}')`
            ,(err,rows,fields) => {
                res.redirect('/time');        
            } );

    conn.end();
})

//select all the times form the Time table and displays it 
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
                content += "Time Slote 1: "+t.Time1 +"<br />" +"Time Slote 2: " + t.Time2 +"<br />" + "Time Slote 3: " + t.Time3+ "<br />" +"Time Slote 4: " + t.Time4+ "<br />" +
                "Time Slote 5: " + t.Time5+"<br />" + "Time Slote 6: " + t.Time6+"<br />" + "Time Slote 7: " + t.Time7+"<br />" + "Time Slote 8: " + t.Time8+
                "<br />" +"Time Slote 9: " + t.Time9 + "<br />" +"Time Slote 10: " + t.Time10+ "<br />"+"<br />"
                content += "</div>";
                content += '\n';
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
                res.redirect('/guestTime');        
            } );

    conn.end();
})

//displays the data from the Guest table
app.get('/guestTime', (req, res) => {
    let conn=newConnection();
    let guestList;
    conn.connect();
        conn.query(`select * from Guest`,(err,rows,fields) =>{
            guestList = rows;
            let content ='';
            for (t of guestList){
                content += '<div>';
                content += `<p>`+t.Name+":"+`</p>`;
                content += t.One +", " + t.Two +", " + t.Three+ ", " + t.Four+ ", " +  t.Five+", " + t.Six+ ", " + t.Seven+", " +  t.Eight+", " + 
                 t.Nine + ", " +  t.Ten+ "<br />"+"<br />"
                content += "</div>";
                content += '\n';
            }
            res.send(content);
        });
    conn.end();
})

app.listen(80);