var number = [1,2,33,444];
var i = 0;
var total = 0;

while(i< 6){
    console.log(number[i]);
    if(number[i] === undefined){
        i++;
    }
    else{
        total = total + number[i];
        i++;
    }
}
console.log(`${total}`);
