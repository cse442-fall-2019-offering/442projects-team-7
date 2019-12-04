/** products.js
  * database interactions for the Products table
 **/

const sqlite3 = require('sqlite3').verbose();
const Promise = require('bluebird');

class Products {
    constructor(dao) {
	this.dao = dao;
    }

    createTable() {
	const sql = `CREATE TABLE IF NOT EXISTS Products(
                     sku integer NOT NULL PRIMARY KEY AUTOINCREMENT,
                     description text NOT NULL UNIQUE,
                     unit_price real NOT NULL)`;
	return this.dao.run(sql);
    }

    createEntry(description, unit_price) {
	const sql = `INSERT INTO Products (description, unit_price) VALUES (?, ?)`;
	
	return this.dao.run(sql,[description,unit_price]);

    }

    updateEntry(sku, newDescription, newPrice){
	//const { sku, description, unit_price } = product;
	const sql = `UPDATE Products SET description = ?, unit_price = ? WHERE sku = ?`;
	return this.dao.run(sql, [newDescription, newPrice, sku]);
	
    }

    deleteEntry(sku) {
	const sql = `DELETE FROM Products WHERE sku = ?`;
	return this.dao.run(sql, [sku]);
    }


    getBySku(sku) {
	const sql = `SELECT * FROM Products WHERE sku = ?`;
	return this.dao.get(sql, [sku]);
    }

    getAll() {
	const sql = `SELECT * FROM Products`;
	return this.dao.all(sql);
    }
}

module.exports = { Products };
