var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

function templateHTML(title, list, body, control) {
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
    ${control}
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
        var template = templateHTML(title, list, `<h2>${title}</h2>${description}`,
          `<a href="/create">create</a>`);
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
          var template = templateHTML(title, list, `<h2>${title}</h2>${description}`,
            `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`);
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
        <form action="/create_process" method="POST">
    <p><input type="text" name="title" placeholder = "title"></p>
    <p><textarea name ="description" placeholder = "description" ></textarea></p>
    <p><input type="submit" name = "sand" value="전송"></p>
</form>`, ``);
      response.writeHead(200);
      response.end(template);
    })
  }
  else if (pathname === '/create_process') {
    var body = '';
    request.on('data', function (data) { /* 웹브라우저가 post 방식으로 처리할때 데이터가 많은경우 
      무리하게 사용된다 post 데이터가 많을경우 이 함수를 사용하게 하는것이다. 
      특정한 양의 데이터를 수신할때 조각을 내어 수신하는데 callback 함수가 그 조각의 수 만큼 실행된다  */

      body = body + data; //저장해주는 역할을 한다

    });

    request.on('end', function () { //데이터 전송 끝
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;

      fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
        response.writeHead(302, { Location: `?id=${title}` }); //잠시 이동하는 
        response.end('success');
      });
      console.log(post.title);


    });


  }
  else if (pathname === `/update`) {
    fs.readdir('./data', function (error, filelist) {
      fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
        var title = queryData.id;
        var list = templateList(filelist);
        var template = templateHTML(title, list,
          `<form action="/update_process" method="POST">
          <p><input type="text" name="title" placeholder = "title" value="${title}"></p>
          <p><textarea name ="description" placeholder = "description" >${description}</textarea></p>
          <p><input type="submit" name = "sand" value="수정"></p>
      </form>
          `, `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`);
        response.writeHead(200);
        response.end(template);
      });
    });
  }
  else if (pathname === '/update_process') {
    var body = '';
    request.on('data', function (data) {
      body = body + data; //저장해주는 역할을 한다

    });

    request.on('end', function () { //데이터 전송 끝
      var post = qs.parse(body);
      var title = post.title;
      var id = post.id;
      var description = post.description;
      console.log(post);
      fs.rename(`/data/${id}`,`/data/${titile}`, function(err) {
        if ( err ) console.log('ERROR: ' + err);
    });
/*
      fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
        response.writeHead(302, { Location: `?id=${title}` }); //잠시 이동하는 
        response.end('success');
      });
      console.log(post.title);
*/

    });
    }

    else {

    response.writeHead(404); //에러 메세지 표시
    response.end('Not found');
  }



});
app.listen(3000);