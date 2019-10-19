/** dao.js
 * Handles all interaction with the underlying datastore. 
 *
 *
 **/

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

	
	this.db = new sqlite3.Database(dbFilePath, (err) => {
	    if (err) {
		console.log('Database connection failed', err);
	    } else {
		console.log('Connected to database');
		console.log('Database creation for Products, Customers, Sales, and Users');
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


    get(sql, params = []) {
	return new Promise((resolve, reject) => {
	    this.db.get(sql, params, (err, result) => {
		if (err) {
		    console.log('Error with sql ' + sql);
		    console.log(err);
		    reject(err);
		} else {
		    resolve(result);
		}

	    });
	});

    }


    all(sql, params = []) {
	return new Promise((resolve, reject) => {
	    this.db.all(sql, params, (err, rows) => {
		if (err) {
		    console.log('Error with sql ' + sql);
		    console.log(err);
		    reject(err);
		} else {
		    resolve(rows);
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

