var express = require("express");
var router = express.Router();
var pool = require("../dao/pool");

router.get("/", (req, res) => {
  var sql =
    "SELECT * FROM records join yglist on records.id=yglist.id where userid=?";
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

router.post("/add", (req, res, next) => {
    pool.query(
      "SELECT * FROM records WHERE userid=? AND id=?",
      [req.body.userid, req.body.id],
      function (err, result, fields) {
        if (err) {
          console.log("[QUERY ERROR] - ", err.message);
          res.status(500).send({
            code: -1,
            message: "An error occurred while checking for existing records."
          });
          return;
        }

        if (result.length > 0) {
          // 如果记录存在，则更新createTime字段
          let updateSql = "UPDATE records SET createTime=? WHERE userid=? AND id=?";
          let updateSqlParams = [req.body.createTime, req.body.userid, req.body.id];
          pool.query(updateSql, updateSqlParams, function (err, result) {
            if (err) {
              console.log("[UPDATE ERROR] - ", err.message);
              res.status(500).send({
                code: -1,
                message: "An error occurred while updating record."
              });
              return;
            }
            console.log("--------------------------UPDATE----------------------------");
            console.log(result);
            console.log("-----------------------------------------------------------------\n\n");
            res.status(200).send({
              code: 1,
              message: "Record updated successfully."
            });
          });
        } else {
          // 如果记录不存在，则插入新记录
          let addSql = "INSERT INTO records(userid, id, createTime) VALUES (?, ?, ?)";
          let addSqlParams = [req.body.userid, req.body.id, req.body.createTime];
          pool.query(addSql, addSqlParams, function (err, result) {
            if (err) {
              console.log("[INSERT ERROR] - ", err.message);
              res.status(500).send({
                code: -1,
                message: "An error occurred while inserting record."
              });
              return;
            }
            console.log("--------------------------INSERT----------------------------");
            console.log(result);
            console.log("-----------------------------------------------------------------\n\n");
            res.status(200).send({
              code: 1,
              message: "Record inserted successfully."
            });
          });
        }
      }
    );
});

  module.exports = router;