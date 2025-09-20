/**
 * @description 数据模型入口文件
 */

const Users = require('./Users');
const SoundBook = require('./NTS/SoundBook');
const Collect = require('./NTS/Collect');
const Comment = require('./NTS/Comment');
const Like = require('./NTS/Like');
const Reply = require('./NTS/Reply');
const Administrator = require('./Administrator');
const recommendSoundBook = require('./NTS/recommendSoundBook');
const Novel = require('./NTS/novel');

// 外键关联
// 一个用户可以有多个笔记
Users.hasMany(SoundBook, {
    foreignKey: 'usersid'
});
// 一个笔记只能属于一个用户
SoundBook.belongsTo(Users, {
    foreignKey: 'usersid'
});

// 一个用户可以有多个评论
Users.hasMany(Comment, {
    foreignKey: 'usersid'
});
// 一个评论只能属于一个用户
Comment.belongsTo(Users, {
    foreignKey: 'usersid'
});

// 一个用户可以有多个回复
Users.hasMany(Reply, {
    foreignKey: 'usersid'
});
// 一个回复只能属于一个用户
Reply.belongsTo(Users, {
    foreignKey: 'usersid'
});

// 一个笔记可以有多个评论
SoundBook.hasMany(Comment, {
    foreignKey: 'soundBookId'
});
// 一个评论只能属于一个笔记
Comment.belongsTo(SoundBook, {
    foreignKey: 'soundBookId'
});

// 一个评论可以有多个回复
Comment.hasMany(Reply, {
    foreignKey: 'commentId'
});
// 一个回复只能属于一个评论
Reply.belongsTo(Comment, {
    foreignKey: 'commentId'
});

// 一个笔记可以有多个收藏
SoundBook.hasMany(Collect, {
    foreignKey: 'soundBookId'
});
// 一个收藏只能属于一个笔记
Collect.belongsTo(SoundBook, {
    foreignKey: 'soundBookId'
});
// 一个用户可以有多个收藏
Users.hasMany(Collect, {
    foreignKey: 'usersid'
});
// 一个收藏只能属于一个用户
Collect.belongsTo(Users, {
    foreignKey: 'usersid'
});
// 一个笔记可以有多个点赞
SoundBook.hasMany(Like, {
    foreignKey: 'soundBookId'
});
// 一个点赞只能属于一个笔记
Like.belongsTo(SoundBook, {
    foreignKey: 'soundBookId'
});
// 一个用户可以有多个点赞
Users.hasMany(Like, {
    foreignKey: 'usersid'
});
// 一个点赞只能属于一个用户
Like.belongsTo(Users, {
    foreignKey: 'usersid'
});
// 一个管理员用户可以有多个推荐
Administrator.hasMany(recommendSoundBook, {
    foreignKey: 'adminId'
});

// 一个推荐只能属于一个管理员用户
recommendSoundBook.belongsTo(Administrator, {
    foreignKey: 'adminId'
});
// 一个笔记只能有一个推荐
SoundBook.hasOne(recommendSoundBook, {
    foreignKey: 'soundBookId'
});
// 一个推荐只能属于一个笔记
recommendSoundBook.belongsTo(SoundBook, {
    foreignKey: 'soundBookId'
});
// 一个小说的一章只有一个有声书
Novel.hasOne(SoundBook, {
    foreignKey: 'soundBookId'
});
// 一个有声书只有一章小说
SoundBook.belongsTo(Novel, {
    foreignKey: 'soundBookId'
});


module.exports = {
    Users,
    SoundBook,
    Collect,
    Comment,
    Like,
    Reply,
    Administrator,
    recommendSoundBook,
    Novel
}