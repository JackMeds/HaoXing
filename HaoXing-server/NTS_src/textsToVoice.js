var { readForMe } = require('./textToSpeach/index');
var fs = require('fs/promises');
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

async function processFiles(fileNames) {
  console.log('开始处理文件列表' + fileNames);

  // 创建一个存储所有处理文件的 promise 的数组
  const promises = fileNames.map(async (fileName, i) => {
    const voice = extractVoiceFromFileName(fileName); // 提取文件名中的 voice
    const timestampRegex = /_(\d+)\.txt$/;
    const match = fileName.match(timestampRegex);
    const file = await fs.readFile(fileName);
    const outputPath = `output/partvoice/${match[1]}/${i}_${voice}_${match[1]}.mp3`; // 生成唯一的输出文件名

    await fs.mkdir(`output/partvoice/${match[1]}`, { recursive: true, mode: 0o777 });

    return await readForMe({
      file,
      mimeType: 'text/plain',
      format: 'mp3',
      out: outputPath,
      voice,
      chunkSize: 20000
    }).then(() => {
      console.log(`文件 ${fileName} 处理完成，输出文件路径：${outputPath}`);
    }).catch((err) => {
      console.error(`文件 ${fileName} 处理失败，错误信息：${err}`);
    });
  });

  // 等待所有文件处理完成
  await Promise.all(promises);
}


// 提取文件名中的 voice
function extractVoiceFromFileName(fileName) {
  // 假设文件名的格式为 ".{index}_{voice}_{timestamp}.txt"
  const match = fileName.match(/\.(\d+)_(.*?)_\d+\.txt$/);
  if (match && match[2]) {
    return match[2];
  }
  return null;
}

module.exports = {
  processFiles
};
