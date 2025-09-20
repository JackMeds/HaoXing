var express = require('express');
var router = express.Router();
var pool = require("../dao/pool");



router.post('/add', (req, res) => {
  console.log(req.body);
  res.status(200).send({
    code: 1
  });
  let addSql = 'INSERT INTO courses(id, name, descc, price, count, imgurl) VALUES(0, ?, ?, ?, ?, ?)';
  let addSqlParams = [req.body.name, req.body.desc, req.body.price, req.body.count, req.body.imgurl];
  pool.query(addSql, addSqlParams, function (err, result) {
    if (err) {
      console.log('[INSERT ERROR] - ', err.message);
      return;
    }
    console.log('--------------------------INSERT----------------------------');
    console.log(result);
    console.log('-----------------------------------------------------------------\n\n');
  });
});

router.post('/list', (req, res) => {
  console.log(req.body.sous);
  const keyword = req.body.sous;
  const ssql = `SELECT * FROM courses WHERE name LIKE ?`;
  pool.query(ssql, [`%${keyword}%`], (err, results) => {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      res.status(500).send("Internal Server Error");
      return;
    }
    console.log(results);
    res.send(results);
  });
});

router.post('/gouwucar', (req, res) => {
  console.log(req.body);
  const shopid = req.body.shopid;
  const userid = req.body.userid;
  const ssql = `INSERT INTO gouwucar (userid, shopid, count) VALUES (?, ?, 1)`;
  const sqlParams = [userid, shopid];
  pool.query(ssql, sqlParams, (err, results) => {
    if (err) {
      console.log('[INSERT ERROR] - ', err.message);
      res.status(500).send("Internal Server Error");
      return;
    }
    console.log('[INSERT SUCCESS]');
    console.log(results);
    res.send(results);
  });

});


module.exports = router;