/**
 * @description sequelize 同步数据库
 */
const seq = require('./seq');

require('./model/index');

// 测试连接
seq.authenticate().then(() => {
    console.log('ok');
}).catch((err) => {
    console.log(err);
})

//以下两个代码块只能执行一个
//此文件使用方法，在该文件目录下执行 node sync.js

// 执行同步但删除原有表,重新建表，通常用于创建表的环节
seq.sync({ force: true }).then(() => {
    console.log('sync ok');
    process.exit();
});

// //执行同步但不删除原有表,通常用于更新表的环节
// seq.sync().then(() => {
//     console.log('sync ok');
//     process.exit();
// });