const { response } = require('express');
const express = require('express')
const { Client } = require('pg')
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const port = process.env.MY_PORT ? process.env.MY_PORT : 3888

let dbVars = {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PW,
    port: process.env.DB_PORT,
};
if (process.env.DB_USE_SSL && process.env.DB_USE_SSL === 'true') {
    dbVars.ssl = {
        rejectUnauthorized: false // This is for simplicity in the demo; don't do this in a "real" app!
    }
}
console.log("Connection details:" + JSON.stringify(dbVars))
console.log("Running on port: " + port);

let client = null;
const initClient = async () => {

    client = new Client(dbVars);
    await client.connect();
}

app.get('/reservations', async (req, res) => {
    if (client == null) {
        try {
            await initClient()
        } catch (excc) {
            const msg = `Error connecting to the database. Please be sure all environment variables have been defined. Error = ${excc.message}`;
            console.log(msg);
            res.status(400).send({ message: msg });
            return;
        }
    }

    const query = "select reservation_id, charter_id, charter_name, reservation_timedate, contact_name from reservations order by charter_name";
    try {
        const response = await client.query(query);
        res.status(200).send({ reservations: response.rows })
    } catch (exc) {
        const msg = `Error retrieving charters: ${exc.message}`;
        res.status(400).send({ message: msg })
    }
});

app.post('/reservations', async (req, res) => {

    if (client == null) {
        try {
            await initClient()
        } catch (excc) {
            const msg = `Error connecting to the database. Please be sure all environment variables have been defined. Error = ${excc.message}`;
            console.log(msg);
            res.status(400).send({ message: msg });
            return;
        }
    }

    const sql = "insert into reservations (charter_id, charter_name, reservation_timedate, contact_name) values($1, $2, $3, $4)";
    const sqlValues = [req.body.charter_id, req.body.charter_name, req.body.reservation_timedate, req.body.contact_name]
    try {
        const response = await client.query(sql, sqlValues);
        const reservation_id = response.rows[0].reservation_id;
        res.status(200).send({ reservation_id: reservation_id })
    } catch (exc) {
        const msg = `Error creating reservation: ${exc.message}`;
        res.status(400).send({ message: msg })
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}.`)
});