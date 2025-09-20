var fs = require("fs");
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

const pureMusic = (event, text) => {
  // // 音乐文件的绝对路径
  // const musicFilePath = `${text.outputFilePath}/pure_${text.outputFileName}`;
  // // console.log(text)
  // // 使用 shell.openPath 方法调用系统默认的应用程序打开音乐文件
  // shell
  //   .openPath(musicFilePath)
  //   .then(() => {
  //     console.log("音乐文件已打开", musicFilePath);
  //   })
  //   .catch((err) => {
  //     console.error("无法打开音乐文件:", err);
  //   });
  const filePath = `${text.outputFilePath}/pure_${text.outputFileName}`;
  console.log("读取音乐文件:", filePath);

  const buffer = fs.readFileSync(filePath);
  const musicData = buffer.toString("base64");
  // 将 Base64 字符串转换为 ArrayBuffer
  const byteCharacters = atob(musicData);
  const byteArrays = [];

  for (let i = 0; i < byteCharacters.length; i++) {
    byteArrays.push(byteCharacters.charCodeAt(i));
  }

  const arrayBuffer = new Uint8Array(byteArrays).buffer;

  // console.log('读取音乐文件成功:', arrayBuffer);
  return arrayBuffer; // 发送音乐数据给渲染进程
};

module.exports = {
  pureMusic,
};
