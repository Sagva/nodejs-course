//npm install -g typescript //command will only work if node js is installed on the pc
//tsc command for compiling all files in the folder with config file in consideration
const num1Elem = document.getElementById('num1') as HTMLInputElement
const num2Elem = document.getElementById('num2') as HTMLInputElement
const buttonElem = document.querySelector('button')! //! = we know that it's not going to be null

//An array is a generic type
//A generic type simply is a type that interacts with another type, eg. array with another type inside it
//const numResults: number[] = [] //number[] - array full of numbers same as write:
const numResults: Array<number> = [] //Array<number> - array full of numbers

const stringResults: string[] = []

type NumOrString = number | string //Type aliases (custom type) allows you to set up your own type alias so you can give a different type a new name.
type Result = { val: number; timestamp: Date}

interface ResultObject { //Interfaces also allow you to define the structure of an object
  val: number; 
  timestamp: Date
} 

function add(num1: NumOrString, num2: NumOrString) {
  //type guard
  if(typeof num1 === 'number' && typeof num2 === 'number') {//if we have 2 numbers

    return num1 + num2;
  }
  else if(typeof num1 === 'string' && typeof num2 === 'string') { //if we have 2 strings

    return num1 + ' ' + num2;
  }
  return +num1 + +num2
}

if(buttonElem) {

  buttonElem.addEventListener('click', ()=> {//Object is possibly 'null' - strict mode in action
    const num1 = num1Elem.value //value always returns a string
    const num2 = num2Elem.value
  
    const result = add(+num1, +num2)
    numResults.push(result as number)

    const stringResult = add(num1, num2)
    stringResults.push(stringResult as string)

    console.log(result)
    console.log(stringResult)
    printResult({val: result as number, timestamp: new Date()})

    console.log(numResults, stringResults)
  })
}

function printResult(resultObj: ResultObject) {
  console.log(resultObj.val)
}


// The promise is a generic type because it eventually resolves to a value,
// and the value it resolves to, that's the generic type for the promise.
// For the array, it was the value stored in the array. For the promise, it's the value the promise resolves to.
//By adding angle brackets after Promise, we can set the type to which promise will resolve to to a string.
// Generic types give you extra type safety when working with more complex types or types that are simply connected to each other.
const myPromise = new Promise<string>((resolve, reject) => {
  setTimeout(() => {
    resolve('It worked!')
  }, 1000 )
})

myPromise.then(result => {
  console.log(`result:`, result.split('w')) //result: (2) ['It ', 'orked!']
})