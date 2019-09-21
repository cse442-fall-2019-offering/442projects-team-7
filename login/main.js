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

function uRegister(){
	var username = document.getElementById("rUsername").value
	var exist = accountExists(username)
	if(exist == true){
		console.log("User already exists")
		return
	}
	var password = document.getElementById("rPassword").value
	var checkPW = document.getElementById("checkPW").value
	if(password != checkPW){
		console.log("Passwords do not match")
		return
	}
	this.loginTest.push({username, password})
	console.log("Account created successfully")
	console.log(loginTest)
}

app.on('ready', createWindow)
