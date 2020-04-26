// This loads the settings from your `.env` file.
require("dotenv").config();

// This imports the mysql library
const mysql = require("mysql");

// Prepare to connect to MySQL with your secret environment variables
const connection = mysql.createConnection({
    connectionLimit: 10,
    host: process.env.MYSQL,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
});

// Make the connection
connection.connect(function (err) {
    if (err) {
        console.log("connection error", err.stack);
        return;
    }

    console.log(`connected to database`);
});

function getAllMonsters(limit = 100) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM monsters LIMIT ${limit}`;
        connection.query(sql, function (err, results, fields) {
            if (err) {
                return reject(err);
            }

            return resolve(results);
        });
    });
}

function getMonsterById(id) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM monsters WHERE id = ?";
        connection.query(sql, [id], function (err, results, fields) {
            if (err) {
                return reject(err);
            }

            return resolve(results);
        });
    });
}

getAllMonsters()
    .then(data => console.log("all monsters", data))
    .catch(err => console.error(err));

getMonsterById(2)
    .then(data => console.log("monster #2", data))
    .catch(err => console.error(err));

connection.end();
