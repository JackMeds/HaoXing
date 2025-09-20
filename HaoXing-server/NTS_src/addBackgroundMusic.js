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

const addBackgroundMusic = (msg) => {
  // Tell the ffmpeg package where it can find the needed binaries.
  ffmpeg.setFfmpegPath(ffmpegPath);
  ffmpeg.setFfprobePath(ffprobePath);
  var backgroundMusicPath = msg.backgroundMusicPath;
  var outputFilePath = `${msg.outputFilePath}/${msg.outputFileName}`;
  var inputFilePath = `${msg.outputFilePath}/pure_${msg.outputFileName}`;
  var duration = 0;
  // 获取原音频的时长
  ffmpeg.ffprobe(inputFilePath, (err, metadata) => {
    if (err) {
      console.error("Error getting audio duration:", err);
      return;
    }

    duration = metadata.format.duration;
    console.log("音频时长：", duration);
  });

  ffmpeg(inputFilePath)
    .input(backgroundMusicPath)
    .inputOptions("-vn") // 只处理音频流
    .complexFilter([
      "[0:a]volume=1.0[a1]", // 调整原始音频的音量
      "[1:a]volume=0.5[a2]", // 调整背景音乐的音量
      "[a1][a2]amix=inputs=2:duration=longest", // 合并原始音频和背景音乐
    ])
    .outputOptions("-c:v copy") // 保持视频流不变
    .outputOptions("-map 0:a") // 保持原始音频流
    .output(outputFilePath)
    .on("end", () => {
      console.log("背景音乐添加完成。");
    })
    .on("error", (err) => {
      console.error("背景音乐添加时发生错误:", err);
    })
    .run();
};

module.exports = {
  addBackgroundMusic: addBackgroundMusic,
};
