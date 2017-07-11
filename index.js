'user strict';

const { app, ipcMain, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');
const NodeRSA = require('node-rsa');
const io = require('socket.io-client');
const socket = io('http://localhost:3000');

let win;
let key;
let registry = {};

function loadOrCreateKey () {
  key = new NodeRSA();
  fs.readFile('./public.key', (err, pub) => {
    if (err) {
      // Generate key
      key.generateKeyPair();

      // Save key
      let publicPem = key.exportKey('public');
      fs.writeFile('./public.key', publicPem, (err) => {
        if (err) { console.log('could export public key'); }
      });
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
          socket.emit('identify', {
            username: 'dropkick',
            publicKey: key.exportKey('public')
          });
        }
      });
    }
  });
}

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600});

  loadOrCreateKey();

  win.setMenu(null);

  win.webContents.openDevTools();

  // Message from view -- encrypt and send to server
  ipcMain.on('encrypt', (event, message) => {
    for (var e in registry) {
      if (registry.hasOwnProperty(e)) {
        let user = registry[e];
        let userKey = new NodeRSA();
        userKey.importKey(user.publicKey, 'public');
        let encrypted = userKey.encrypt(message, 'base64');
        socket.emit('message', {
          recipient: user.id,
          message: encrypted
        });
      }
    }
  });

  // Initialize the user registry
  socket.on('current-users', (users) => {
    registry = users;
  });

  // Message from server -- decrypt and pass to view
  socket.on('message', (message) => {
    let decrypted = key.decrypt(message, 'utf8');
    win.webContents.send('message', decrypted);
  });

  // New user joined the server
  socket.on('user-join', (user) => {
    registry[user.id] = user;
  });

  // User disconnected from server
  socket.on('user-leave', (id) => {
    delete registry[id];
  });

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'public/index.html'),
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
