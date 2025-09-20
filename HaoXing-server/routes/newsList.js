var express = require('express');
var router = express.Router();
var pool = require("../dao/pool")

router.get("/chapter", (req, res) => {
  var sql = 'SELECT * FROM chapter';
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

router.get("/", (req, res) => {
    var sql = 'SELECT * FROM yglist';
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
  
  router.get("/:id", (req, res) => {
    var sql = 'SELECT * FROM yglist JOIN tag ON yglist.id = tag.id;';
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

  // 名称查询
router.post('/list', (req, res) => {
    console.log(req.body.sous)
    const keyword = req.body.sous
    const ssql = `SELECT * FROM yglist WHERE title LIKE '%${keyword}%'`
    pool.query(ssql, (err, results) => {
      if (err) throw err
      {
        console.log(results)
      res.send(results)
      }
    })
  })

// id查询
  router.post('/list1', (req, res) => {
    console.log(req.body.sous)
    // const keyword = req.body.sous
    const ssql = `SELECT * FROM yglist WHERE id = yglist.id`
    pool.query(ssql, (err, results) => {
      if (err) throw err
      {
        console.log(results)
      res.send(results)
      }
    })
  })

router.post('/upd/:id', (req, res, next) => {
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log(err);
            return;
        }
        var modSql = 'UPDATE yglist SET title = ?,detail = ?,time=? WHERE Id = ?';
        var modSqlParams = [req.body.title,req.body.detail,req.body.time,req.body.id];
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

router.post('/del/:id', (req, res, next) => {
  pool.getConnection(function (err, connection) {
      if (err) {
          console.log(err);
          return;
      }
      var delSql = 'DELETE FROM yglist where id=?';
      var ddddd = [req.params.id];
      connection.query(delSql, ddddd, function (err, result) {
          if (err) {
              console.log('[DELETE ERROR] - ', err.message);
              return;
          }
      });
  })
})

router.post('/add', (req, res, next) => {
    pool.query("select * from yglist where title=?",
    [req.body.title],
      function (err,result, fields) {
          if (result.length > 0) {
            res.status(200).send({
              code:0
            })
          }else {
            let addSql = 'INSERT INTO yglist(title,detail,time) VALUES(?,?,?)';
            let addSqlParams = [req.body.title,req.body.detail,req.body.time];
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
module.exports = router;
