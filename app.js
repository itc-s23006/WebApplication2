const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const { title } = require('process');

const index_page = fs.readFileSync('./index.ejs', 'utf8');

let server = http.createServer(getFromClient);

server.listen(3000);
console.log('Server start!');

// ここまでメインプログラム========

// createServerの処理
function getFromClient(request, response) {
    let content = ejs.render(index_page, {
        title: "Indexページ",
        content: "これはテンプレートを使ったサンプルページです。"
    });
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(content);
            response.end();
}
