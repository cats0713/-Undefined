var fs = require('fs');

fs.readFile('text.txt', 'utf8', function (err, data) {
    console.log(data);
});
