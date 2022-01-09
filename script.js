function add(x, y) {
    return x + y;
}

function substract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function calculate(oper, x, y) {
    switch (oper) {
        case "+":
            return add(x, y);
        case "-":
            return substract(x, y);
        case "×":
            return multiply(x, y);
        case "÷":
            return divide(x, y);
    }
}

function populateDisplay() {
    topRow.textContent = topDisplay;
    bottomRow.textContent = display;
}

function clickFunction(e) {
    handleEvent(e.target.dataset.btn);
}

function handleEvent(btn) {
    if (btn >= 0 && btn < 10) {
        addDigit(btn);
    }
    else if (btn == "÷" || btn == "×" || btn == "+" || btn == "-") {
        operate(btn);
    }
    else if (btn == "=" || btn == "Enter") operate(btn);
    else if (btn == "ac" || btn == "delete" || btn == "escape") reset();
    else if (btn == "c" || btn == "backspace") clear();
    else if (btn == ".") addPoint();
    else if (btn == "-+") toogleMinus();
}

function toogleMinus() {
    if (display == "0") return;
    if (display[0] != "-") {
        display = "-" + display;
    }
    else display = display.slice(1);
    populateDisplay();
}

function reset(disp) {
    display = disp ? disp : "0",
        firstNum = "", secondNum = "", topDisplay = !disp ? "" : topDisplay , operator1 = "", operator2 = "", result = "", flag = false;
    populateDisplay();
}

function clear() {
    display = display.slice(0, -1);
    
    //topS = "";
    if (display == "-" || display == "-0" || display == "") display = "0";
    populateDisplay();
}

function addPoint() {
    if (display.includes(".")) return;
    display = display + ".";
    populateDisplay();
}

function tooManyDigits() {
    console.log("Too Many Digits");
}

function addDigit(x) {
    if (display.length == 20) {
        tooManyDigits();
        return;
    }
    if (display == "0") display = x;
    else {
        display = display + x;        
    }
    flag = true;
    populateDisplay();
}



function operate(op) {
    takeNumber();
    takeOperator(op);
    flag = false;
}

function takeNumber() {
    
    if (!firstNum) {
        firstNum = display;
    }
    else secondNum = display;
}

function takeOperator(op) {
    if(!flag){
        operator1 = op;
        topDisplay = firstNum + operator1;
        populateDisplay();        
        return;
    }
    if (!operator1){
        operator1 = op;
        topDisplay = firstNum + op;
        populateDisplay();
        display = "";
        return;
    }
    operator2 = op;
    result = calculate(operator1, parseFloat(firstNum), parseFloat(secondNum));
    topDisplay = firstNum + operator1 + secondNum;
    display = result.toString() ? result.toString() : "0";
    populateDisplay();
    topDisplay = result + operator2;
    if (op != "=") {
        display = "0";
    operator1 = operator2, operator2 = "", firstNum = result;
    }
    else {
        topDisplay = firstNum + operator1 + secondNum;
        reset(display);
    }
    flag = false;
}

let flag = false, display = "0", topDisplay = "", firstNum = "", secondNum = "", operator1 = "", operator2 = "", result = "";
const topRow = document.getElementById("topD");
const bottomRow = document.getElementById("bottomD");
const buttons = document.querySelectorAll(".btn");
buttons.forEach(x => {
    x.addEventListener("click", clickFunction);
});

populateDisplay();




