var http = require('http');
var fs = require('fs');
var url = require('url');

function templateHTML(title, list, body) {
  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    <a href="/create">create</a>
    ${body}
  </body>
  </html>
  `;
}

function templateList(filelist) {
  var list = '<ul>';
  var i = 0;
  while (i < filelist.length) {
    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`; // 목록을 만드는 중
    i++;
  }
  list = list + '</ul>'; //목록을 최종으로 완성
  return list;
}

var app = http.createServer(function (request, response) { //서버를 만드는 함수
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  

  if (pathname === '/') {
    if (queryData.id === undefined) { // 뒤에 아무것도 없을때
      fs.readdir('./data', function (error, filelist) {
        var title = 'Welcome';
        var description = 'Hello, Node.js';
        var list = templateList(filelist);
        var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
        response.writeHead(200);
        response.end(template);
        console.log(pathname);
      })
    }
    
      else {
              fs.readdir('./data', function (error, filelist) {
                fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
                  var title = queryData.id;
                  var list = templateList(filelist);
                  var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
                  response.writeHead(200);
                  response.end(template);
                });
              });
      }
      
    } 
    else if (pathname === '/create') {
      fs.readdir('./data', function (error, filelist) {
        var title = 'create';
        var list = templateList(filelist);
        var template = templateHTML(title, list, `
        <h2>${title}</h2>
        <form action="http://localhost:3000/process_create" method="POST">
          <p><input type="text" name="text" placeholder="title"></p>
            <p><input type="submit" name="sand" value="전송" placeholder="title"></p>
        </form>` );
          response.writeHead(200);
          response.end(template);
        })
      }
    else {
    
      response.writeHead(404); //에러 메세지 표시
      response.end('Not found');
    }
 
 
 
});
app.listen(3000);