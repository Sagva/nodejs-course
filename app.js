"use strict";
//npm install -g typescript //command will only work if node js is installed on the pc
//tsc app.ts - command for starting the script => will complile the code to js and insert the app.js file in the root folder
const num1Elem = document.getElementById('num1');
const num2Elem = document.getElementById('num2');
const buttonElem = document.querySelector('button');
function add(num1, num2) {
    return num1 + num2;
}
if (buttonElem) {
    buttonElem.addEventListener('click', () => {
        const num1 = num1Elem.value; //value always returns a string
        const num2 = num2Elem.value;
        const result = add(+num1, +num2);
        console.log(result);
    });
}
console.log(add(1, 6));
// console.log(add('1', '6')); error , args are strings, func expects numbers
