const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    let name = req.query.name;
    let mail = req.query.mail;
    let data = {
        title: 'Hello!',
        content: 'あなたの名前は、' + name + '。<br>' +
        'メールアドレスは、' + mail + 'です。'
    };
    res.render('hello', data);
});

module.exports = router;