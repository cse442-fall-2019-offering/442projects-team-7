const { app, BrowserWindow } = require('electron')

const fs = require('fs')
// .verbose() enables verbose mode which captures stack traces when enqueing queries.
const sqlite3 = require('sqlite3').verbose();

var loginTest = [
	{
		username: "edmund",
		password: "qwerty"
	},
	{
		username: "",
		password: ""
	}
]

function createWindow(){

    let win = new BrowserWindow({
	width: 1920,
	height: 1080,
	webPreferences: {
	    nodeIntegration: true
	}
    })
   
    win.loadFile('../display/index.html')
    win.on('closed',() => {
	win=null
	})
}

function accountExists(username){
	if((undefined != loginTest) && (loginTest.length)){
		var password = document.getElementById("password").value
		for(i=0;i<loginTest.length;i++){
			if((username == loginTest[i].username) && (password == loginTest[i].password)){
				return true
			}
		}
		return false
	}
	else{
		return false
	}
}

//Clear login and show cashier window
function clearLogin(id){
     
        var box = document.getElementById(id)
	box.style.transition = "opacity 1.0s linear 0s"
	box.style.opacity = 0
        setTimeout(function(){
	
	   
	    box.style.display = "none"
	    var cashier = document.getElementById("cashierwindow")
	    cashier.style.display = "block"
	}, 1000)

}

function uLogin(){
	var username = document.getElementById("username").value
	var password = document.getElementById("password").value
	var exist = accountExists(username)
	if(exist == true){
		console.log("Username: " + username + '\n' + "Password: " + password)
		clearLogin("wrapper")
	}
	else{
		console.log("No such account")
	}
}

app.on('ready', createWindow)

/////////// SQLite code ///////////

// creating a Database Object.
// The sqlite3.Database() returns a Database object and opens the database connection automatically.
let customerDB = new sqlite3.Database('../database/db/customer.db', function(err){
    // if err is != null then we print out an error message.
    if(err){
        return console.error(err.message);
    }
    // print out this if we successfully connected wihtout any errors.
	console.log('Connected to the customer database.');

});
 
let productDB = new sqlite3.Database('../database/db/product.db', function(err){
    // if err is == null then we print out an error message.
    if(err){
        return console.error(err.message);
    }
    // print out this if we successfully connected wihtout any errors.
	console.log('Connected to the product database.');
	
		// createTable() creates table
		productDB.exec(productDBSchema, function(err){
			if(err){
				return console.error(err.message);
			}
		});
});

// productDB Schema
productDBSchema = `CREATE TABLE IF NOT EXISTS Products(
	sku text NOT NULL PRIMARY KEY,
	description text NOT NULL,
	unit_price REAL NOT NULL
);`

// getter function to get row by sku
// returns an array with sku, description, and unit price indexed in that order
function findItemBySKU (sku){
	var sql = 'SELECT sku, description, unit_price ';
	sql += 'FROM Products ';
	sql += 'WHERE sku = ? ';
        
	return productDB.get(sql, sku, function(err, row){
	    if(err){
		console.log('error finding item with sku ' + sku, err);
		    return console.error(err.message);
		}
		console.log(row);
		return row;
	})
}


function addTableItem(sku) {
    console.log("SKU is : ",findItemBySKU(sku));
}


//addTableItem("123415");
console.log(findItemBySKU("123415"))

// close the database connection.
customerDB.close(function(err){
    if(err){
	console.log('error closing customerDB: ', err);
        return console.error(err.message);
    }
    console.log('Close the customer database connection.')
});

productDB.close(function(err){
    if(err){
	console.log('error closing productDB: ',err);
        return console.error(err.message);
    }
    console.log('Close the product database connection.')
});