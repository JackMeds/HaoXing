var express = require('express');
var router = express.Router();
var pool = require("../dao/pool")
router.get("/", (req, res) => {
  var sql = 'SELECT * FROM users;';
  //查
  pool.query(sql, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      return;
    }

    console.log('--------------------------SELECT----------------------------');
    console.log(result);
    console.log('------------------------------------------------------------\n\n');

    // 将结果中的数值转换为字符串
    result.forEach(row => {
      for (const key in row) {
        if (typeof row[key] === 'number') {
          row[key] = row[key].toFixed(2); // 保留两位小数并转换为字符串
        }
      }
    });

    res.send(result);
  });
});


router.post('/add', (req, res, next) => {
  pool.query("select * from users where username=?",
  [req.body.username],
    function (err,result, fields) {
        if (result!=0) {
          res.status(200).send({
            code:0
          })
        }else {
          let addSql = 'INSERT INTO users(username,password,sex,tel) VALUES(?,?,?,?)';
          let addSqlParams = [req.body.username,req.body.password,req.body.sex,req.body.tel];
          //增
          pool.query(addSql, addSqlParams, function (err, result) {
            if (err) {
              console.log('[INSERT ERROR] - ', err.message);
              return;
            }
            console.log('--------------------------INSERT----------------------------');     
            console.log(result);
            console.log('-----------------------------------------------------------------\n\n');
            res.status(200).send({
              code:1
            })
          });
        }
    })
})

router.get("/:userid", (req, res) => {
  var sql = 'SELECT * FROM users JOIN tag ON users.userid = gouwucar.userid;';
  //查
  pool.query(sql, function (err, result) {
      if (err) {
          console.log('[SELECT ERROR] - ', err.message);
          return;
      }

      console.log('--------------------------SELECT----------------------------');
      console.log(result);
      console.log('------------------------------------------------------------\n\n');
      res.send(result);
  });
})

// 前端修改密码
router.post('/repwd', (req, res, next) => {
  pool.getConnection(function (err, connection) {
    if (err) {
      console.log(err);
      return;
    }
    var modSql = 'UPDATE users SET password = ? WHERE username = ? ';
    var modSqlParams = [req.body.newpwd, req.body.username];
    //改
    connection.query(modSql, modSqlParams, function (err, result) {
      if (err) {
        console.log('[UPDATE ERROR] - ', err.message);
        return;
      }
      console.log('--------------------------UPDATE----------------------------');
      console.log('UPDATE affectedRows', result.affectedRows);
      console.log('-----------------------------------------------------------------\n\n');
      res.send(`更新记录成功${result.affectedRows}`);
    });
  })
})



module.exports = router;
