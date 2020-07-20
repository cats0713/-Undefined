var http = require('http');
var fs = require('fs');
var url = require('url');



var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var title = queryData.id;
  var passname = url.parse(_url, true).pathname;

  if (passname === '/') {
    if (queryData.id === undefined) {
      fs.readdir('./data', function (error, filelist) {


        var title = 'Welcome';
        var dis = 'hello node.js';

        //파일리스트 자동으로 가져오기
        var list = '<ul>';
        var i = 0;

        while (i < filelist.length) {
          list = list + `<li><a href="?id=${filelist[i]}">${filelist[i]}</a><li>`;
          i++;

        }
        var template =
          `
        <!doctype html>
        <html>
        <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
          <ul>
            ${list}
          </ul>
          <h2> ${title}</h2>
          <p>${dis}</p>
          </body>
          </html> `;
        response.writeHead(200);
        response.end(template);
      });
    }

    else {
      fs.readdir('./data', function (error, filelist) {
        fs.readFile(`data/${queryData.id}`, 'utf8', function (err, dis) {
          var template = `
        <!doctype html>
        <html>
        <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
          <ul>
            <li><a href="?id=html">HTML</a></li>
            <li><a href="?id=css">CSS</a></li>
            <li><a href="?id=javascript">JavaScript</a></li>
            <li><a href="?id=cc">cc</a></li>
          </ul>
          <h2> ${title}</h2>
          <p>${dis}</p>
          </body>
          </html> `;
          response.writeHead(200);
          response.end(template);
        });
    });
  }
  }

  else {
    response.writeHead(404);
    response.end('not found');
  }


});

app.listen(3000);