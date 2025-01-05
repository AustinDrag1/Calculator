function add(x,y) { return x+y; }
function subtract(x,y) { return x-y; }
function multiply(x,y) { return x*y; }
function divide(x,y) { return x/y; }

function operate(x,y,op)
{
    let result = 0;

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

function parseInput(str)
{
    // Read from left to right, find 
}

let x = 0;
let y = 0;
let op = null;