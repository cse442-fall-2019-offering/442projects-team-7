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
            matchCust integer REFERENCES Customers(custId) ON DELETE NO ACTION ON UPDATE CASCADE, 
            date blob NOT NULL,
            soldItems blob NOT NULL, 
            pointsUsed integer NOT NULL, 
            pointsEarned integer NOT NULL, 
            total real NOT NULL)`;
	
	return this.dao.run(sql);
    }

    createEntry(custId, soldItems, pointsUsed, pointsEarned, total) {

	const sql = `INSERT INTO Sales (matchCust, date, soldItems, pointsUsed, pointsEarned, total) VALUES (?, ?, ?, ?, ?, ?)`;
	let today = new Date();
	let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	let now = date+' '+time;
	return this.dao.run(sql,[custId, now, soldItems, pointsUsed, pointsEarned, total]);

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
