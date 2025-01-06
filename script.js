let takingX = true;
let x = "";
let y = "";
let op = null;

// Elements
const calculator = document.querySelector("#calculator");
const screen = document.querySelector(".screen");

// Event Listeners
calculator.addEventListener("click", (e) => click(e) );

function show()
{
    console.log("===");
    console.log(x);
    console.log(y);
    console.log(op);
    console.log(takingX);
}

// Delegates what should happen based on click target
function click(e)
{
    let selection = e.target.innerText;

    // Clear error text
    if( ["NaN","Can't / 0","Too big"].includes(screen.innerText) )
    {
        screen.innerText = "";
    }

    // Number or decimal clicked: concat if enough space
    if( e.target.className.includes("num") )
    {
        let reset = false;

        // Ignore: 10th digit
        if( screen.innerText.length > 8 ) reset = true;

        // Ignore: second decimal
        if( selection === "." && screen.innerText.includes(".") ) return;
        
        // Add digit
        if( takingX )
        {
            x = reset ? selection : x + selection;
            screen.innerText = x;
        }
        else
        {
            y = reset ? selection : y + selection;
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
            else if( x !== "")
            {
                takingX = false;
            }
        }
    }
}

function add(x,y) { return Number(x) + Number(y); }
function subtract(x,y) { return x-y; }
function multiply(x,y) { return x*y; }
function divide(x,y) { if(y == 0) return "Can't / 0"; else return x/y; }

function operate()
{
    let result = 0;

    // Validate we're ready to calculate
    if( x === null || y === null || op === null ) return;

    // Calculate
    if( op === "+" ) result = add(x,y);
    else if( op === "-" ) result = subtract(x,y);
    else if( op === "*" ) result = multiply(x,y);
    else if( op === "/" ) result = divide(x,y);

    // Errors
    if( ["NaN","Can't / 0","Too big"].includes(result) )
    {
        resetAll();
        screen.innerText = result;
        return;
    }
    
    // Validate size
    let integer = parseInt(result);
    let integerLength = String(Math.abs(integer)).length;

    if( integerLength > 9 )
    {
        // Number too big
        resetAll();
        return;
    }
    else if( String(Math.abs(result)).length > 9 )
    {
        // Round to fit
        let neg = result < 0;
        let resultStr = String(Math.abs(result)).slice(0,10);
        console.log(resultStr);

        result = Number(resultStr);
    }

    // Set state
    x = String(result);
    screen.innerText = result;
    y = "";
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