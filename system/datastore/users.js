/** users.js
  * database interactions for the Users table
 **/

const sqlite3 = require('sqlite3');
const Promise = require('bluebird');

class Users {
    constructor(dao) {
	this.dao = dao;
    }

    createTable(dao) {
	const sql = `CREATE TABLE IF NOT EXISTS Users( 
            userId integer NOT NULL PRIMARY KEY AUTOINCREMENT, 
            username text NOT NULL, 
            pass blob NOT NULL, 
            salt blob NOT NULL, 
            group text NOT NULL)`;
	return this.dao.run(sql);
    }


}

module.exports = { Users };

