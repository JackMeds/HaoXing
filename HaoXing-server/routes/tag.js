var express = require("express");
var router = express.Router();
var pool = require("../dao/pool");


router.get("/", (req, res) => {
    var sql = 'SELECT * FROM tag;';
    pool.query(sql, function (err, result) {
      if (err) {
        console.log('[SELECT ERROR] - ', err.message);
        res.status(500).send("Internal Server Error");
        return;
      }
  
      console.log('--------------------------SELECT----------------------------');
      console.log(result);
      console.log('------------------------------------------------------------\n\n');
      res.send(result);
    });
  });
  
  router.get("/:shopid", (req, res) => {
    var shopid = req.params.shopid;
    var sql = 'SELECT * FROM shoplist WHERE shoplist.shopid = gouwucar.shopid;';
    pool.query(sql, [shopid], function (err, result) {
      if (err) {
        console.log('[SELECT ERROR] - ', err.message);
        res.status(500).send("Internal Server Error");
        return;
      }
  
      console.log('--------------------------SELECT----------------------------');
      console.log(result);
      console.log('------------------------------------------------------------\n\n');
      res.send(result);
    });
  });

  router.post('/upd/:shopid', (req, res, next) => {
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log(err);
            return;
        }
        var modSql = 'UPDATE shoplist SET shopid=?,num=?,price=?,title=?,`desc`=?,`pic`=?';
        var modSqlParams = [req.body.shopid,req.body.num,req.body.price,req.body.title,req.body.desc, req.body.pic];
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

router.post('/del/:shopid', (req, res, next) => {
  pool.getConnection(function (err, connection) {
      if (err) {
          console.log(err);
          return;
      }
      var delSql = 'DELETE FROM shoplist where shopid=?';
      var ddddd = [req.params.shopid];
      connection.query(delSql, ddddd, function (err, result) {
          if (err) {
              console.log('[DELETE ERROR] - ', err.message);
              return;
          }
      });
  })
})

router.post('/add', (req, res, next) => {
    pool.query("select * from shoplist where desc=?",
    [req.body.desc],
      function (err,result, fields) {
          if (result!=0) {
            res.status(200).send({
              code:0
            })
          }else {
            let addSql = 'INSERT INTO shoplist(shopid, num, price, title, `desc`,`pic`) VALUES(?,?,?,?,?,?)';
            let addSqlParams = [req.body.shopid,req.body.num,req.body.price,req.body.title,req.body.desc, req.body.pic];
            //增
            pool.query(addSql, addSqlParams, function (err, result) {
              if (err) {
                console.log(req.body);
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