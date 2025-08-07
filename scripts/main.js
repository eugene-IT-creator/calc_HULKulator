(() => {
    let numbers = document.querySelectorAll('.numberBtn');
    let operators = document.querySelectorAll(".operator");
    let equal = document.getElementById("equal");

    let screen = document.querySelectorAll("p")[0];
    let clear = document.getElementsByClassName("clear")[0];
    let backspaceBtn = document.getElementById("backspace");

    let currentOperator = null;
    let firstNum = null;
    let secondNum = null;
    let resetScreen = false;
    let result = null;


    // OPERATION 
    function add(x, y) {
        return parseFloat(x) + parseFloat(y);
    }

    function subtract(x, y) {
        return parseFloat(x) - parseFloat(y);
    }

    function divide(x, y) {
        if (y == 0)
            return "r u serious?";
        else if (x == 0)
            return Number(0);
        else
            return parseFloat(x) / parseFloat(y);
    }

    function multiply(x, y) {
        return parseFloat(x) * parseFloat(y);
    }

    function operate(x, y, operator) {
        const operations = {
            "+": add(x, y),
            "-": subtract(x, y),
            "*": multiply(x, y),
            "/": divide(x, y),
        }
        return operations[operator];
    }


    // READING INPUTS 

    // NUMBER INPUT
    function readNumber(numberText) {
        if (resetScreen) {
            clearScreen();
            resetScreen = false;
        }
        displayNumber(numberText);
    }

    function displayNumber(number) {
        screen.innerText += number;
    }

    // DECIMAL INPUT
    function displayDecimal() {
        if (!screen.innerText.includes(".")) {
            screen.innerText += ".";
        }
    }

    // OPERATOR INPUT
    function readOperator(operatorId, operatorText) {
        setOperand(showNumber());
        setTheOperator(operatorId);
        displayOperator(operatorText);
        resetScreen = true;
    }

    function showNumber() {
        return screen.innerText;
    }

    function setOperand(value) {
        if (firstNum === null) {
            firstNum = value;
        } else {
            secondNum = value;
        }
    }

    function setTheOperator(operator) {
        if (currentOperator == null) {
            currentOperator = operator;
        } else if (firstNum && secondNum) {
            result = operate(Number(firstNum), Number(secondNum), currentOperator);
            clearAllValues();
            displayNumber(result);
            firstNum = result;
            displayOperator(operator);
            currentOperator = operator;
        }
    }

    function displayOperator(operator) {
        screen.innerText += operator;
    }

    // EQUALS HANDLING

    function readEquals() {
        result = calculateResult();
        clearAllValues();
        if (result) {
            displayNumber(result);
        }
    }

    // RESULT
    function calculateResult() {
        if (firstNum && currentOperator && !resetScreen && !secondNum) {
            setOperand(showNumber());
            return operate(Number(firstNum), Number(secondNum), currentOperator);
        } else {
            return false;
        }
    }

    // UI HANDLING

    numbers.forEach((number) => {
        number.addEventListener("click", (e) => {
            readNumber(e.target.innerText);
        });
    });


    operators.forEach((operator) => {
        operator.addEventListener("click", (e) => {
            readOperator(e.target.id, operator.innerText);
        });
    });

    equal.addEventListener("click", () => {
        readEquals();
    });

    // CLEAR
    function clearScreen() {
        screen.innerText = "";
    }

    function clearAllValues() {
        firstNum = null;
        secondNum = null;
        currentOperator = null;
        clearScreen();
    }

    clear.addEventListener("click", () => {
        clearAllValues();
    });

    // BACKSPACE
    backspaceBtn.addEventListener("click", deleteNumber)
    function deleteNumber() {
        if (screen.innerText !== "0") {
            screen.innerText = screen.innerText.toString().slice(0, -1);
        }
        if (screen.innerText === "") {
            screen.innerText = "";
        }
    }

    // KEYBOARD INPUT HANDLING
    window.addEventListener("keydown", setKey);

    function setKey(e) {
        if (e.key >= 0 && e.key <= 9) {
            if (resetScreen)
                clearScreen();
            displayNumber(e.key);
            resetScreen = false;
        }
        switch (e.key) {
            case "+":
            case "-":
            case "*":
            case "/":
                readOperator(e.key, e.key);
                break;
            case ".":
            case ",":
                displayDecimal(e.key);
                break;
            case "Backspace":
                deleteNumber();
                break;
            case "=":
            case "Enter":
                readEquals();
                break;
            case "Escape":
                clearAllValues();
                break;
        }
    }

})();
