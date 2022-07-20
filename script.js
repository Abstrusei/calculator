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

function isNumeric(num){
    return !isNaN(num)
}

function numericPress(btn) {
    if(solution == 0) {
        displayValue(btn);
        solution = btn;
    } else {
        solution += btn;
        displayValue(solution);
    }
}

function btnPress(e) {
    const btn = e.target.textContent;

    // Numeric button pressed
    if (isNumeric(btn) && solution.length < 4) {
        numericPress(btn);
    }

    // Clear button pressed
    if(btn == "AC") {
        displayValue("0");
        solution = "0";
    }
    // alert(num + " pressed");
}

const btns = document.querySelectorAll(".btn");
[...btns].forEach(btn => btn.addEventListener("click", btnPress));

let valueDisplay = document.querySelector("#display-value")
function displayValue(value) {
    valueDisplay.textContent = value;
}