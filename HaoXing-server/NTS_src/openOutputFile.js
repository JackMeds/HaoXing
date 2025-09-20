const { shell } = require("electron");
const { app } = require('electron');
// import log from 'electron-log';

// // 保存原始的 console 方法引用
// const originalConsoleLog = console.log;

// // 重写 console.log 方法
// console.log = (...args) => {
//   // 调用原始的 console.log 方法打印日志到控制台
//   originalConsoleLog(...args);

//   // 使用 electron-log 记录器记录日志
//   log.info(...args);
// };

const appPath = app.getAppPath();
var folderPath = ``;
const openOutputFile = (event, text) => {
  // 文件夹的相对路径
  console.log(text.outputFilePath, text.outputFileName)
  if(text.outputFilePath=='./output'){
    //绝对路径
    folderPath = `${appPath}/output/`;
  }else{
    folderPath = `${text.outputFilePath}/`;
  }
  

  // 使用 shell.openPath() 方法打开文件夹
  shell
    .openPath(folderPath)
    .then(() => {
      console.log("文件夹已打开");
    })
    .catch((err) => {
      console.error("无法打开文件夹:", err);
    });
};

module.exports = { openOutputFile };
