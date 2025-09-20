/**
 * @description 用户数据模型
 */

const seq = require('../seq');
const { STRING, DECIMAL, TEXT } = require('../types');

//users
const Users = seq.define('users', {
    username: {
        type: STRING,
        allowNull: false,
        unique: true,
        comment: '用户名，唯一'
    },
    password: {
        type: TEXT,
        allowNull: false,
        comment: '密码'
    },
    sex: {
        type: DECIMAL,
        allowNull: false,
        defaultValue: 3,
        comment: '性别（1 男性，2 女性，3 保密）'
    },
    tel: {
        type: STRING,
        comment: '手机号'
    }
});

module.exports = Users;