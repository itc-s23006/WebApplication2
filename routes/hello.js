const express = require('express'); // expressモジュールを読み込み。
const router = express.Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('mydb.db');

router.get('/', (req, res, next) => {
    db.serialize(() => {
        db.all("select * from mydata", (err, rows) => {
            if (!err) {
                let data = {
                    title: 'Hello!',
                    content: rows
                };
                res.redirect('hello', data);
            }
        });
    });
 });  

module.exports = router; // このルーターをモジュールとしてエクスポート。
