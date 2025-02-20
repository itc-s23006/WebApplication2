const express = require('express');
const router = express.Router();

const sqlite3 = require('sqlite3'); // 追加

// データベースオブジェクトの取得
const db = new sqlite3.Database('mydb2');

// GETアクセスの処理
router.get('/',(req, res, next) => {
  
  db.serialize(() => {
    //レコードをすべて取り出す
    db.all("select * from mydata",(err, rows) => {
      // データベースアクセス完了時の処理
      if (!err) {
        let data = {
          title: 'Hello!',
          content: rows 
        };
        res.render('hello', data);
      }   
    }); 
  }); 
});

module.exports = router;