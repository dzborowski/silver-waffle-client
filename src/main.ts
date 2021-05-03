import {app, BrowserWindow} from "electron";

function createWindow() {
    const win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
        },
    });

    win.webContents.openDevTools();
    win.maximize();
    win.loadURL("http://localhost:9000");
}

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
