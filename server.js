const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 5000;
const connection = mysql.createConnection({
    host:'1otfwx.h.filess.io', //Guys PLs change this to your MySQL host
    user:'problemstatement_l18_steelgate', //Guys PLs change this to your MySQL username
    password: '2e1761ea94314cadd2425595b65925896e18ba9f', //Guys PLs change this to your MySQL password
    port: 3307,
    database:'problemstatement_l18_steelgate'
})

/*app.use(cors({
  origin: "http://localhost:3000"
}));*/

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // allow any origin
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS'); // allowed methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // allowed headers
  next();
});

app.use(cors());
connection.connect(err => {
  if (err) {
    console.error('DB error:', err);
  } else {
    console.log('MySQL connected');
  }
});


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
  connection.release();
})


app.get('/diploma/:id', (req, res)=>{
  const sql = `SELECT Diploma_Module.module, Modules.title FROM Diploma_Module
                INNER JOIN Modules ON Diploma_Module.module = Modules.code
                WHERE Diploma_Module.diploma = ?`

  const diplomaid = req.params.id;
  connection.query(sql, [diplomaid], (err,data)=> {
    if (err){
      console.error(err);
      return res.status(500).json({ error: "Error getting modules" });
    }
    res.json(data);
  })
})


app.get('/module/:id', (req, res)=>{
  const sql = "SELECT * FROM Modules where code = ?"
  const moduleid = req.params.id;
  connection.query(sql, [moduleid], (err,data)=> {
    if (err){
      console.error(err);
      return res.status(500).json({ error: "Error getting Diplomas" });
    }
    res.json(data);
  })
})

app.post('/register', (req, res) => {
        const { name, email, code } = req.body;
        const sql = 'INSERT INTO register (name,email,code) VALUES (?, ?, ?)';
        console.log(req.session);
        connection.query(sql, [name, email, code], (error, results) => {
            if (error) {
                console.error('Error adding note:', error);
                return res.status(500).send('Error adding register');
            }

            res.json(data);
        });
    });


app.listen(port, () => {
  console.log('Server running on port', port);
});



