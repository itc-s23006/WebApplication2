const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    let data = {
        title: 'Hello!',
        content: '何か書いて送信してください。'
    };
    res.render('hello', data);
});

router.post('/post', (req, res, next) => {
    let msg = req.body['message'];
    let data = {
        title: 'Hello!',
        content: 'あなたは、「' + msg + '」と送信しました。'
    };
    res.render('hello', data);
});

module.exports = router;