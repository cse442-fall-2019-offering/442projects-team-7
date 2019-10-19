/** dao.js
 * Handles all interaction with the underlying datastore. 
 *
 *
 **/

const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const Promise = require('bluebird');

global.data = {get:'', all:['']};
/** DAO is the abstraction class for interactions with the database.  
 * 
 *
 *
**/
class DAO {

    
    
    /** constructor creates the database connection by opening a database at the given path.
      * Upon successful connection, it creates the necessary tables if they do not exist. 
      * @param dbFilePath        the desired path for the database
     **/
    constructor(dbFilePath) {

	const TABLE_PRODUCTS = `CREATE TABLE IF NOT EXISTS Products( 
        sku integer NOT NULL PRIMARY KEY, 
        description text NOT NULL UNIQUE, 
        unit_price real NOT NULL)`;
	const TABLE_CUSTOMERS = `CREATE TABLE IF NOT EXISTS Customers( 
        custId integer NOT NULL PRIMARY KEY, 
        firstname text NOT NULL, 
        lastname text NOT NULL, 
        email text UNIQUE, 
        phone text, 
        address text,  
        city text, zip text, 
        points integer NOT NULL, 
        joined text NOT NULL, 
        lastSeen text NOT NULL)`;
	const TABLE_SALES = `CREATE TABLE IF NOT EXISTS Sales( 
        saleId integer NOT NULL PRIMARY KEY, 
        FOREIGN KEY(customer) REFERENCES Customers(custId), 
        soldItems blob NOT NULL, 
        pointsUsed integer NOT NULL, 
        pointsEarned integer NOT NULL, 
        total real NOT NULL)`;
	const TABLE_USERS = `CREATE TABLE IF NOT EXISTS Users( 
        userId integer NOT NULL PRIMARY KEY, 
        username text NOT NULL, 
        pass blob NOT NULL, 
        salt blob NOT NULL, 
        group text NOT NULL)`;




	
	this.db = new sqlite3.Database(dbFilePath, (err) => {
	    if (err) {
		console.log('Database connection failed', err);
	    } else {
		console.log('Connected to database');
		console.log('Database creation for Products, Customers, Sales, and Users');
		this.db.run(TABLE_PRODUCTS);
		this.db.run(TABLE_CUSTOMERS);
		//this.db.run(TABLE_SALES);
		//this.db.run(TABLE_USERS);
	    }
	})
	
    }



    run(sql, params = []) {
	return new Promise((resolve, reject) => {
	    this.db.run(sql, params, function (err) {
		if (err) {
		    console.log('Error with sql ' + sql);
		    console.log(err);
		    reject(err);
		} else {
		    resolve({ id: this.lastID });
		}

	    });

	});
    }

    
    skuLookup (sku) {
	const SQL = `SELECT sku, description, unit_price 
                     FROM Products 
                     WHERE sku = ?`;
	
	console.log(this.db);
	this.db.get(SQL, sku, function(err, row) {
	    if (err) {
		console.log('error finding item with sku ' + sku, err);
		return console.error(err);
	    }
	    return setData(row);
	});

	
    }
    
    
}

function getData() {
    console.log("getdata in dao.js:",global.data);
    return global.data;

}
function setData(input) {
    console.log("setdata in dao.js:",global.data);
    global.data.get = input;

}

module.exports = { DAO, getData, setData };
