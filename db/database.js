// This imports the mysql library
const mysql = require("mysql");

// Prepare to connect to MySQL with your secret environment variables
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
});

function getAllMonsters(limit = 100) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM monsters LIMIT ${limit}`;
        pool.query(sql, function (err, results, fields) {
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
        pool.query(sql, [id], function (err, results, fields) {
            if (err) {
                return reject(err);
            }

            return resolve(results);
        });
    });
}

function searchMonsterByName(keyword) {
    return new Promise((resolve, reject) => {
        // This is an alternate way to sanitize user input for the query
        const sql =
            "SELECT * FROM monsters WHERE name LIKE " +
            pool.escape(`%${keyword}%`);

        pool.query(sql, [keyword], function (err, results, fields) {
            if (err) {
                return reject(err);
            }

            return resolve(results);
        });
    });
}

// Export the functions so other modules can use them
module.exports = {
    getAllMonsters,
    getMonsterById,
    searchMonsterByName,
};
