const { app, BrowserWindow,  ipcMain, ipcRenderer} = require('electron'); 
const { DAO, getData, setData } = require('./datastore/dao.js');
const Customers = require('./datastore/customers.js');
const Products = require('./datastore/products.js');
const DBPATH = "./datastore/datastore.db";

// Function to get login credentials.
function getLoginTest() {
	var loginTest = [
		{
			username: "edmund",
			password: "qwerty"
		},
		{
			username: "",
			password: ""
		}
	];
	return loginTest;
}

// Creates login BrowserWindow
function createWindow(){
    let win = new BrowserWindow({
	width: 1920,
	height: 1080,
	webPreferences: {
	    nodeIntegration: true
	}
    })
   
    win.loadFile('./display/index.html')
    win.on('closed',() => {
		win=null;
	});
}

// Checks if account currently exists in datastore
function accountExists(username){
	var loginTest = getLoginTest();
	console.log(loginTest);
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
		console.log(loginTest);
		return false
	}
}

//Clear login and show cashier window
function clearLogin(id){
    var box = document.getElementById(id);
    box.style.transition = "opacity 1.0s linear 0s";
    box.style.opacity = 0;
    setTimeout(function(){	
    	// Request Main Electron process loads main POS display
	    ipcRenderer.send('loadPosDisplay');
	    // Close the login BrowserWindow
	    const remote = require('electron').remote;
		remote.getCurrentWindow().close();
    }, 1000);

}

// Checks if user login credentials are valid
function uLogin(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    console.log("Username: " + username + '\n' + "Password: " + password);
    var exist = accountExists(username);
	if(exist == true){
	    console.log("Username: " + username + '\n' + "Password: " + password);
	    clearLogin("wrapper");
	}
	else{
	    console.log("No such account");
	}
}

app.on('ready', createWindow);


const DAOtest = new DAO(DBPATH);
const customerStore = new Customers.Customers(DAOtest);
const productStore = new Products.Products(DAOtest);

// On createProduct message, create a new product in products DB
ipcMain.on('createProduct', function(event, description, price) {
	const Promise = require('bluebird');
  	// Call function to generate productDB and return
	productStore.createTable() 
		.then(() => {
		//console.log('Retrieved product from DB', product);
		return new Promise((resolve, reject) => {
			productStore.createEntry(description, price);
		});
		resolve("success");
		})
	    .catch((err) => {
		console.log('Error: ');
		console.log(err);
		});
});

// On editProduct message, find a product by its corresponding sku and edit its description and price
ipcMain.on('editProduct', function(event, sku, newDescription, newPrice) {
	const Promise = require('bluebird');
  	// Call function to generate productDB and return
	productStore.createTable()
		.then(() => productStore.getBySku(sku))
		.then((product) => {
		//console.log('Retrieved product from DB', product);
		return new Promise((resolve, reject) => {
			if (product != undefined) {
				productStore.updateEntry(sku, newDescription, newPrice);
			}
		});
		resolve("success");
		})
	    .catch((err) => {
		console.log('Error: ');
		console.log(err);
		});
});

// On deleteProduct message, find a product by its corresponding sku and delete
ipcMain.on('deleteProduct', function(event, sku) {
	const Promise = require('bluebird');
  	// Call function to generate productDB and return
	productStore.createTable()
		.then(() => productStore.getBySku(sku))
		.then((product) => {
		//console.log('Retrieved product from DB', product);
		return new Promise((resolve, reject) => {
			if (product != undefined) {
				productStore.deleteEntry(sku);
			}
		});
		resolve("success");
		})
	    .catch((err) => {
		console.log('Error: ');
		console.log(err);
		});
});

// On getProductRow message, open products DB and return a rowList by its corresponding sku 
ipcMain.on('getProductRow', function(event, sku) {
	const Promise = require('bluebird');
  	// Call function to generate productDB and return
	productStore.createTable()
		.then(() => productStore.getBySku(sku))
		.then((product) => {
		//console.log('Retrieved product from DB', product);
		return new Promise((resolve, reject) => {
			var rowList = [];
			if (product != undefined) {
				rowList.push(product.sku);
				rowList.push(product.description);
				rowList.push(product.unit_price);
			}
			event.returnValue = rowList;
			//var productArray = {sku, description, price};
		});
		resolve("success");
		})
	    .catch((err) => {
		console.log('Error: ');
		console.log(err);
		});
});

// On getAllProductRows message, open products DB and return a listing of all row lists
ipcMain.on('getAllProductRows', function(event) {
	const Promise = require('bluebird');
	productStore.createTable()
	    .then(() => productStore.getAll())
	    .then((products) => {
		return new Promise((resolve, reject) => {
			var rowsList = [];
		    products.forEach((product) => {
			    if (product != undefined) {
			    	let rowList = [product.sku, product.description, product.unit_price]
			    	rowsList.push(rowList);
				}
		    });
		    event.returnValue = rowsList;
		});
		resolve('success');
	    })
	    .catch((err) => {
		console.log('Error: ');
		console.log(err);
	    });
});

// On loadPosDisplay message, create a new BrowserWindow for the main pos display
ipcMain.on('loadPosDisplay', function(event) {
	console.log("Loading POS Display Page");

	let win = new BrowserWindow({
	show: false,
	width: 1920,
	height: 1080,
	webPreferences: {
	    nodeIntegration: true
	}
    })
	win.loadFile('./display/pos.html');
	win.once('ready-to-show', () => {
  		win.show();
	})
	win.on('closed',() => {
		win=null;
	});
});

// On loadItemManip message, create a new BrowserWindow for the Item Manipulation Window
ipcMain.on('loadItemManip', function(event) {
	console.log("Loading Item Manipulation Window");

	let win = new BrowserWindow({
	show: false,
	width: 1025,
	height: 560,
	resizable: false,
	alwaysOnTop: true,
	webPreferences: {
	    nodeIntegration: true
	}
    })
	win.loadFile('./display/itemManip.html');
	win.once('ready-to-show', () => {
  		win.show();
	})
	win.on('closed',() => {
		win=null;
	});
});

// Requests a product row in the products DB by sku
function requestProductRow(sku) {
	const { addMainTableItem } = require("../datastore/tableManip.js");
	var tableData = document.getElementById("Table-Data");
	let response = ipcRenderer.sendSync('getProductRow', sku);
	console.log(response);
	addMainTableItem(response);
}

// Deletes a product row from main POS table
function deleteProductRow() {
	const { deleteSelectedItems } = require("../datastore/tableManip.js");
	deleteSelectedItems('main');
}

/////////// Pop up window code ///////////

/**
 * Creates a pop up window
 * 
 * @param id ID of the button we click on to create the window
 */
function popUp(id){
	var popUp = id
	if(popUp == "itemManip"){
		ipcRenderer.send('loadItemManip');
		//window.open("../display/itemManip.html", "_blank", "width=100, height=100, scrollbars=1, nodeIntegration = true, left=0,top=0")
	}
}

/**
 * Refresh items table on click to Refresh table button in itemManip
 */
function refreshItemsTable() {
	const { getProductListing } = require("../datastore/tableManip.js");
	let response = ipcRenderer.sendSync('getAllProductRows');
	console.log(response);
	getProductListing(response);
}

/**
 * Deletes a product from the DB and removes it from the Item Manipulation table
 */
function deleteDbItem() {
	const { getSkuFromSelected, deleteSelectedItems } = require("../datastore/tableManip.js");
	var sku = getSkuFromSelected();
	ipcRenderer.send('deleteProduct', sku);
	deleteSelectedItems('popup');
}

/**
 * Edits a product in the DB and the Item Manipulation table
 */
function editDbItem() {
	const { editSelectedItem, getSkuFromSelected, getInputDescription, getInputPrice } = require("../datastore/tableManip.js");
	var sku = getSkuFromSelected();
	var description = getInputDescription();
	var price = getInputPrice();
	ipcRenderer.send('editProduct', sku, description, price);
	editSelectedItem();
}

/**
 * Edits a product in the DB and the Item Manipulation table
 */
function createDbItem() {
	const { getInputDescription, getInputPrice } = require("../datastore/tableManip.js");
	var description = getInputDescription();
	var price = getInputPrice();
	ipcRenderer.send('createProduct', description, price);
}
