const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  win.loadFile(path.join(__dirname, 'dist', 'number-input-app', 'browser', 'index.html'));
}

app.whenReady().then(() => {
  createWindow()
})