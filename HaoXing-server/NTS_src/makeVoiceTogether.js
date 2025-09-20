var fs = require("fs");
var path = require("path");
var ffmpeg = require("fluent-ffmpeg");
var ffmpegStatic = require("ffmpeg-static");
var ffprobeStatic = require("ffprobe-static");
// import log from "electron-log";

// // 保存原始的 console 方法引用
// const originalConsoleLog = console.log;

// // 重写 console.log 方法
// console.log = (...args) => {
//   // 调用原始的 console.log 方法打印日志到控制台
//   originalConsoleLog(...args);

//   // 使用 electron-log 记录器记录日志
//   log.info(...args);
// };

// Get the paths to the packaged versions of the binaries we want to use
const ffmpegPath = ffmpegStatic.replace("app.asar", "app.asar.unpacked");
const ffprobePath = ffprobeStatic.path.replace("app.asar", "app.asar.unpacked");

const makeVoiceTogether = async (text, timestamp) => {
  // Tell the ffmpeg package where it can find the needed binaries.
  ffmpeg.setFfmpegPath(ffmpegPath);
  ffmpeg.setFfprobePath(ffprobePath);
  // 目标文件夹路径
  const folderPath = `./output/partvoice/${timestamp}`;
  // const folderPath = `./output/partvoice/1688190245988`
  // 目标时间戳
  // const timestamp = '1688127731751';

  try {
    // 读取目标文件夹中的文件
    const files = fs.readdirSync(folderPath);
    console.log(`读取目标文件夹中的文件:${files}`);
    // 过滤具有相同时间戳的文件
    // const filteredFiles = files.filter((file) => {
    //   const extension = path.extname(file)
    //   const basename = path.basename(file, extension)
    //   const parts = basename.split('_')
    //   return parts[2] === timestamp
    // })
    const filteredFiles = files.map((file) => path.join(folderPath, file));

    // 生成文件列表
    // const audioFiles = filteredFiles.map((file) => path.join(folderPath, file))
    const audioFiles = filteredFiles;

    // 输出文件列表
    console.log("相同时间戳的文件列表:");
    console.log(audioFiles);

    const outputFilePath = `./output/final_output.mp3`;

    // 使用 fluent-ffmpeg 进行音频拼接
    await new Promise((resolve, reject) => {
      const ffmpegCommand = ffmpeg();

      for (const audioFile of audioFiles) {
        ffmpegCommand.input(audioFile);
      }

      ffmpegCommand
        .on("error", reject)
        .on("end", resolve)
        .mergeToFile(outputFilePath);
    });

    console.log("音频拼接完成，输出文件路径：", outputFilePath);
    return { code: 201, msg: `音频拼接完成，输出文件路径：${outputFilePath}` };
  } catch (err) {
    console.error("发生错误：", err);
    return { code: 501, msg: `发生错误：${err}` };
  }
};

module.exports = { makeVoiceTogether };
