const { app, BrowserWindow, Menu } = require('electron')
require('dotenv').config()


try {
    require('electron-reloader')(module)
  } catch (_) {}
/*
 * By default, Electron (well, underlying Chrome browser) will reject loading external URLs
 * to an <iframe>. To circumvent this limitation, we can manipulate response headers from any
 * http request and feed them to the Electron window.
 *
 * The 'onHeadersReceived' listener is documented here:
 * http://electron.atom.io/docs/api/session/#webrequestonheadersreceivedfilter-listener
 */

app.on('ready', () => {
    let myWindow = new BrowserWindow({
      width: 1920,
      height: 1080,
      center: true,
      autoHideMenuBar: true,
      
    });

     
    
    myWindow.webContents.session.webRequest.onHeadersReceived(
        {urls: ['https://*/*', 'http://*/*']},
        (details, callback) => {
          Object.keys(details.responseHeaders).filter(x => x.toLowerCase() === 'x-frame-options')
                .map(x => delete details.responseHeaders[x])
      
          callback({
            cancel: false,
            responseHeaders: details.responseHeaders,
          })
        },
        myWindow.loadURL(process.env.ROUTE_MONDAY || "https://auth.monday.com/auth/login_monday")
      )})


     
      
     
      




  