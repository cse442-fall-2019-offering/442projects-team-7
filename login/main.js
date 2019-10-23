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
		window.open("itemManip.html", "_blank", "width=100, height=100, scrollbars=1, nodeIntegration = true, left=0,top=0")
	}
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
