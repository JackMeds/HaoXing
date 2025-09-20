
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

const textToJson = (msg) => {

  // // 使用cheerio加载HTML
  // console.log(msg.zero)
  // const $ = cheerio.load(msg.text)
  // const zero = msg.zero
  // // // 使用cheerio加载HTML
  // // const $ = cheerio.load(html.text)
  // // const zero = html.zero
  // // 选择要提取的元素并转换为JSON格式
  // var result = []
  // $('p').each((index, element) => {
  //   const $element = $(element);
  //   const text = $element.text().trim();
  //   const style = $element.find('span').attr('style');
  //   const voice = extractVoice(style) || zero;

  //   result.push({
  //     text: text,
  //     voice: voice
  //   });
  // });
  console.log(msg)
  // const zero = msg.zero;
  // const result = [];
  const timestamp = new Date().getTime();
 // 获取当前时间的时间戳（东八区时间）

  // // 遍历每个段落对象
  // msg.text.forEach((paragraph) => {
  //   const paragraphText = [];

  //   // 遍历段落的子元素
  //   paragraph.children.forEach((child) => {
  //     const text = child.text;
  //     const bgColor = child.bgColor;
  //     const voice = extractVoice(bgColor) || zero;

  //     paragraphText.push({
  //       text: text,
  //       voice: voice
  //     });
  //   });

  //   result.push(...paragraphText);
  // });

  // // 添加结束标志
  // result.push({
  //   text: '到此结束',
  //   voice: zero
  // });

  // // 将结果转换为JSON字符串
  // const json = JSON.stringify(result, null, 2)
  // console.log(result)
  // console.log(json)
  // 将JSON写入文件

  //清空文件夹，有权限问题待解决

  const delfilePath = './output/.hidden/'

  fs.unlink(delfilePath, (err) => {
    if (err) {
      console.error('Failed to delete file:', err)
    } else {
      console.log('File deleted:', delfilePath)
    }
  })
  // //创建隐藏文件夹delete
  const directoryPath = `./output/.hidden/.${timestamp}`

  try {
    fs.mkdirSync(directoryPath, { recursive: true, mode: 0o777 })
    console.log('Directory created:', directoryPath)
  } catch (err) {
    console.error('Failed to create directory:', err)
  }

  // //创建隐藏文件夹
  const directoryPath2 = `./output/partvoice/${timestamp}`

  try {
    fs.mkdirSync(directoryPath2, { recursive: true, mode: 0o777 })
    console.log('Directory created:', directoryPath2)
  } catch (err) {
    console.error('Failed to create directory:', err)
  }

  const filePath = `./output/.hidden/.${timestamp}/` // 隐藏文件路径
  // 遍历JSON数组中的每个对象
  msg.forEach((obj, index) => {
    const { text, voice } = obj
    const fileName = `${filePath}.${index}_${voice}_${timestamp}.txt`
    const fileContent = `${text}\n`

    fs.writeFile(fileName, fileContent, { mode: 0o777 }, (err) => {
      if (err) {
        console.error(`Failed to write file ${fileName}:`, err)
      } else {
        console.log(`File ${fileName} created.`)
      }
    })
  })

  // 辅助函数：从样式属性中提取声音名称
  function extractVoice(style) {
    if (!style) {
      return ''
    }

    // 在这里根据不同的背景颜色（样式）匹配对应的声音名称
    // 例如，匹配 rgb(255, 192, 203) 对应的声音是 "zh-CN-Xiaoxiao"
    // 匹配 rgb(173, 216, 230) 对应的声音是 "zh-CN-Xiaoyi"
    // 以此类推
    // 注意：根据具体需求进行匹配逻辑的编写
    if (style.includes('rgb(255, 192, 203)')) {
      return 'zh-CN-Xiaoxiao'
    } else if (style.includes('rgb(173, 216, 230)')) {
      return 'zh-CN-Xiaoyi'
    } else if (style.includes('rgb(255, 255, 224)')) {
      return 'zh-CN-Yunjian'
    } else if (style.includes('rgb(144, 238, 144)')) {
      return 'zh-CN-Yunxi'
    } else if (style.includes('rgb(152, 251, 152)')) {
      return 'zh-CN-Yunxia'
    } else if (style.includes('rgb(230, 230, 250)')) {
      return 'zh-CN-Yunyang'
    } else if (style.includes('rgb(255, 228, 181)')) {
      return 'zh-HK-HiuGaai'
    } else if (style.includes('rgb(211, 211, 211)')) {
      return 'zh-HK-HiuMaan'
    } else if (style.includes('rgb(240, 230, 140)')) {
      return 'zh-HK-WanLung'
    } else if (style.includes('rgb(224, 255, 255)')) {
      return 'zh-TW-HsiaoChen'
    } else if (style.includes('rgb(240, 255, 240)')) {
      return 'zh-TW-YunJhe'
    } else if (style.includes('rgb(240, 128, 128)')) {
      return 'zh-TW-HsiaoYu'
    }

    return ''
  }
  return {"msg":`Output saved to file: ${filePath}`, "time": timestamp}
}

module.exports = { textToJson };
