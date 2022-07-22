let onscreenValue = "0";
let total = 0;
let operandA;
let operandB;
let operator;
let evaluated = false;

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
    evaluated = false;
    displayValue(onscreenValue);
    resetOperand("a");
    resetOperand("b");
    resetOperator();
}

function numericPress(a) {
    if (!evaluated) {
        if(onscreenValue == "0") {
            onscreenValue = a;
        } else {
            onscreenValue += a;
        }
    } else {
        if(onscreenValue == "0") {
            onscreenValue = a;
        } else {
            onscreenValue += a;
        }
    }
    displayValue(onscreenValue);
}

function operatorPress(pressedOperator) {
    operator = pressedOperator;

    if (!evaluated) {
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
            operandA = total;
            displayValue(total);
    
            resetOperand("b");
        }
        // resetOnscreenValue();
    } 
    resetOnscreenValue();
}

function equalsPress() {
    if(isNumeric(operandA) && isNaN(operandB)) {
        operandB = parseInt(onscreenValue);
        total = operate(total, operandB, operator);
        displayValue(total);

        onscreenValue = total.toString();
        operandA = total;
        evaluated = true;
        resetOperand("b");
    } else  {
        // 5 + 5 + 5 
        // if "=" pressed operandA = 15, operandB = nothing
        operandB = parseInt(onscreenValue);
        total = operate(total, operandB, operator);

        operandA =  total;
        displayValue(total);

        resetOperand("b");
    }
}

function btnPress(e) {
    const btn = e.target.textContent;

    // NOTE: CURRENTLY LIMITING THE "LENGTH" OF OPERANDS TO 4 E.G. 1000
    if (isNumeric(btn)) {
        if (onscreenValue.length < 5) {
            numericPress(btn);
        }
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

