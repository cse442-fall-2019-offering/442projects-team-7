const { app, BrowserWindow,  ipcMain, ipcRenderer} = require('electron'); 
const { DAO, getData, setData } = require('./dao.js');
const Promise = require('bluebird');
const Customers = require('./customers.js');
const Products = require('./products.js');
const DBPATH = "./datastore.db";

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

function createWindow(){

    let win = new BrowserWindow({
	width: 1920,
	height: 1080,
	webPreferences: {
	    nodeIntegration: true
	}
    })
   
    win.loadFile('index.html')
    win.on('closed',() => {
	win=null
	})
}



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
	    box.style.display = "none";
	    var cashier = document.getElementById("cashierwindow");
	    cashier.style.display = "block";
    }, 1000);

}

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

// ipcMain.on('updateTable', function(event, sku) {
//   	console.log('sku : ' + sku);
//   	// Call function to generate productDB and return
// 	productStore.createTable()
// 		.then(() => productStore.getBySku(sku))
// 		.then((product) => {
// 		console.log('Retrieved product from DB', product);
// 		return new Promise((resolve, reject) => {
// 			//var sku = product.sku;
// 			//var description = product.description;
// 			//var price = product.unit_price;
// 			console.log(`SKU = ${product.sku}`);
// 			console.log(`Description = ${product.description}`);
// 			console.log(`Price = ${product.unit_price}`);
// 			//var productArray = {sku, description, price};
// 		});
// 		resolve("success");
// 		})
// 	    .catch((err) => {
// 		console.log('Error: ');
// 		console.log(err);
// 		});
// });

// document.getElementById('login').addEventListener('click', () => {
//  	ipcRenderer.send('updateTable', 1);
// });

/////////// Table Population code ///////////

// Returns a product entry as a list via its sku
function getProductBySku(sku) {
	var product = [556278, "An example item description", 44.99];
	if (product[0] == sku) {
		return product;
	}
	return undefined;
}

// Inserts a given rowEntry into an existing empty row
function insertTableRowData(rowEntry, tableData) {
	console.log(tableData.rows.length);
	for (var rowIndex = 0; rowIndex < tableData.rows.length; rowIndex++) {
		// if current row is empty, populate
		if (tableData.rows[rowIndex].cells[0].innerHTML == '') {
			console.log('Found');
			tableData.rows[rowIndex].cells[0].innerHTML = rowEntry[0];
			tableData.rows[rowIndex].cells[1].innerHTML = rowEntry[1];
			tableData.rows[rowIndex].cells[2].innerHTML = rowEntry[2];
			tableData.rows[rowIndex].cells[3].innerHTML = 1;
			tableData.rows[rowIndex].cells[4].innerHTML = rowEntry[2];
			break;
		}
	}	
}

// Returns the string name for a styling class, based on column index
function getColumnClass(colIndex) {
	switch(colIndex) {
		case(0):
			return "tableColumn1";
		case(1):
			return "tableColumn2";
		case(2):
			return "tableColumn3";
		case(3):
			return "tableColumn4";
		default:
			return "tableColumn5";
	}

}

// Populates a newly created row cell
function addRowCellNew(colClass, cell, entry) {
	let textNode = document.createTextNode(entry);
	cell.appendChild(textNode);
	cell.classList.add(colClass);
}

// Creates a new row and populates its data
function insertTableRowDataNew(rowEntry, tableData) {
	let table = document.getElementById("Table-Data");
	let row = table.insertRow();

	var rowLen = table.rows.length;
	row.id = "row_" + rowLen;
	if(rowLen % 2 == 0) {
		row.classList.add("tableEntryB");
	} else {
		row.classList.add("tableEntryA");
	}

	addRowCellNew(getColumnClass(0), row.insertCell(), rowEntry[0]);
	addRowCellNew(getColumnClass(1), row.insertCell(), rowEntry[1]);
	addRowCellNew(getColumnClass(2), row.insertCell(), rowEntry[2]);
	addRowCellNew(getColumnClass(3), row.insertCell(), 1);
	addRowCellNew(getColumnClass(4), row.insertCell(), rowEntry[2]);
}

// Populates main POS display table on SKU search entry.
function addMainTableItem() {
	//var sku = document.getElementById("Item-Search-Field").value;
	var sku = 556278;

	console.log('sku : ' + sku);

	// Requires DB access
	var rowEntry = getProductBySku(sku);

	// Check if last row is empty
	if (rowEntry != undefined) {
		// Check if last open table is empty
		var tableData = document.getElementById("Table-Data");
		if (tableData.rows[20].cells[0].innerHTML == '') {
			console.log("Empty Case");
			insertTableRowData(rowEntry, tableData);
		} else {
			// Populate rest of table
			console.log("Non-Empty Case");
			insertTableRowDataNew(rowEntry, tableData);
		}
	}
}

// Determines new row styling
function switchStyling() {

}

// Deletes all rows with selected class applied
function deleteMainSelectedItems() {
	var table = document.getElementById("Table-Data");
	var numRows = table.rows.length;
	var count = 1;
	for (var rowIndex = 0; rowIndex < numRows; rowIndex++) {
		var row = table.rows[rowIndex];
		if (row.classList.contains('selectedRow')) {
			if (rowIndex <= 21) {
				row.classList.remove('selectedRow');
				table.deleteRow(rowIndex);
				newRow = table.insertRow();
				addRowCellNew(getColumnClass(0), newRow.insertCell(), "");
				addRowCellNew(getColumnClass(1), newRow.insertCell(), "");
				addRowCellNew(getColumnClass(2), newRow.insertCell(), "");
				addRowCellNew(getColumnClass(3), newRow.insertCell(), "");
				addRowCellNew(getColumnClass(4), newRow.insertCell(), "");
				// for (var colIndex = 0; colIndex < 5; colIndex++) {
				// 	console.log(row.columns[rowIndex].innerHTML);
				// 	row.columns[rowIndex].innerHTML = "";
				// }
			} else {
				row.classList.remove('selectedRow');
				table.deleteRow(rowIndex);
				row = table.rows[rowIndex];
			}
		}
		row = table.rows[rowIndex];
		row.id = "row_" + count;

		if (row.classList.contains('tableEntryB')) {
			row.classList.remove('tableEntryB');
		} else if (row.classList.contains('tableEntryA')) {
			row.classList.remove('tableEntryA');
		}

		if((count % 2) == 0) {
			row.classList.add("tableEntryB");
		} else {
			row.classList.add("tableEntryA");
		}

		count += 1;

		console.log(rowIndex); 
	}
}

//EXAMPLE: Inits tables (always need this) and then gets all entries in Products table. 
// Can act on them within the promise, or use the promise to add the entries to an external array. 
// Refer to products.js and customers.js to see other functions. 
// customerStore.createTable()
//     .then(() => productStore.createTable())
//     .then(() => productStore.getAll())
//     .then((products) => {
// 	console.log('Retrieved products from DB', products);
// 	return new Promise((resolve, reject) => {
// 	    products.forEach((product) => {
// 		console.log(`SKU = ${product.sku}`);
// 		console.log(`Description = ${product.description}`);
// 		console.log(`Price = ${product.unit_price}`);
// 	    });
// 	});
// 	resolve('success');
//     })
//     .catch((err) => {
// 	console.log('Error: ');
// 	console.log(err);
//     });



/////////// Pop up window code ///////////

/**
 * Creates a pop up window
 * 
 * @param id ID of the button we click on to create the window
 */
function popUp(id){
	var popUp = id
	if(popUp == "itemManip"){
		window.open("itemManip.html", "_blank", "nodeIntegration = true")
	}
}

function editItems(){
	text = document.getElementById("Edit").value
	if (text=="Edit") {
		var input = document.getElementById("SKUInput")
		input.style.display = "block"
		document.getElementById("Edit").value = "Submit"
		editor()
	}
    else document.getElementById("Edit").value = "Edit"
}

/**
 * Lets us edit each table by row
 */
function editor(){
	var table = document.getElementById("itemTable")
	var SKU = document.getElementById("itemSKU").value
	console.log(table.rows[0].cells[0].innerHTML)
	var des = document.getElementById("itemDescription").value
	var price = document.getElementById("itemUnitPrice").value
		for (var i = 1; i < table.rows.length; i++) {
			table.rows[i].onclick = function(){
				// Only allow edits while in edit mode(Will need to delete if statement to work with other tables)
				if(document.getElementById("Edit").value == "Edit"){
					return;
				}
				this.cells[0].innerHTML = document.getElementById("itemSKU").value
				this.cells[1].innerHTML = document.getElementById("itemDescription").value
				this.cells[2].innerHTML = document.getElementById("itemUnitPrice").value
			};
		}

}
