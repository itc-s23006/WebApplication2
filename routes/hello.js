const express = require('express'); // expressモジュールを読み込み。

const router = express.Router();

router.get('/', (req, res, next) => { // GETリクエストを処理するルート。 
    let msg = '※何か書いて送信して下さい。'; 

    if (req.session.message != undefined) {
        msg = "Last Message: " + req.session.message; // 最後に送信されたメッセージを表示。
    }

    let data = {
        title: 'Hello!', // ページのタイトル
        content: msg     // 画面に表示するメッセージ
    };

    res.render('hello', data); // 'hello'というテンプレートをレンダリングして、データを送信。
});

router.post('/post', (req, res, next) => { // POSTリクエストを処理するルート。

    let msg = req.body['message']; // フォームから送信されたメッセージを取得。

    req.session.message = msg;

    let data = {
        title: 'Hello!', // ページのタイトル
        content: 'Last Message: ' + req.session.message // 最後に送信されたメッセージを表示
    };

    res.render('hello', data); // 'hello'というテンプレートをレンダリングして、データを送信。
});

module.exports = router; // このルーターをモジュールとしてエクスポート。
