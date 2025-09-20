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
    // console.log(result);
    console.log('------------------------------------------------------------\n\n');
    res.send(result);
  });
})

router.post('/list', (req, res) => {
  console.log(req.body.sous)
  const keyword = req.body.sous
  const ssql = `SELECT * FROM users WHERE username LIKE '%${keyword}%'`
  pool.query(ssql, (err, results) => {
    if (err) throw err
    {
      console.log(results)
      res.send(results)
    }
  })
})

router.post('/upd/:userid', (req, res, next) => {
  pool.getConnection(function (err, connection) {
    if (err) {
      console.log(err);
      return;
    }
    var modSql = 'UPDATE users SET username = ?,sex=?,tel=? WHERE userid = ?';
    var modSqlParams = [req.body.username, req.body.sex, req.body.tel, req.body.userid];
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

router.post('/del/:userid', (req, res, next) => {
  pool.getConnection(function (err, connection) {
    if (err) {
      console.log(err);
      return;
    }
    var delSql = 'DELETE FROM users where userid=?';
    var ddddd = [req.params.userid];
    connection.query(delSql, ddddd, function (err, result) {
      if (err) {
        console.log('[DELETE ERROR] - ', err.message);
        return;
      }
    });
  })
})



module.exports = router;
