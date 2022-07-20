let solution = "0";
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

function numericPress(btn) {
    if(solution == 0) {
        displayValue(btn);
        solution = btn;
    } else {
        if(isNaN(operandA)) {
            solution += btn;
        } else {
            solution = btn;
        }
        displayValue(solution);
    }
}

function btnPress(e) {
    const btn = e.target.textContent;

    // NOTE: CURRENTLY LIMITING THE "LENGTH" OF OPERANDS TO 4 E.G. 1000
    if (isNumeric(btn) && solution.length < 4) {
        numericPress(btn);
    } else if (btn == "AC") {
        displayValue("0");
        solution = "0";
    } else if (btn == "=") {
        operandB = parseInt(solution);
        solution = operate(operandA, operandB, operator).toString();
        displayValue(solution);
        console.log(`${operandA} ${operator} = ${operandB}`);
    }  else if (btn == ".") {
        alert(btn + " was pressed");
    } else {
        if (isNaN(operandA)) {
            operandA = parseInt(solution);
            operator = btn;
        } 
        console.log(`${operandA} ${operator}`);
    }   
}

const btns = document.querySelectorAll(".btn");
[...btns].forEach(btn => btn.addEventListener("click", btnPress));

let valueDisplay = document.querySelector("#display-value")
function displayValue(value) {
    valueDisplay.textContent = value;
}