var textToJson = require('./textToJson');
var readFileList = require('./readFileList');
var textsToVoice = require('./textsToVoice');
var makeVoiceTogether = require('./makeVoiceTogether');
var addBackgroundMusic = require('./addBackgroundMusic');
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

const myprocess = async (text) => {
  try {
    // 处理文本并获取时间戳
    const timestamp = textToJson.textToJson(text).time

    // 处理文本并获取文本列表
    const readFileListResult = await readFileList.readFileList(timestamp)
    console.log(readFileListResult)

    // 文本列表生成声音文件
    await textsToVoice.processFiles(readFileListResult)

    // 声音列表合成成声音文件
    const result = await makeVoiceTogether.makeVoiceTogether(text, timestamp)
    // console.log(result)
    // // 添加背景音乐
    // let bgmusic = false
    // if(text.backgroundMusicPath!=''){
    //   bgmusic = true
    //   await addBackgroundMusic.addBackgroundMusic(text)
    // } else {
    //   bgmusic = false
    // }
    // 发送消息到渲染进程
    // return { code: 201, msg: `处理完成`, data: { timestamp, result, bgmusic }}
    return { code: 201, msg: `处理完成`, data: { timestamp, result }}
  } catch (error) {
    console.error('Error:', error)
    // 发送消息到渲染进程
    return { code: 501, msg: `发生错误：${error}` }
  }
}

module.exports = { myprocess };
