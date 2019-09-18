const { app, BrowserWindow } = require('electron')

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

app.on('ready', createWindow)
