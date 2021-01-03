# reservations
A basic NodeJS application to manage reservation-related data

# About
This application depends upon a back-end database.

There are two endpoints associated with it:

 - `/reservations` (POST) - Schedule a new charter reservation
 - `/reservations` (GET)  - Retrieve a list of all reservations

The application will attempt to read database credentials from the environment. It expects to find the
following environment variables:

```
 DB_USER
 DB_PW
 DB_HOST
 DB_NAME
 DB_PORT
```

To work properly, it's necessary to create a table. This can be done several different
ways. To create the table from the command line via psql, use the following:

```
psql -p 5432 -h localhost -U postgres -d reservations -f init.sql
```

# Running the application locally

Be sure to create an instance of Postgres and declare the credentials as environment variables. A
sample way to do this is:

```
export DB_USER="postgres"
export DB_PW="passw0rd"
export DB_HOST="localhost"
export DB_NAME="postgres"
export DB_PORT="5432"
docker run --name postgres1 -e POSTGRES_PASSWORD=passw0rd -p 5432:5432 -d postgres

```

To test access to the database:

```
psql -p 5432 -h localhost -U postgres
# use the password 'passw0rd' to authenticate
```

Install and start the application:

```
npm install
npm start
```

# Building the Docker image

```
docker build -t reservations .
```

# Run the Docker image

```
docker run  --name reservations1 --env DB_USER=postgres --env DB_PW=passw0rd --env DB_HOST=host.docker.internal --env DB_NAME=postgres --env DB_PORT=5432 -p 3003:3003 -d reservations:latest
```