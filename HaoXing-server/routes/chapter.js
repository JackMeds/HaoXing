var express = require("express");
var router = express.Router();
var pool = require("../dao/pool");

router.get("/", (req, res) => {
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