let onscreenValue = "0";
let total = 0;
let operandA = 0;
let operandB;
let operator;
let mostRecentPress;
let equalsPressed = false;

function add(a, b) {return a + b; }

function subtract(a, b) {return a - b; }

function multiply(a, b) {return a * b; }

function divide(a, b) {return a/b;}

function operate(a, b, operator) {
    let result = 0;
    if (operator == "+") result = add(a, b);
    if (operator == "-") result = subtract(a, b);
    if (operator == "*") result = multiply(a, b);
    if (operator == "/") result = divide(a, b);
    return parseFloat(result.toFixed(3));
}

function isNumeric(btn){
    return !isNaN(btn);
}

function resetOperand(operandLetter) {
    if (operandLetter == "a") {
        operandA = 0;
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
    mostRecentPress = undefined;
    onscreenValue = "0";
    total = 0;
    equalsPressed = false;
    displayValue(onscreenValue);
    resetOperand("a");
    resetOperand("b");
    resetOperator();
}

function setOperator(a) {
    operator = a;
}

function numericPress(a) {
    mostRecentPress = "Number";
    if (equalsPressed) {
        clearCalcualtor();
        onscreenValue = a;
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
    let previousMostRecentPress = mostRecentPress;
    mostRecentPress = "operator";
    if(previousMostRecentPress == "operator" || previousMostRecentPress == undefined){
        setOperator(pressedOperator);
        if (operandA == 0) {
            operandA = parseFloat(onscreenValue);
            total = operandA;
        }
    } else if (!equalsPressed) {
        if (operator == undefined) {
            setOperator(pressedOperator);
            if (operandA == 0) {
                operandA = parseFloat(onscreenValue);
                total = operandA;
            } else {
                evaluate();
            }
        } else {
            evaluate();
            setOperator(pressedOperator);
        }
    } else {
        if(pressedOperator != operator) {
            setOperator(pressedOperator);
        }
        equalsPressed = false;
    }
    resetOnscreenValue();
}

function equalsPress() {
    if(isNumeric(operandA)) {
        if (mostRecentPress == "operator") {
            return;
        }
        mostRecentPress = "equals";
        equalsPressed = true;
        evaluate();
    }
}

function evaluate() {
    operandB = parseFloat(onscreenValue);
    total = operate(total, operandB, operator);
    if(isNaN(operandB)) {
        displayValue(total);
        onscreenValue = total.toString();
        operandA = total;
    } else  {
        if (operandB == 0 && operator == "/") {
            clearCalcualtor();
            displayValue("Error");
            return;
        }
        operandA =  total;
        displayValue(total);
    }
    resetOperand("b");
}

function addDecimalPoint() {
    if (!(onscreenValue.includes("."))) {
        onscreenValue += ".";
        displayValue(onscreenValue);
    }
}
 
function btnPress(e) {
    let btn;
    if (e.type == "keydown") {
        btn = e.key;
    } else {
        let elementPressed = e.target
        elementPressed.classList.add("activeBtn");
        btn = elementPressed.textContent;
    }
    // NOTE: CURRENTLY LIMITING THE "LENGTH" OF OPERANDS TO 6 E.G. 1000
    if (isNumeric(btn)) {
        if (onscreenValue.length < 6) {
            numericPress(btn);
        }
    } else if (btn == "AC") {
        clearCalcualtor();
    } else if (btn == "=") {
        if (mostRecentPress != undefined) equalsPress();
    }  else if (btn == ".") {
        // alert(btn + " was pressed");
        addDecimalPoint();
    } else {
        operatorPress(btn);
    }  
}

function removeTransition(e) {
    if (e.propertyName != "background-color") return; 
    this.classList.remove("activeBtn");
}

const btns = document.querySelectorAll(".btn");
btns.forEach(btn => btn.addEventListener("click", btnPress));
btns.forEach(btn => btn.addEventListener("transitionend", removeTransition));

let valueDisplay = document.querySelector("#display-value")
function displayValue(value) {
    valueDisplay.textContent = value;
}

window.addEventListener("keydown", (e) => {
    let keyPressed = e.key;
    if (isNumeric(keyPressed)) { 
        btnPress(e);
    }  
});
