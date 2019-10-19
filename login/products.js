/** products.js
  * database interactions for the Products table
 **/

const sqlite3 = require('sqlite3');
const Promise = require('bluebird');

class Products {
    constructor(dao) {
	this.dao = dao;
    }

    createTable() {
	const sql = `CREATE TABLE IF NOT EXISTS Products(
                     sku integer NOT NULL PRIMARY KEY,
                     description text NOT NULL UNIQUE,
                     unit_price real NOT NULL)`;
	return this.dao.run(sql);
    }
}

module.exports = { Products };
