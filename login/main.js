const { app, BrowserWindow } = require('electron')

const fs = require('fs')

var loginTest = [
	{
		username: "edmund",
		password: "qwerty"
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
function uLogin(){
	var username = document.getElementById("username").value
	var password = document.getElementById("password").value
	var exist = accountExists(username)
	if(exist == true){
		console.log("Username: " + username + '\n' + "Password: " + password)
		/*
			Code to transition to cashier page will go here
		*/
	}
	else{
		console.log("No such account")
	}
}

app.on('ready', createWindow)
