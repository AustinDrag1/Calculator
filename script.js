let takingX = true;
let x = "";
let y = "";
let op = null;

// Calculator
const calculator = document.querySelector("#calculator");
const screen = document.querySelector(".screen");
const resetAllBtn = document.querySelector("#AC");

calculator.addEventListener("click", (e) => click(e) );
resetAllBtn.addEventListener("click", () => resetAll() );

// Checks that click is an acceptable target then delegates what should happen
function click(e)
{
    let selection = e.target.innerText;

    // Number or "." clicked: concat if enough space
    if( e.target.className.includes("num") )
    {
        // Ignore: 10th digit
        if( screen.innerText.length === 9 ) return;

        // Ignore: second "."
        if( selection === "." && screen.innerText.includes(".") ) return;
        
        // Add digit
        if( takingX )
        {
            x = x + selection;
            screen.innerText = x;
        }
        else
        {
            y = y + selection;
            screen.innerText = y;
        }
    }
    else // Operator clicked: calculate if in correct state
    {
        // State irrelevant
        if( selection === "+/-" ) flipSign();
        if( selection === "=" ) operate();

        // Requires first state

        // Requires second state
    }
}

function add(x,y) { return x+y; }
function subtract(x,y) { return x-y; }
function multiply(x,y) { return x*y; }
function divide(x,y) { return x/y; }

function operate(x,y,op)
{
    let result = 0;

    // Validate we're ready to calculate
    if( x === null || y === null || op == null ) return;

    // Send to appropriate method
    switch (op)
    {
        case "+": result = add(x,y); break;
        case "-": result = subtract(x,y); break;
        case "*": result = multiply(x,y); break;
        case "/": result = divide(x,y); break;
    }

    // Round to fit screen

}

function resetAll()
{
    x = "";
    y = "";
    screen.innerText = "";
    takingX = true;
}

function flipSign()
{
    let result;

    if( takingX )
    {
        x *= -1;
        result = x;
    }
    else
    {
        y *= -1;
        result = y;
    }

    screen.innerText = result;
}