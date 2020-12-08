"use strict";

const express = require('express');
const handlebars = require("express-handlebars");
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 8080;

const sql_user = process.env.DB_USER || 'acme';
const sql_pass = process.env.DB_PASS || 'acme';
const sql_db = process.env.DB_NAME || 'testdb';
const dbSocketPath = process.env.DB_SOCKET_PATH || '/cloudsql';

if (process.env.CLOUD_SQL_CONNECTION_NAME) {
  console.log(`Establishing SQL connection to ${dbSocketPath}/${process.env.CLOUD_SQL_CONNECTION_NAME}`);
  var sql_connection_config = {
    socketPath : `${dbSocketPath}/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
    user     : sql_user,
    password : sql_pass,
    database : sql_db
  }
} else {
  const sql_tmp = process.env.DB_HOST || '127.0.0.1:3306';
  const sql_host = sql_tmp.split(':')[0];
  const sql_port = sql_tmp.split(':')[1];

  console.log(`Establishing SQL connection to ${sql_host}:${sql_port}`);
  var sql_connection_config = {
    host     : sql_host,
    port     : sql_port,
    user     : sql_user,
    password : sql_pass,
    database : sql_db
  }
}

// Use handlebars for the view engine, for easy templating
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

// Static files
app.use(express.static('public'));

// All other requests go through here
app.get('/', (req, res) => {
  console.log(`Got Request: ${req.method} ${req.originalUrl}`);
  console.log(`  Getting userlist from SQL...`);
  var sql_connection = mysql.createConnection(sql_connection_config);
  sql_connection.connect(function(err) {
    if (err) {
      const rettxt = `  SQL error connecting: ${err.stack}`;
      console.error(rettxt);
      res.send(rettxt);
      sql_connection.end();
    } else {

      console.log('  SQL connected as id ' + sql_connection.threadId);

      sql_connection.query('SELECT username,user_id,user_creation_date FROM userdb.users;', (err, userlist, fields) => {
        if (err) {
          const rettxt = `SQL error during query: ${err.stack}`;
          console.error(rettxt);
          res.send(rettxt);
          sql_connection.end();
        } else {
          console.log(`  Got userlist from SQL successfully!`);
          res.send(JSON.stringify(userlist));
          sql_connection.end();
        }
      });
    }
  });

})

app.listen(port, () => {
  console.log(`Example app listening at http://0.0.0.0:${port}`);
})
