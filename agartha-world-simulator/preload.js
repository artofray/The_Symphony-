const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('agarthaAPI', {
  onStats: (cb) => {
    const wrapped = (_event, payload) => cb(payload);
    ipcRenderer.on('agartha:stats', wrapped);
    return () => ipcRenderer.removeListener('agartha:stats', wrapped);
  },
  getTarget: () => ipcRenderer.invoke('agartha:get-target'),
  getBaseline: () => ipcRenderer.invoke('agartha:get-baseline')
});
