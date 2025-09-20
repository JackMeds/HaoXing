/**
 * @description comment & reply api 路由
 */


const User = require('../../database/model/Users');
const Comment = require('../../database/model/NTS/Comment');
const Reply = require('../../database/model/NTS/Reply');
const SoundBook = require('../../database/model/NTS/SoundBook');

//查询评论列表
async function getCommentList ({novelName}) {
    let soundBookId = await SoundBook.findOne({
        where: {
            title: novelName
        },
        attributes: ['id']
    });
    const result = await Comment.findAll({
        where: {
            soundBookId: soundBookId.dataValues.id
        },
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Reply,
                attributes: ['id', 'usersid', 'commentId', 'content', 'createdAt'],
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    }
                ]
            }
        ]
    });
    // console.log(result);
    return result;
}

//发布评论
async function createComment ({novelName, usersid, content}) {
    let soundBookId = await SoundBook.findOne({
        where: {
            title: novelName
        },
        attributes: ['id']
    });
    const result = await Comment.create({
        soundBookId: soundBookId.dataValues.id,
        usersid: usersid,
        content: content
    });
    // console.log(result.dataValues);
    return result.dataValues;
}

//发布回复
async function createReply ({commentId, usersid, content}) {
    const result = await Reply.create({
        commentId: commentId,
        usersid: usersid,
        content: content
    });
    // console.log(result.dataValues);
    return result.dataValues;
}

module.exports = {
    createComment,
    createReply,
    getCommentList
};