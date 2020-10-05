//HTML Container Variables
const numbersContainer = document.getElementById("numbersContainer");
const opsContainer = document.getElementById("opsContainer");
const display = document.getElementById("display");

//Expression Array Holders
let expressionArray = ["Empty"];
let currentProduct = 0;


//initial display (this is the very first "0" on the calculator display)
UpdateDisplay(1);

//SETUP
//This sequence creates the html elements of the calculator
const numberIndex = [];


//create number boxes
for (let i = 9; i >= 0;) {
    let newDiv = document.createElement('div');
    newDiv.innerHTML = i;
    numberIndex[i] = newDiv;
    numbersContainer.appendChild(newDiv);
    numberIndex[i].addEventListener("click", RelayNumberInput);

    i--;
}

const opsList = ["+", "-", "*", "/", "="]
const opsIndex = [];

//create operation boxes
for (let i = 0; i < 5;) {
    let newDiv = document.createElement('div');
    newDiv.innerHTML = opsList[i]
    opsIndex[i] = newDiv;
    opsContainer.appendChild(newDiv);
    opsIndex[i].addEventListener("click", RelayOpsInput);
    i++;
}

//RELAYING FUNCTIONS
//These functions simply relay the user input to pushChar
function RelayNumberInput() {
    let box = this;
    let indexNum = numberIndex.indexOf(box);
    console.log(indexNum);
    pushChar(indexNum, 0); //Type "0", a number input
}

function RelayOpsInput() {
    let box = this;
    let indexNum = opsIndex.indexOf(box);
    console.log(opsList[indexNum]);
    pushChar(opsList[indexNum], 1); //Type "1", an opperator input
}

//--------------------------------------//
//pushChar is the function made to respond to different conditions in the expression.
//It uses that data to decide on what to push and change in the exprressionArray.

function pushChar(input, type) {
    let previousValue;
    let updateDisplayMode = 0;

    if (expressionArray == "Empty") {
        previousValue = "Empty";
    }
    else {
        previousValue = expressionArray[expressionArray.length - 1];
    }

    console.log("PreviousValueA: " + previousValue);
    
    
    if (type == 0) {
        //code for number input
        if (previousValue == "Empty") {
            expressionArray.shift();
            expressionArray.push(input);
        }
        else if (typeof previousValue != "number"){
            expressionArray.push(input);
            console.log("Mark1");
        }
        else if (typeof previousValue == "number") {
            let tempVal1 = previousValue.toString();
            let tempVal2 = input.toString();

            expressionArray[expressionArray.length - 1] = parseInt(tempVal1 + tempVal2);
            console.log("Mark2");
        }
    }
    
    else if (type == 1) {
        //code for opperator input
        if (previousValue == "Empty") {
            console.log("Error: Cannot push opperator to null0");
        }
        else if (typeof previousValue == "string") {
            console.log("Error: Cannot push opperator on another opperator");
        }
        else if (input == "=") {
            SolveEquation();
            updateDisplayMode = 1;
        }
        else if (typeof previousValue != NaN) {
            expressionArray.push(input);
        }
    }
    
    else {
        console.log("Error: PushChar 'type' != '0' or '1'");
    }
    

    console.log("PreviousValueB: " + previousValue);
    console.log("Array: " + expressionArray);
    UpdateDisplay(updateDisplayMode);
}

//Solving Function
//These functions are responsible for solving our equation
function SolveEquation() {
    let coEf1 = 0;
    let coEf2 = 0;
    let opp = "+";
    let product;
    let onNum = true;

    for (let i = 0; i < expressionArray.length;) {
        if (onNum == true) {
            coEf2 = expressionArray[i];

            product = returnProduct(coEf1, coEf2, opp);
            onNum = false;
            coEf1 = product;
        }
        else {
            opp = expressionArray[i];
            onNum = true;
        }
        i++;
    }
    currentProduct = product;
    console.log(product);
    expressionArray = ["Empty"];
}

function returnProduct (_coEf1, _coEf2, _opp) {
    if (_opp == "+") {
        return _coEf1 + _coEf2;
    }
    else if (_opp == "-") {
        return _coEf1 - _coEf2;
    }
    else if (_opp == "*"){
        return _coEf1 * _coEf2;
    }
    else if (_opp == "/") {
        return _coEf1 / _coEf2;
    }
}
console.log(currentProduct);

//Display function
//This function handles displaying the data on the calculator
function UpdateDisplay(mode) {
    let displayValue = "";

    if (mode == 0) {
        for (let i = 0; i < expressionArray.length;) {
            displayValue += " " + expressionArray[i];
            i++;
        }
    }
    else if (mode == 1) {
        displayValue = currentProduct;
    }

    display.innerHTML = displayValue;
}
