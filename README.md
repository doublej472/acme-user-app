# acme-user-app
This is an example NodeJS app that lists users from a MySQL database.

## Running
To run this app you need to specify how the SQL database is configured using
these environment variables:

* SQL\_HOST
  * The IP address or hostname of the SQL database server
* SQL\_USER
  * The SQL user that this app runs as
* SQL\_PASS
  * The password used to authenticate to the SQL\_USER specified above
* SQL\_DB
  * The database where the `userdb` table is stored

Here is an example of the command that can be used to run this app:

```
npm install
SQL_HOST='127.0.0.1' SQL_USER='acme' SQL_PASS='acme' SQL_DB='userdb' npm start
```
