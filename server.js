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
    host: '147.235.209.54',
    user: 'root',
    password: '',
    database: 'testdb'
});

// Start a server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

app.get('/users', (req, res) => {
    pool.query('SELECT * FROM tblusers', (error, results) => {
        if (error) {
            throw error;
            console.error(error);
            res.status(500).send('Error retrieving users');
        } else {
            res.status(200).json(results);
        }
    });
});
