const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

const DEFAULT_TARGET = process.env.AGARTHA_CODE_PATH || path.resolve(__dirname, '..');
const CODE_EXTENSIONS = new Set(['.js', '.ts', '.tsx', '.jsx', '.json', '.md', '.css', '.html', '.yml', '.yaml']);

let win = null;
let statsInterval = null;
let baseline = { files: 0, lines: 0, bytes: 0 };

function countCodeTree(root) {
  let files = 0;
  let lines = 0;
  let bytes = 0;

  const stack = [root];
  while (stack.length > 0) {
    const current = stack.pop();
    let entries = [];
    try {
      entries = fs.readdirSync(current, { withFileTypes: true });
    } catch {
      continue;
    }

    for (const entry of entries) {
      if (entry.name === 'node_modules' || entry.name === '.git' || entry.name.startsWith('.runtime')) continue;
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(full);
      } else {
        const ext = path.extname(entry.name).toLowerCase();
        if (!CODE_EXTENSIONS.has(ext)) continue;
        files += 1;
        try {
          const buf = fs.readFileSync(full);
          bytes += buf.length;
          const text = buf.toString('utf8');
          lines += text.split('\n').length;
        } catch {
          // ignore unreadable files
        }
      }
    }
  }

  return { files, lines, bytes };
}

function emitStats() {
  if (!win || win.isDestroyed()) return;
  const now = countCodeTree(DEFAULT_TARGET);
  const deltaLines = Math.max(0, now.lines - baseline.lines);
  const deltaFiles = Math.max(0, now.files - baseline.files);
  const deltaBytes = Math.max(0, now.bytes - baseline.bytes);
  win.webContents.send('agartha:stats', {
    now,
    delta: { lines: deltaLines, files: deltaFiles, bytes: deltaBytes },
    target: DEFAULT_TARGET,
    ts: Date.now()
  });
  baseline = now;
}

function createWindow() {
  win = new BrowserWindow({
    width: 1440,
    height: 900,
    backgroundColor: '#02060f',
    autoHideMenuBar: true,
    title: 'Agartha World Simulator',
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile(path.join(__dirname, 'renderer', 'index.html'));
  baseline = countCodeTree(DEFAULT_TARGET);
  statsInterval = setInterval(emitStats, 2000);
  emitStats();

  win.on('closed', () => {
    win = null;
  });
}

ipcMain.handle('agartha:get-target', () => DEFAULT_TARGET);
ipcMain.handle('agartha:get-baseline', () => baseline);

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (statsInterval) clearInterval(statsInterval);
  if (process.platform !== 'darwin') app.quit();
});
