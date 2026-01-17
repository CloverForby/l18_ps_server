const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;
const connection = mysql.createConnection({
    host:'1otfwx.h.filess.io', //Guys PLs change this to your MySQL host
    user:'problemstatement_l18_steelgate', //Guys PLs change this to your MySQL username
    password: '2e1761ea94314cadd2425595b65925896e18ba9f', //Guys PLs change this to your MySQL password
    port: 3307,
    database:'problemstatement_l18_steelgate'
})

app.use(express.json())



app.get('/diplomas', (req, res)=>{
  const sql = "SELECT * FROM Diploma"
  connection.query(sql, (err,data)=> {
    if (err){
      console.error(err);
      return res.status(500).json({ error: "Error getting Diplomas" });
    }
    res.json(data);
  })
})

app.listen(port, () => {
  console.log('Server running on port', port);
});

