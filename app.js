//npm install -g typescript //command will only work if node js is installed on the pc
//tsc app.ts - command for starting the script => will complile the code to js and insert the app.js file in the root folder
var num1Elem = document.getElementById('num1');
var num2Elem = document.getElementById('num2');
var buttonElem = document.querySelector('button');
function add(num1, num2) {
    return num1 + num2;
}
buttonElem.addEventListener('click', function () {
    var num1 = num1Elem.value; //value always returns a string
    var num2 = num2Elem.value;
    var result = add(+num1, +num2);
    console.log(result);
});
console.log(add(1, 6));
// console.log(add('1', '6')); error , args are strings, func expects numbers
