// .verbose() enables verbose mode which captures stack traces when enqueing queries.
const sqlite3 = require('sqlite3').verbose();

// creating a Database Object.
// The sqlite3.Database() returns a Database object and opens the database connection automatically.
let db1 = new sqlite3.Database('./db/customers.db', function(err){
    // if err is == null then we print out an error message.
    if(err){
        return console.error(err.message);
    }
    // print out this if we successfully connected wihtout any errors.
    console.log('Connected to the customers database.');
});

let db2 = new sqlite3.Database('./db/products.db', function(err){
    // if err is == null then we print out an error message.
    if(err){
        return console.error(err.message);
    }
    // print out this if we successfully connected wihtout any errors.
    console.log('Connected to the products database.');
});

// close the database connection.
db1.close(function(err){
    if(err){
        return console.error(err.message);
    }
    console.log('Close the customers database connection.')
});

db2.close(function(err){
    if(err){
        return console.error(err.message);
    }
    console.log('Close the products database connection.')
});
