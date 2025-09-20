/**
 * @description 有声书数据模型
 */

const seq = require('../../seq');
const { STRING, TEXT, INTEGER } = require('../../types');

const SoundBook = seq.define('soundBook', {
    userid: {
        type: INTEGER,
        allowNull: false,
        comment: '用户 ID'
    },
    title: {
        type: STRING,
        allowNull: false,
        comment: '有声书标题'
    },
    content: {
        type: TEXT,
        allowNull: false,
        comment: '有声书内容'
    },
    img: {
        type: TEXT,
        allowNull: true,
        comment: '有声书图片'
    },
    likeCount: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '点赞数量'
    },
    collectCount: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '收藏数量'
    },
    commentCount: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '评论数量'
    },
    viewCount: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '浏览数量'
    }
});

module.exports = SoundBook;