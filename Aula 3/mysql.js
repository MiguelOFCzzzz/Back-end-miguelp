const { rejects } = require('assert');
const mysql = require('mysql');
const { resolve } = require('path');

const pool = mysql.createPool({
"user":"root",
"password":"thor",
"database": "idev3",
"host":"localhost",
"port":"3306"

})

exports.execute = (query, param = [], varPool = pool) => {
    return new Promise((resolve, reject) => {

        varPool.query(query, param, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }


        });

    });


}


exports.pool = pool;

