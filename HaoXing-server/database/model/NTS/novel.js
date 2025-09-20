/**
 * @description 小说数据模型
 */

const seq = require('../../seq');
const { INTEGER, BOOLEAN, STRING } = require('../../types');

const Collect = seq.define('novel', {
    soundBookId: {
        type: INTEGER,
        allowNull: true,
        comment: '有声书 ID'
    },
    novelName: {
        type: STRING,
        allowNull: false,
        comment: '小说名称'
    },
    novelCapter: {
        type: INTEGER,
        allowNull: false,
        comment: '小说章节'
    },
    novelCapterID: {
        type: INTEGER,
        allowNull: false,
        comment: '小说章节ID'
    },
    novelCapterContentUrl: {
        type: STRING,
        allowNull: false,
        comment: '小说章节内容URL'
    },
    novelImage: {
        type: STRING,
        allowNull: false,
        comment: '小说封面'
    }
});

module.exports = Collect;