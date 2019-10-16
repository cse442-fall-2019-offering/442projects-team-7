const { app, BrowserWindow } = require('electron')


var DAO = require('./dao.js')
 
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
   
    win.loadFile('index.html')
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


const DBPATH = "./datastore.db";
var DAOtest = new DAO(DBPATH);

var skutest = DAOtest.skuLookup(12345);
skutest = DAOtest.skuLookup(1);

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