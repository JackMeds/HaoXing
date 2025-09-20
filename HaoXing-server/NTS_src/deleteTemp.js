var fs = require('fs');
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

//删除临时文件
const deleteTemp = () => {
  fs.rmdir('./output/.hidden', { recursive: true }, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    //file removed
  });
  fs.rmdir('./output/partvoice', { recursive: true }, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    //file removed
  });
}
module.exports = { deleteTemp };
