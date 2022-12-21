//Our elements
const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

const calculate = {
  '/':(firstNumber, secondNumber) => firstNumber / secondNumber,
  '*':(firstNumber, secondNumber) => firstNumber * secondNumber,
  '+':(firstNumber, secondNumber) => firstNumber + secondNumber,
  '-':(firstNumber, secondNumber) => firstNumber - secondNumber,
  '=':(firstNumber, secondNumber) => secondNumber,
};

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

//Show pressed buttons on display
function sendNumberValue(number){
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    const displayValue = calculatorDisplay.textContent; //save current value to the variable
    calculatorDisplay.textContent = (displayValue === '0' ? number : displayValue + number); //add a number to the string if it's not equal to 0
  }
}

//Add a decimal to current value if there is no decimal
function addDecimal(){
  if (awaitingNextValue) return;
  if (!calculatorDisplay.textContent.includes('.')){ //check for a decimal
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`; //add a decimal at the end of the string
  } 
}

function useOperator(operator){
  const currentValue = Number(calculatorDisplay.textContent);
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;  
    return;
  }
  if (!firstValue){
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }
  awaitingNextValue = true;
  operatorValue = operator;
} 

function resetAll(){
  calculatorDisplay.textContent = '0';
  firstValue = 0;
  operatorValue = '';
  awaitingNextValue = false;
}

//add event listeners to the buttons
inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0){
    inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains('operator')) {
    inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains('decimal')) {
    inputBtn.addEventListener('click', () => addDecimal());
  }
});

clearBtn.addEventListener ('click', resetAll);