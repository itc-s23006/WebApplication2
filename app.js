let data = {
    'Taro': '09-999-999',
    'Hanako': '080-888-888',
    'Sachiko': '070-777-777',
    'Ichiro': '060-666-666'
}
const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');
const qs = require('querystring');

const index_page = fs.readFileSync('./index.ejs', 'utf8');
const other_page = fs.readFileSync('./other.ejs', 'utf8');
const style_css = fs.readFileSync('./style.css', 'utf8');

let server = http.createServer(getFromClient);

server.listen(3000);
console.log('Server start!');

// メインプログラムの処理

// createServerの処理
function getFromClient(request, response) {
    let url_parts = url.parse(request.url, true);
    switch (url_parts.pathname) {
        case '/':
            response_index(request, response);
            break;

        case '/other':
            response_other(request, response);
            break;

        case '/style.css':
            response.writeHead(200, { 'Content-Type': 'text/css' });
            response.write(style_css);
            response.end();
            break;

        default:
            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.end('no page...');
            break;
    }
}

// Indexページの処理
function response_index(request, response) {
    let msg = "これはIndexページです。";
    let content = ejs.render(index_page, {
        title: "Index",
        content: msg,
        data: data
    });
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(content);
    response.end();
}

// Otherページの処理
function response_other(request, response) {
    let msg = "これはOtherページです。";

    if (request.method == 'POST') {
        let body = '';

        // POSTデータを受信
        request.on('data', (data) => {
            body += data;
        });

        // データ受信完了後に処理
        request.on('end', () => {
            let post_data = qs.parse(body);
            msg += 'あなたは、「' + post_data.msg + '」と書きました。';
            let content = ejs.render(other_page, {
                title: "Other",
                content: msg
            });
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(content);
            response.end();
        });

    } else {
        let content = ejs.render(other_page, {
            title: "Other",
            content: msg
        });
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(content);
        response.end();
    }
}
