const fs = require('fs');
const multer  = require('multer');
const path = require('path');
const { SoundBook, Like, Collect, Comment } = require('../../database/model/index');

const StoreSoundBook = async (req) => {
    try {
        //如果存在相同的ID文件，删除
        const files = fs.readdirSync('public/SoundBooks');
        files.forEach((file) => {
            const match = file.match(/(.*?)_(\d+)\.mp3$/);
            if (match && match[1] == req.novelName) {
                fs.unlinkSync(`public/SoundBooks/${file}`);
            }
        });
        // 复制final_output.mp3到public目录下的SoundBooks目录，并改名为时间戳.mp3
        fs.copyFileSync(`output/final_output.mp3`, `public/SoundBooks/${req.novelName}_${req.timestamp}.mp3`);
        // 生成0到3之间的随机数，用于随机选择图片
        const imgNum = Math.floor(Math.random() * 4);
        // 将有声小说信息存入数据库
        await SoundBook.create({
            userid: req.userid,
            title: req.novelName,
            content: `SoundBooks/${req.novelName}_${req.timestamp}.mp3`,
            img: `/NTS_Images/book${imgNum}.png`
        });
        // 发送消息到渲染进程
        return { code: 201, msg: `处理完成`, data: { timestamp: req.timestamp } }
    } catch (error) {
        console.error('Error:', error)
        // 发送消息到渲染进程
        return { code: 501, msg: `发生错误：${error}` }
    }
}

//find soundbook by novelname
const findSoundBookByNovelName = async (req) => {
    try {
        // 将有声小说信息存入数据库
        const result = await SoundBook.findAll({
            where: {
                title: req.novelName
            }
        });
        let filepath = result[0].content;
        // // 读取文件内容为 Buffer
        // const buffer = fs.readFileSync(filepath);
        // 发送消息到渲染进程
        return { code: 201, msg: `处理完成`, data: filepath }
    } catch (error) {
        console.error('Error:', error)
        // 发送消息到渲染进程
        return { code: 501, msg: `发生错误：${error}` }
    }
}

//find soundbook by userid
const findSoundBookByUserID = async (req) => {
    try {
        // 将有声小说信息存入数据库
        const result = await SoundBook.findAll({
            where: {
                userid: req.userid
            }
        });
        // 发送消息到渲染进程
        return { code: 201, msg: `处理完成`, data: result }
    } catch (error) {
        console.error('Error:', error)
        // 发送消息到渲染进程
        return { code: 501, msg: `发生错误：${error}` }
    }
}

//find soundbook infor by novelName
const findSoundBookInforByNovelName = async (req) => {
    try {
        // 将有声小说信息存入数据库
        const result = await SoundBook.findAll({
            where: {
                title: req.novelName
            }
        });
        // 发送消息到渲染进程
        return { code: 201, msg: `处理完成`, data: result[0] }
    } catch (error) {
        console.error('Error:', error)
        // 发送消息到渲染进程
        return { code: 501, msg: `发生错误：${error}` }
    }
}

//点赞状态和数量查询
async function getLikeStatus({ userId, novelName }) {
    //查询笔记ID
    let soundBookId = await SoundBook.findOne({
        attributes: ["id"],
        where: {
            title: novelName,
        },
    });
    console.log(soundBookId.id)
    console.log(userId)
    const existingLike = await Like.findOne({
        where: {
            usersid: userId,
            soundBookId: soundBookId.id,
        },
    });
    if (existingLike) {
        //查询点赞数量
        const likeCount = await SoundBook.findOne({
            attributes: ["likeCount"],
            where: {
                title: novelName,
            },
        });
        //查询点赞状态
        const isLike = await Like.findOne({
            attributes: ["isLike"],
            where: {
                usersid: userId,
                soundBookId: soundBookId.id,
            },
        });
        console.log(isLike.isLike)
        return {
            likeCount: likeCount.likeCount,
            isLike: isLike.isLike,
            soundBookId: soundBookId.id
        };
    } else {
        //查询点赞数量
        const likeCount = await SoundBook.findOne({
            attributes: ["likeCount"],
            where: {
                title: novelName,
            },
        });
        return {
            likeCount: likeCount.likeCount,
            isLike: false,
            soundBookId: soundBookId.id
        };
    }
}

//点赞SoundBook
const likeSoundBook = async (req) => {
    try {
        console.log(req.likeCount)
        // 增加点赞数
        await SoundBook.update({
            likeCount: req.likeCount + 1
        }, {
            where: {
                title: req.novelName
            }
        });
        // 增加点赞记录
        await Like.create({
            usersid: req.userId,
            soundBookId: req.soundBookId,
            isLike: true,
        });
        // 发送消息到渲染进程
        return { code: 201, msg: `处理完成` }
    } catch (error) {
        console.error('Error:', error)
        // 发送消息到渲染进程
        return { code: 501, msg: `发生错误：${error}` }
    }

}
//取消点赞SoundBook
const dislikeSoundBook = async (req) => {
    console.log('user:' + req)
    try {
        // 减少点赞数
        await SoundBook.update({
            likeCount: req.likeCount - 1
        }, {
            where: {
                title: req.novelName
            }
        });
        // 删除点赞记录
        await Like.destroy({
            where: {
                usersid: req.userId,
                soundBookId: req.soundBookId,
            },
        });
        // 发送消息到渲染进程
        return { code: 201, msg: `处理完成` }
    }
    catch (error) {
        console.error('Error:', error)
        // 发送消息到渲染进程
        return { code: 501, msg: `发生错误：${error}` }
    }
}
//收藏状态和数量查询
async function getCollectStatus({ userId, novelName }) {
    //查询笔记ID
    let soundBookId = await SoundBook.findOne({
        attributes: ["id"],
        where: {
            title: novelName,
        },
    });
    console.log(soundBookId.id)
    console.log(userId)
    const existingCollect = await Collect.findOne({
        where: {
            usersid: userId,
            soundBookId: soundBookId.id,
        },
    });
    if (existingCollect) {
        //查询收藏数量
        const collectCount = await SoundBook.findOne({
            attributes: ["collectCount"],
            where: {
                title: novelName,
            },
        });
        //查询收藏状态
        const isCollect = await Collect.findOne({
            attributes: ["isCollect"],
            where: {
                usersid: userId,
                soundBookId: soundBookId.id,
            },
        });
        console.log(isCollect.isCollect)
        return {
            collectCount: collectCount.collectCount,
            isCollect: isCollect.isCollect,
            soundBookId: soundBookId.id
        };
    } else {
        //查询收藏数量
        const collectCount = await SoundBook.findOne({
            attributes: ["collectCount"],
            where: {
                title: novelName,
            },
        });
        return {
            collectCount: collectCount.collectCount,
            isCollect: false,
            soundBookId: soundBookId.id
        };
    }
}
//收藏SoundBook
const collectSoundBook = async (req) => {
    try {
        // 增加收藏数
        const result = await SoundBook.update({
            collectCount: req.collectCount + 1
        }, {
            where: {
                title: req.novelName
            }
        });
        // 增加收藏记录
        await Collect.create({
            usersid: req.userId,
            soundBookId: req.soundBookId,
            isCollect: true,
        });
        // 发送消息到渲染进程
        return { code: 201, msg: `处理完成` }
    } catch (error) {
        console.error('Error:', error)
        // 发送消息到渲染进程
        return { code: 501, msg: `发生错误：${error}` }
    }
}
//取消收藏SoundBook
const uncollectSoundBook = async (req) => {
    try {
        // 减少收藏数
        await SoundBook.update({
            collectCount: req.collectCount - 1
        }, {
            where: {
                title: req.novelName
            }
        });
        // 删除收藏记录
        await Collect.destroy({
            where: {
                usersid: req.userId,
                soundBookId: req.soundBookId,
            },
        });
        // 发送消息到渲染进程
        return { code: 201, msg: `处理完成` }
    }
    catch (error) {
        console.error('Error:', error)
        // 发送消息到渲染进程
        return { code: 501, msg: `发生错误：${error}` }
    }
}

//get user's collect soundbook
const getUserCollectSoundBook = async (req) => {
    try {
        //找到用户收藏的所有soundbookID
        const soundBookId = await Collect.findAll({
            attributes: ["soundBookId"],
            where: {
                usersid: 1
            }
        });
        console.log(soundBookId)
        // [
        //     collect {
        //       dataValues: { soundBookId: 2 },
        //       _previousDataValues: { soundBookId: 2 },
        //       uniqno: 1,
        //       _changed: Set(0) {},
        //       _options: {
        //         isNewRecord: false,
        //         _schema: null,
        //         _schemaDelimiter: '',
        //         raw: true,
        //         attributes: [Array]
        //       },
        //       isNewRecord: false
        //     },
        //     collect {
        //       dataValues: { soundBookId: 1 },
        //       _previousDataValues: { soundBookId: 1 },
        //       uniqno: 1,
        //       _changed: Set(0) {},
        //       _options: {
        //         isNewRecord: false,
        //         _schema: null,
        //         _schemaDelimiter: '',
        //         raw: true,
        //         attributes: [Array]
        //       },
        //       isNewRecord: false
        //     }
        //   ]
        //找到所有soundbookID对应的soundbook
        const soundBooks = await SoundBook.findAll({
            where: {
                id: soundBookId.map(item => item.soundBookId)
            }
        });
        // 发送消息到渲染进程
        return { code: 201, msg: `处理完成`, data: soundBooks }
    } catch (error) {
        console.error('Error:', error)
        // 发送消息到渲染进程
        return { code: 501, msg: `发生错误：${error}` }
    }

}

//findall soundbook
const findAllSoundBook = async () => {
    try {
        // 将有声小说信息存入数据库
        const result = await SoundBook.findAll({
            attributes: ["id", "userid", "title", "content", "likeCount", "collectCount", "img", "updatedAt"],
        });
        // 发送消息到渲染进程
        return { code: 201, msg: `处理完成`, data: result }
    } catch (error) {
        console.error('Error:', error)
        // 发送消息到渲染进程
        return { code: 501, msg: `发生错误：${error}` }
    }
}

//deleteUserSoundBook
const deleteUserSoundBook = async (req) => {
    try {
        //删除数据库中的soundbook
        await SoundBook.destroy({
            where: {
                title: req.novelName
            }
        });
        //删除soundbook文件
        const files = fs.readdirSync('public/SoundBooks');
        files.forEach((file) => {
            const match = file.match(/(.*?)_(\d+)\.mp3$/);
            if (match && match[1] == req.novelName) {
                fs.unlinkSync(`public/SoundBooks/${file}`);
            }
        });
        // 发送消息到渲染进程
        return { code: 201, msg: `处理完成` }
    } catch (error) {
        console.error('Error:', error)
        // 发送消息到渲染进程
        return { code: 501, msg: `发生错误：${error}` }

    }
}

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads/');
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});

const upload = multer({ storage: storage }).single('image'); // 'image'是表单中文件字段的名字

const updateSoundBookImage = async (req, res) => {
    upload(req, res, async (error) => {
        if (error) {
            return res.status(500).json({
                code: 500,
                msg: "图片上传过程中发生错误",
                data: error.message
            });
        }

        if (!req.file) {
            return res.status(400).json({
                code: 400,
                msg: "请上传图片文件"
            });
        }

        const novelName = req.body.novelName;
        const imagePath = `/uploads/${req.file.filename}`; // 图片路径
        const clientImagePath = `http://localhost:3000${imagePath}`; // 客户端图片路径

        try {
            const result = await SoundBook.update({ img: clientImagePath }, { where: { title: novelName } });
            res.json({
                code: 200,
                msg: "图片上传并更新成功",
                data: result
            });
        } catch (dbError) {
            console.error("数据库更新错误:", dbError);
            res.status(500).json({
                code: 500,
                msg: "数据库更新过程中发生错误",
                data: dbError.message
            });
        }
    });
}

module.exports = {
    StoreSoundBook,
    findSoundBookByNovelName,
    findSoundBookByUserID,
    findSoundBookInforByNovelName,
    getLikeStatus,
    likeSoundBook,
    dislikeSoundBook,
    getCollectStatus,
    collectSoundBook,
    uncollectSoundBook,
    findAllSoundBook,
    getUserCollectSoundBook,
    deleteUserSoundBook,
    updateSoundBookImage
};