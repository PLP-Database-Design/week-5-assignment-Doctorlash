//import dependencies
const express = require('express');
const app = express();
const mysqlno= require ('mysql2');
const dotenv= require ('dotenv');

//configure environment variables
dotenv.config();

//create a connection object
const db= mysqlno.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

//test the connection
db.connect((err) => {
//if the connection is not successful
if(err) {
    return console.log("error connecting to the database:", err)
}
//if the connection is succesful
console.log("successfully connected to Mysql: ", db.threadId)
})

//retrieve all patients
//test 
app.get('', (req, res) => {
    const getpatients = "SELECT * FROM patients"
    db.query(getpatients, (err, data) => {
        if(err) {
            return res.status(400). send("failed to get patients", err)
        }
        res.status(200).send(data)
    })
});

//--question 1
app.get('/patients', (req, res) => {
    const getpatients = "SELECT patient_id, first_name, last_name, date_of_birth FROM patients"
    db.query(getpatients, (err, data) => {
        if(err) {
            return res.status(400). send("failed to get patients", err)
        }
        res.status(200).send(data)
    })
});

//question 2
app.get('/providers', (req, res) => {
    const getproviders = "SELECT first_name, last_name, provider_specialty FROM providers"
    db.query(getproviders, (err, data) => {
        if(err) {
            return res.status(400). send("failed to get providers", err)
        }
        res.status(200).send(data)
    })
});

//question 3
app.get('/patient-firstname', (req, res) => {
    const getpatients = "SELECT first_name FROM patients"
    db.query(getpatients, (err, data) => {
        if(err) {
            return res.status(400). send("failed to get patients", err)
        }
        res.status(200).send(data)
    })
});

//question 4
app.get('/providers-specialty', (req, res) => {
    const getproviders = "SELECT provider_specialty FROM providers"
    db.query(getproviders, (err, data) => {
        if(err) {
            return res.status(400). send("failed to get providers", err)
        }
        res.status(200).send(data)
    })
});
app.listen(3300, ()=> {
    console.log(`server is running on port 3300...`)
});