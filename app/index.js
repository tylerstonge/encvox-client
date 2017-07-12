'user strict';

const { app, ipcMain, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');
const NodeRSA = require('node-rsa');
const io = require('socket.io-client');
const socket = io('http://localhost:3000');
const Registry = require('./registry');

let win;
let username;
let key = new NodeRSA();
let registry = new Registry();

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600});

  loadOrCreateKey();

  win.setMenu(null);

  win.webContents.openDevTools();

  // Message from view, encrypt and send to server
  ipcMain.on('encrypt', (event, message) => {
    registry.emitMessage(socket, message);
  });

  // Initialize the user registry
  socket.on('current-users', (users) => {
    registry.initializeRegistry(users);
  });

  // Message from server, decrypt and pass to view
  socket.on('message', (m) => {
    let decrypted = key.decrypt(m.message, 'utf8');
    win.webContents.send('message', {
      sender: m.sender,
      message: decrypted
    });
  });

  // New user joined the server
  socket.on('user-join', (user) => {
    registry.addUser(user);
  });

  // User disconnected from server
  socket.on('user-leave', (id) => {
    registry.removeUser(id);
  });

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'view/index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

function loadOrCreateKey () {
  fs.readFile('./public.key', (err, pub) => {
    if (err) {
      // Generate key
      key.generateKeyPair();

      // Save public key
      let publicPem = key.exportKey('public');
      fs.writeFile('./public.key', publicPem, (err) => {
        if (err) { console.log('could export public key'); }
      });

      // Save private key
      let privatePem = key.exportKey('private');
      fs.writeFile('./private.key', privatePem, (err) => {
        if (err) { console.log('could export private key'); }
      });
    } else {
      key.importKey(pub, 'public');

      fs.readFile('./private.key', (err, prv) => {
        if (err) {
          console.log('could not find private key, but found public key.');
        } else {
          key.importKey(prv, 'private');
          username = 'dropkick' + Math.floor((Math.random() * 1000) + 1);
          socket.emit('identify', {
            username: username,
            publicKey: key.exportKey('public')
          });
        }
      });
    }
  });
}
