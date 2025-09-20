const MsEdgeTTS = require('msedge-tts').MsEdgeTTS;
const OUTPUT_FORMAT = require('msedge-tts').OUTPUT_FORMAT;
const dialog = require('electron').dialog;
const readForMe = require('./textToSpeach/readForMe').readForMe;
const fs = require('fs/promises');
// const log = require('electron-log');

// // 保存原始的 console 方法引用
// const originalConsoleLog = console.log;

// // 重写 console.log 方法
// console.log = (...args) => {
//   // 调用原始的 console.log 方法打印日志到控制台
//   originalConsoleLog(...args);

//   // 使用 electron-log 记录器记录日志
//   log.info(...args);
// };


module.exports = {
  Text2Voice: function(event, text) {
    return fs.readFile('README.txt')
      .then(function(file) {
        return readForMe({
          file: file,
          mimeType: 'text/plain',
          format: 'mp3',
          out: 'output2.mp3',
          voice: 'zh-CN-Yunxia',
          chunkSize: 200000
        });
      });
  },

  handleFileOpen: function() {
    return dialog.showOpenDialog({})
      .then(function(result) {
        if (!result.canceled) {
          return result.filePaths[0];
        }
      });
  }
};
