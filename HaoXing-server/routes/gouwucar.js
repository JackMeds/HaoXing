var express = require("express");
var router = express.Router();
var pool = require("../dao/pool");

router.get("/", (req, res) => {
  var sql =
    "SELECT * FROM gouwucar join yglist on gouwucar.shopid=yglist.id where userid=?";
  let SqlParams = [req.query.userid];

  // 查询
  pool.query(sql, SqlParams, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] - ", err.message);
      return;
    }

    console.log("--------------------------SELECT----------------------------");
    console.log(req.query);
    console.log(
      "------------------------------------------------------------\n\n"
    );
    res.send(result);
  });
});

router.get("/hou", (req, res) => {
  var sql =
    "SELECT * FROM gouwucar join yglist on gouwucar.shopid=yglist.id";

  // 查询
  pool.query(sql, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] - ", err.message);
      return;
    }

    console.log("--------------------------SELECT----------------------------");
    console.log(req.query);
    console.log(
      "------------------------------------------------------------\n\n"
    );
    res.send(result);
  });
});

router.post("/add", (req, res, next) => {
  pool.query(
    "select * from gouwucar where userid=?",
    [req.body.userid],
    function (err, result, fields) {
      if (result != 0) {
        res.status(200).send({
          code: 0,
        });
      } else {
        let addSql = "INSERT INTO gouwucar(userid,shopid,count) VALUES(?,?,1)";
        let addSqlParams = [req.body.userid, req.body.shopid, req.body.count];
        //增
        pool.query(addSql, addSqlParams, function (err, result) {
          if (err) {
            console.log("[INSERT ERROR] - ", err.message);
            return;
          }
          console.log(
            "--------------------------INSERT----------------------------"
          );
          console.log(result);
          console.log(
            "-----------------------------------------------------------------\n\n"
          );
          res.status(200).send({
            code: 1,
          });
        });
      }
    }
  );
});

router.post("/del", (req, res, next) => {
  // 删除购物车项的SQL语句
  let deleteSql = "DELETE FROM gouwucar WHERE userid = ? AND shopid = ?";
  pool.query(
    deleteSql,
    [req.body.userid, req.body.shopid],
    function (err, result, fields) {
      if (err) {
        console.log("[DELETE ERROR] - ", err.message);
        res.status(500).send({
          code: -1,
          message: "删除失败",
        });
        return;
      }

      if (result.affectedRows > 0) {
        console.log(
          "--------------------------DELETE----------------------------"
        );
        console.log(result);
        console.log(
          "-----------------------------------------------------------------\n\n"
        );
        res.status(200).send({
          code: 0,
          message: "删除成功",
        });
      } else {
        res.status(200).send({
          code: 1,
          message: (req.body),
          
        });
      }
    }
  );
});

// router.post('/del', (req, res, next) => {
//   pool.getConnection(function (err, connection) {
//       if (err) {
//           console.log(err);
//           return;
//       }
//       var delSql = "DELETE FROM gouwucar WHERE userid = ? AND shopid = ?";
//       var ddddd = [req.body.userid, req.body.shopid];
//       connection.query(delSql, ddddd, function (err, result) {
//           if (err) {
//               console.log('[DELETE ERROR] - ', err.message);
//               return;
//           }else{
//             console.log(req.body)
//           }
//       });
//   })
// })
module.exports = router;
