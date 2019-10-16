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

