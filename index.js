"use strict";

const express = require('express');
const handlebars = require("express-handlebars");
const mysql = require('mysql');

const app = express();
const port = 8080;

const sql_path = '127.0.0.1';
const sql_user = 'acme'
const sql_pass = 'acme'
const sql_db = 'userdb'

console.log(`Establishing SQL connection to ${sql_user}@${sql_path} db ${sql_db}`);

var sql_connection = mysql.createConnection({
  host     : sql_path,
  user     : sql_user,
  password : sql_pass,
  database : sql_db
});

sql_connection.connect(function(err) {
  if (err) {
    console.error('SQL error connecting: ' + err.stack);
    throw err;
  }

  console.log('SQL connected as id ' + sql_connection.threadId);
});

process.on('exit', function() {
  sql_connection.end();
});

// Use handlebars for the view engine, for easy templating
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

// Static files
app.use(express.static('public'));

// All other requests go through here
app.get('/', (req, res) => {
  console.log(`Got Request: ${req.method} ${req.originalUrl}`);
  console.log(`  Getting userlist from SQL...`);
  sql_connection.query('SELECT * FROM userdb.users;', (err, userlist, fields) =>{
    if (err) throw err;
    console.log(`  Got userlist from SQL successfully!`);
    res.render('home', {users: userlist});
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://0.0.0.0:${port}`);
})