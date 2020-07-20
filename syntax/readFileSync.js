var fs = require('fs');


// 동기적인 방식
/*console.log('A');

var result = fs.readFileSync('syntax/sample.txt','utf-8');
console.log(result);

console.log('C');*/
//ABC



//비동기적인 방식
console.log('A');

fs.readFile('syntax/sample.txt','utf-8', function(err,result){
    console.log(result);
});

console.log('C');

// ACB