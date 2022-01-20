const mysql = require('mysql2') //import the package, before that we did  npm install --save mysql2  

const pool = mysql.createPool({ //create a pool of connections passing an object with information about the DB we are connecting to
    host: 'localhost', //server or ip-address
    user: 'root',
    database: 'node-complete', //exact data base name, that we specified when we created a DB
    password: 'NODE123456'  // password to connect with DB, also specified durying creating of DB
});

module.exports = pool.promise()