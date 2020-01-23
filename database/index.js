const mysql = require('promise-mysql');
const config = require('../settings/config');

const pool = mysql.createConnection({ ...config.mySQL });

const database = async (cb) => {
  const conn = await pool;
  await cb(conn);
};

module.exports = database;
