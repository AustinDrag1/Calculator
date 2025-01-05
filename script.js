let takingX = true;
let x = "";
let y = "";
let op = null;

// Elements
const calculator = document.querySelector("#calculator");
const screen = document.querySelector(".screen");

// Event Listeners
calculator.addEventListener("click", (e) => click(e) );

// Delegates what should happen based on click target
function click(e)
{
    let selection = e.target.innerText;

    // Number or decimal clicked: concat if enough space
    if( e.target.className.includes("num") )
    {
        // Ignore: 10th digit
        if( screen.innerText.length > 8 ) return;

        // Ignore: second decimal
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
    else
    {
        // Perform operation
        if( selection === "+/-" ) flipSign();
        if( selection === "AC" ) resetAll();
        if( selection === "=" ) operate();
        if( ["+","-","/","*"].includes(selection) )
        {
            op = selection;

            // If we already picked an operator and Y value, treat new operators as "="
            if( !takingX )
            {
                operate();
                op = null;
            }
            else
            {
                takingX = false;
            }
        }
    }

    // console.log("===");
    // console.log(x + " " + op + " " + y);
}

function add(x,y) { return Number(x) + Number(y); }
function subtract(x,y) { return x-y; }
function multiply(x,y) { return x*y; }
function divide(x,y) { return x/y; }

function operate()
{
    let result = 0;

    // Validate we're ready to calculate
    if( x === null || y === null || op === null ) return;

    console.log(x + " " + op + " " + y);

    // Calculate
    if( op === "+" ) result = add(x,y);
    else if( op === "-" ) result = subtract(x,y);
    else if( op === "*" ) result = multiply(x,y);
    else if( op === "/" ) result = divide(x,y);

    // Discard big large numbers
    if( result > 999999999 )
    {
        resetAll()
    }

    // Set values
    x = String(result);
    y = ""
    screen.innerText = result;
    op = null;
    takingX = true;
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