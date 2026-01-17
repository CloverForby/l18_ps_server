const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
    host:'1otfwx.h.filess.io', //Guys PLs change this to your MySQL host
    user:'problemstatement_l18_steelgate', //Guys PLs change this to your MySQL username
    password: '2e1761ea94314cadd2425595b65925896e18ba9f', //Guys PLs change this to your MySQL password
    port: 3307,
    database:'problemstatement_l18_steelgate'
})

app.get('/diplomas', (req, res)=>{
  const sql = "SELECT * FROM Diploma"
  connection.query(sql, (err,data)=> {
    if (err){
      console.error("Error getting Diplomas")
    } else {
      return data
    }
  })
})
app.listen(3307, () => {
  console.log('Server running on port 3307');
});