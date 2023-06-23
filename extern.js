let first = "";
let second = "";
let operation = null;
let resetScreen = false;

const numbers = document.querySelectorAll('[data-number]');
const operators = document.querySelectorAll('[data-operator]');
const equality = document.getElementById('equals');
const clearer = document.getElementById('clear');
const deleter = document.getElementById('delete');
const floater = document.getElementById('pointButton');
const operationDisplay = document.getElementById("operation");
const lastCalculus = document.getElementById("beforeOperation");


////////////////////////////////////////
function operate(operator, a, b) {
    a = Number(a)
    b = Number(b)
    switch (operator) {
        case '+':
            return add(a, b)
        case '−':
            return substract(a, b)
        case '*':
            return multiply(a, b)
        case '÷':
            if (b === 0) return null
            else return divide(a, b)
        default:
            return null
    }
}

function add(a, b) {
    return a + b
}

function substract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a / b
}

////////////////////////////////////////
function clearTable() {
    operationDisplay.textContent = "0";
    lastCalculus.textContent = "";
    first = "";
    second = "";
    operation = null;
}

clearer.addEventListener('click', clearTable);

////////////////////////////////////////
function deleteDigit() {
    operationDisplay.textContent = operationDisplay.textContent
        .toString()
        .slice(0, -1);
}

deleter.addEventListener('click', deleteDigit);

////////////////////////////////////////

function resetDisplay() {
    operationDisplay.textContent = "";
    resetScreen = false;
}

function putNumber(number) {
    if (operationDisplay.textContent === "0" || resetScreen) {
        resetDisplay();
    }
    operationDisplay.textContent += number;
}

numbers.forEach((button) =>
    button.addEventListener("click", () => putNumber(button.textContent)));

function functionalOperators(operator) {
    if (operationDisplay !== null) {
        calculus();
    }
    first = operationDisplay.textContent;
    operation = operator;
    lastCalculus.textContent = `${first} ${operation}`;
    resetScreen = true;
}

operators.forEach((button) =>
    button.addEventListener("click", () => functionalOperators(button.textContent)));

function calculus() {
    if (operation === null || resetScreen) return
    if (operation === '/' && operationDisplay.textContent === '0') {
        alert("You can't divide by 0!")
        return
    }
    second = operationDisplay.textContent
    operationDisplay.textContent = roundNumber(
        operate(operation, first, second)
    )
    lastCalculus.textContent = `${first} ${operation} ${second} =`
    operation = null
}

function roundNumber(number) {
    return Math.round(number * 1000) / 1000;
}

equality.addEventListener("click", calculus);

////////////////////////////////////////

function makeFloater() {
    if (resetScreen) {
        resetDisplay();
    }

    if (operationDisplay.textContent === "") {
        operationDisplay.textContent = "0";
    }
    if (operationDisplay.textContent.includes(".")) {
        return;
    }
    operationDisplay.textContent += ".";
}

floater.addEventListener("click", makeFloater);