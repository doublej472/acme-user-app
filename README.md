# acme-user-app
This is an example NodeJS app that lists users from a MySQL database.

## Running
To run this app you need to specify how the SQL database is configured using
these environment variables:

* DB\_HOST
  * The IP address or hostname of the SQL database server, along with the port
* DB\_USER
  * The SQL user that this app runs as
* DB\_PASS
  * The password used to authenticate to the SQL\_USER specified above
* DB\_NAME
  * The database where the `userdb` table is stored

Here is an example of the command that can be used to run this app:

```
npm install
DB_HOST='127.0.0.1:3306' DB_USER='acme' DB_PASS='acme' DB_NAME='userdb' npm start
```

## Docker
This repository comes with a Dockerfile that will containerize this application.
You can build it just like any other Docker container:

```
docker build -t acme/acme-user-app:latest .
```
