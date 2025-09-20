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

const readFileList = (data) => {
  const folderPath = `./output/.hidden/.${data}/`;
  const timestampToFind = data;

  return new Promise((resolve, reject) => {
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.error('Failed to read directory:', err);
        reject(err);
        return;
      }

      const result = [];

      files.forEach((file) => {
        const match = file.match(/(\d+)\.txt$/);
        if (match) {
          const fileTimestamp = parseInt(match[1], 10);
          if (fileTimestamp === timestampToFind) {
            const filePath = folderPath + file;
            console.log('Matching file found:', filePath);
            result.push(filePath);
            // 在这里可以进行文件操作，如读取文件内容等
          }
        }
      });

      resolve(result);
    });
  });
};
//按照数字排序readFileList生成的数组
const handleFileList = () => {
  return readFileList()
    .then((result) => {
      var r = result.sort((a, b) => {
        const regex = /\.(\d+)_/;
        const numberA = parseInt(a.match(regex)[1]);
        const numberB = parseInt(b.match(regex)[1]);
        return numberA - numberB;
      });
      // console.log(r);
      return r;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

module.exports = { readFileList };
