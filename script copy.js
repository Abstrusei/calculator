let onscreenValue = "0";
let total = 0;
let operandA;
let operandB;
let operator;

function add(a, b) {
    return a + b; 
}

function subtract(a, b) {
    return a - b; 
}

function multiply(a, b) {
    return a * b; 
}

function divide(a, b) {
    return a/b;
}



function operate(a, b, operator) {
    if (operator == "+") {
        return add(a, b);
    }
    if (operator == "-") {
        return subtract(a, b);
    }
    if (operator == "*") {
        return multiply(a, b);
    }
    if (operator == "/") {
        return divide(a, b);
    }
}

function isNumeric(btn){
    return !isNaN(btn);
}

function resetOperand(operandLetter) {
    if (operandLetter == "a") {
        operandA = undefined;
    } else {
        operandB = undefined;
    }
}

function resetOperator() {
    operator = undefined;
}

function resetOnscreenValue() {
    onscreenValue = "0";
}

function clearCalcualtor() {
    onscreenValue = "0";
    total = 0;
    displayValue(onscreenValue);
    resetOperand("a");
    resetOperand("b");
    resetOperator();
}

function numericPress(a) {
    if(onscreenValue == "0") {
        onscreenValue = a;
        displayValue(onscreenValue);
    } else {
        onscreenValue += a;
        displayValue(onscreenValue);
    }
}

function operatorPress(pressedOperator) {
    if(isNaN(operator) || pressedOperator == operator) {
        
    }
    
    operator = pressedOperator;

    if (!isNumeric(operandA)) {
        // operandA hasn't been filled
        operandA = parseInt(onscreenValue);
        total = parseInt(onscreenValue);
    } else if (isNumeric(operandA) && isNaN(operandB)) {
        // operandA HAS been filled  
        operandB = parseInt(onscreenValue);
        total = operate(total, operandB, operator);
        displayValue(total);
    } else {
         // operandA AND operandB have been filled  
        operandB = parseInt(onscreenValue);
        total = operate(total, operandB, operator);
        displayValue(total);

        resetOperand("b");
    }
    resetOnscreenValue();
}

function equalsPress() {
    if(isNumeric(operandA) && isNaN(operandB)) {
        operandB = parseInt(onscreenValue);
        total = operate(total, operandB, operator);
        displayValue(total);

        resetOperand("b");
    } else {
        operandB = parseInt(onscreenValue);
        total = operate(total, operandB, operator);
        displayValue(total);
    }
    
    // if(isNumeric(operandA) && isNaN(operandB)) {
    //     operandB = parseInt(onscreenValue);
    //     displayValue(operate(operandA, operandB, operator));
    // }

    // if(isNumeric(operandA) && isNumeric(operandB)) {
    //     onscreenValue = operate(operandA, operandB, operator);
    //     displayValue(onscreenValue);
    //     operandA = parseInt(onscreenValue);
    //     resetOperand("b");
    // }
}

/* 
    CASE 1 - 1 operation performed
    -------
    25 entered 
    "+" pressed
        25 = operandA
    75 entered
        75 = operandB
    "=" pressed 
        100 displayed

    CASE 2 - 2 operation performed
    -------
    25 entered 
    "+" pressed
        operandA =25
    75 entered
        operandB = 75
    "+" pressed
        operandA = 75 + 25 = 100 
        100 displayed
    20 entered
    "=" pressed 
        operandB = 20
        value = 100 + 20
        120 displayed
*/


function btnPress(e) {
    const btn = e.target.textContent;

    // NOTE: CURRENTLY LIMITING THE "LENGTH" OF OPERANDS TO 4 E.G. 1000
    if (isNumeric(btn) && onscreenValue.length < 4) {
        numericPress(btn);
    } else if (btn == "AC") {
        clearCalcualtor();
    } else if (btn == "=") {
        equalsPress();
    }  else if (btn == ".") {
        alert(btn + " was pressed");
    } else {
        operatorPress(btn);
    }   
}

const btns = document.querySelectorAll(".btn");
[...btns].forEach(btn => btn.addEventListener("click", btnPress));

let valueDisplay = document.querySelector("#display-value")
function displayValue(value) {
    valueDisplay.textContent = value;
}

