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

}


module.exports = { Sales };
