/*function a(){
    console.log('A');
}*/

var a = function (){ // 함수는 값이다.
    console.log('A');
}

function slow(callback){
    callback();

}

slow(a);