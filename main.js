'use strict';

const electron = require('electron');
const path = require('path');
const url = require('url');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

function parseArgv() {
	const images = process.argv.slice(2);
	if(images.length != 2) {
		console.log(`
Usage: 
	blabla leftImage rightImage
Example:
	blabla photo1.jpg photo2.jpg
`);
		process.exit(0);
	}
	return images;
}

const imagePaths = parseArgv();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({fullscreen: true});

	const indexPath = path.resolve(__dirname, 'index.html');
	const indexUrl = url.format({
		protocol: 'file',
		pathname: indexPath,
		slashes: true,
		hash: encodeURIComponent(JSON.stringify(imagePaths))
	});

  // and load the index.html of the app.
  mainWindow.loadURL(indexUrl);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
