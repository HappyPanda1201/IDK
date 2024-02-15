const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Parse the requests of content-type 'application/json'
app.use(bodyParser.json());

// Create the MySQL connection pool
const pool = mysql.createPool ({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'my_database'
});

// Start a server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

app.get('/users', (req, res) => {
    pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error retrieving users');
        } else {
            res.status(200).json(results);
        }
    });
});