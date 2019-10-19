/** customers.js
  * database interactions for the Customers table
 **/

const sqlite3 = require('sqlite3');
const Promise = require('bluebird');

class Customers {
    constructor(dao) {
	this.dao = dao;
    }

    createTable() {
	const sql = `CREATE TABLE IF NOT EXISTS Customers(
                     custId integer NOT NULL PRIMARY KEY,
                     firstname text NOT NULL,
                     lastname text NOT NULL,
                     email text UNIQUE,
                     phone text,
                     address text,
                     city text,
                     zip text,
                     points integer NOT NULL,
                     joined text NOT NULL,
                     lastSeen text NOT NULL)`;
	return this.dao.run(sql);

    }

}


module.exports = { Customers };
