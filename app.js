"use strict";
//npm install -g typescript //command will only work if node js is installed on the pc
//tsc command for compiling all files in the folder with config file in consideration
const num1Elem = document.getElementById('num1');
const num2Elem = document.getElementById('num2');
const buttonElem = document.querySelector('button'); //! = we know that it's not going to be null
//An array is a generic type
//A generic type simply is a type that interacts with another type, eg. array with another type inside it
//const numResults: number[] = [] //number[] - array full of numbers same as write:
const numResults = []; //Array<number> - array full of numbers
const stringResults = [];
function add(num1, num2) {
    //type guard
    if (typeof num1 === 'number' && typeof num2 === 'number') { //if we have 2 numbers
        return num1 + num2;
    }
    else if (typeof num1 === 'string' && typeof num2 === 'string') { //if we have 2 strings
        return num1 + ' ' + num2;
    }
    return +num1 + +num2;
}
if (buttonElem) {
    buttonElem.addEventListener('click', () => {
        const num1 = num1Elem.value; //value always returns a string
        const num2 = num2Elem.value;
        const result = add(+num1, +num2);
        numResults.push(result);
        const stringResult = add(num1, num2);
        stringResults.push(stringResult);
        console.log(result);
        console.log(stringResult);
        printResult({ val: result, timestamp: new Date() });
        console.log(numResults, stringResults);
    });
}
function printResult(resultObj) {
    console.log(resultObj.val);
}
// The promise is a generic type because it eventually resolves to a value,
// and the value it resolves to, that's the generic type for the promise.
// For the array, it was the value stored in the array. For the promise, it's the value the promise resolves to.
//By adding angle brackets after Promise, we can set the type to which promise will resolve to to a string.
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('It worked!');
    }, 1000);
});
myPromise.then(result => {
    console.log(`result:`, result.split('w'));
});
