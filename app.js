const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');
const qs = require('querystring');

const index_page = fs.readFileSync('./index.ejs', 'utf8');
const login_page = fs.readFileSync('./login.ejs', 'utf8');

const max_num = 10; // 最大保管数
const filename = 'mydata.txt'; // データファイル名
let message_data; // データ
readFromFile(filename);

let server = http.createServer(getFromClient);

server.listen(3000);
console.log('Server start!');

// ここまでメインプログラム

// createServerの処理
function getFromClient(request, response) {
    let url_parts = url.parse(request.url, true);
    switch (url_parts.pathname) {
        case '/': // トップページ(メッセージボード)
            response_index(request, response);
            break;

        case '/login': // ログインページ
            response_login(request, response);
            break;

        case '/mydata': // mydata.txt をプレーンテキストで表示
            response_mydata(request, response);
            break;

        default:
            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.end('no page...');
            break;
    }
}

// loginのアクセス処理
function response_login(request, response) {
    let content = ejs.render(login_page, {});
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(content);
    response.end();
}

// indexのアクセス処理
function response_index(request, response) {
    if (request.method == 'POST') {
        let body = '';
        request.on('data', function (data) {
            body += data;
        });
        request.on('end', function () {
            let data = qs.parse(body);
            addToData(data.id, data.msg, filename, request);
            write_index(request, response);
        });
    } else {
        write_index(request, response);
    }
}

// /mydata のアクセス処理
function response_mydata(request, response) {
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            response.writeHead(500, { 'Content-Type': 'text/plain' });
            response.end('Error reading file.');
        } else {
            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.end(data); // ファイルの中身をそのまま返す
        }
    });
}

// indexのページ作成
function write_index(request, response) {
    let msg = "※何かメッセージを書いてください。";
    let content = ejs.render(index_page, {
        title: 'Index',
        content: msg,
        data: message_data,
        filename: 'data_item'
    });
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(content);
    response.end();
}

// テキストファイルをダウンロード
function readFromFile(fname) {
    fs.readFile(fname, 'utf8', (err, data) => {
        if (err) {
            console.log('Error reading file:', err);
            message_data = [];
        } else {
            message_data = data.split('\n').filter(line => line !== '');
        }
    });
}

// データを更新
function addToData(id, msg, fname, request) {
    let obj = { 'id': id, 'msg': msg };
    let obj_str = JSON.stringify(obj);
    console.log('add data: ' + obj_str);
    message_data.unshift(obj_str);
    if (message_data.length > max_num) {
        message_data.pop();
    }
    saveToFile(fname);
}

// データを保存
function saveToFile(fname) {
    let data_str = message_data.join('\n');
    fs.writeFile(fname, data_str, (err) => {
        if (err) { throw err; }
    });
}
