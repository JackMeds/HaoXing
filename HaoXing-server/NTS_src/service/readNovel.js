const fs = require('fs');
const iconv = require('iconv-lite');

//读取小说文件列表
const readFileList = async () => {
    try {
        // 读取文件列表
        const files = fs.readdirSync('public/Novel');
        // console.log(files)
        // 读取文件列表,例子（[凌晨] 交错.txt）
        const fileList = files.map((file, index) => {
            const match = file.match(/\[(.*?)\]\s(.*?)\.txt/)
            // console.log(match)
            if (match) {
                return `[${match[1]}] ${match[2]}`; // Extract the file name without extension
            }
            return null;
        }).filter(Boolean); // Remove null values from the array
        // console.log(fileList)
        // 发送消息到渲染进程
        return { code: 201, msg: `处理完成`, data: fileList }
    } catch (error) {
        console.error('Error:', error)
        // 发送消息到渲染进程
        return { code: 501, msg: `发生错误：${error}` }
    }
}

//req为小说名称,读取小说内容编码格式为gb2312
const readNovel = async (req) => {
    try {
        // 读取文件内容为 Buffer
        const buffer = fs.readFileSync(`public/Novel/${req.novelName}.txt`);

        // 使用 iconv-lite 将 Buffer 从 gb2312 转换为 utf-8 字符串
        const file = iconv.decode(buffer, 'gb2312');
        // 发送消息到渲染进程
        return { code: 201, msg: `处理完成`, data: file }
    } catch (error) {
        console.error('Error:', error)
        // 发送消息到渲染进程
        return { code: 501, msg: `发生错误：${error}` }
    }
}


module.exports = { readFileList, readNovel };