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

function getAllMonsters(limit = 100, callback = console.log) {
    const sql = `SELECT * FROM monsters LIMIT ${limit}`;

    return connection.query(sql, function (err, results, fields) {
        if (err) {
            throw err;
        }

        // `callback` is the function you passed in
        callback(results);
    });
}

function getMonsterById(id, callback = console.log) {
    const sql = "SELECT *  FROM monsters WHERE id = ?";
    connection.query(sql, [id], function (err, results, fields) {
        if (err) {
            throw err;
        }

        callback(results);
    });
}

getAllMonsters();
getMonsterById(2);

connection.end();
