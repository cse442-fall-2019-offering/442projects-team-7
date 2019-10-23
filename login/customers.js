/** customers.js
  * database interactions for the Customers table
 **/

const sqlite3 = require('sqlite3').verbose();
const Promise = require('bluebird');

class Customers {
    constructor(dao) {
	this.dao = dao;
    }

    createTable() {
	const sql = `CREATE TABLE IF NOT EXISTS Customers(
                     custId integer NOT NULL PRIMARY KEY AUTOINCREMENT,
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

    createEntry(firstname, lastname, email, phone, address, city, zip, points, joined, lastSeen) {
	const sql = `INSERT INTO Customers (firstname, lastname, email, phone, address, city, zip, points, joined, lastSeen) VALUES
                     (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
	return this.dao.run(sql,[firstname, lastname, email, phone, address, city, zip, points, joined, lastSeen]);
    }

    updateEntry(customer) {
	const { custId, firstname, lastname, email, phone, address, city, zip, points, joined, lastSeen } = customer;
	const sql = `UPDATE Customers SET firstname = ?, lastname = ?, email = ?, phone = ?, address = ?, city = ?, zip = ?, points = ?,
                     joined = ?, lastSeen = ? WHERE custId = ?`;
	return this.dao.run(sql, [firstname, lastname, email, phone, address, city, zip, points, joined, lastSeen, custId]);
    }

    deleteEntry(custId) {
	const sql = `DELETE FROM Customers WHERE custId = ?`;
	return this.dao.run(sql, [custId]);
    }

    getById(custId) {
	const sql = `SELECT * FROM Customers WHERE custId = ?`;
	return this.dao.get(sql, [custId]);
    }

    getAll() {
	const sql = `SELECT * FROM Customers`;
	return this.dao.all(sql);
    }

}


module.exports = { Customers };
