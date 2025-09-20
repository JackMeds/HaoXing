//MYSQL链接配置
let MYSQL_CONF = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || '123456',
    port: process.env.DB_PORT || '3306',
    database: process.env.DB_NAME || 'my_db',
}
// if (isProd) {
//     MYSQL_CONF = {
//         //线上的mysql配置
//         host: '8.130.39.153',
//         user: 'root',
//         password: 'Hedaye123',
//         port: '3306',
//         database: 'astronomy_database',
//     }
// }
module.exports = {
    MYSQL_CONF
};