//npm install -g typescript //command will only work if node js is installed on the pc
//tsc command for compiling all files in the folder with config file in consideration
const num1Elem = document.getElementById('num1') as HTMLInputElement
const num2Elem = document.getElementById('num2') as HTMLInputElement
const buttonElem = document.querySelector('button')! //! = we know that it's not going to be null

const numResults: number[] = [] //number[] - array full of numbers
const stringResults: string[] = []

function add(num1: number | string, num2: number | string) {
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

function printResult(resultObj: { val: number; timestamp: Date}) {
  console.log(resultObj.val)
}