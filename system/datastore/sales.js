/** sales.js
  * database interaction for the Sales table
 **/

const sqlite3 = require('sqlite3');
const Promise = require('bluebird');

class Sales {
    constructor(dao) {
	this.dao = dao;
    }

    createTable() {
	const sql = `CREATE TABLE IF NOT EXISTS Sales( 
            saleId integer NOT NULL PRIMARY KEY AUTOINCREMENT, 
            CONSTRAINT matchCust FOREIGN KEY(customer) REFERENCES Customers(custId), 
            soldItems blob NOT NULL, 
            pointsUsed integer NOT NULL, 
            pointsEarned integer NOT NULL, 
            total real NOT NULL)`;

	return this.dao.run(sql);
    }

    createEntry(matchCust, soldItems, pointsUsed, pointsEarned, total) {

	const sql = `INSERT INTO Customers (matchCust, soldItems, pointsUsed, pointsEarned, total) VALUES (?, ?, ?, ?, ?)`;

	return this.dao.run(sql,[matchCust, soldItems, pointsUsed, pointsEarned, total]);

    }

    getById(id) {
	const sql = `SELECT * FROM Sales WHERE saleId = ?`
	return this.dao.get(sql, [id]);
    }

    getAll() {
	const sql = `SELECT * FROM Sales`;
	return this.dao.all(sql);
    }

}


module.exports = { Sales };
