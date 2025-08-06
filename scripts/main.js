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
            "add ": add(x, y),
            "subtract": subtract(x, y),
            "multiply": multiply(x, y),
            "divide": divide(x, y),
        }
        return operations[operator];
    }

    numbers.forEach((number) => {
        number.addEventListener("click", (e) => {
            if (resetScreen) {
                clearScreen();
            }
            displayNumber(e.target.innerText);
            resetScreen = false;
        });
    });


    operators.forEach((operator) => {
        operator.addEventListener("click", (e) => {
            setOperand(showNumber());
            setTheOperator(operator.innerText);
            resetScreen = true;
        });
    });

    function showNumber() {
        return screen.innerText;
    }

    function setOperand(value) {
        if (firstNum == null) {
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
            clearScreen();
            displayNumber(result);
            firstNum = result;
            secondNum = null;
            currentOperator = operator;
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

    equal.addEventListener("click", () => {
        result = calculateResult();
        clearScreen();
        if (result) {
            displayNumber(result);
        }
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


    function displayNumber(number) {
        screen.innerText += number;
    }
    function displayDecimal() {
        if (!screen.innerText.includes(".")) {
            screen.innerText += ".";
        }
    }

    // NEED TO FIX
    function displayOperator(operator) {
        if (!screen.innerText.includes(operator))
            screen.innerText += operator;
        // if (!screen.innerText.includes("+")) {
        //     screen.innerText += "+";
        // } else if (!screen.innerText.includes("-")) {
        //     screen.innerText += "-";
        // } else if (!screen.innerText.includes("*")) {
        //     screen.innerText += "*";
        // } else if (!screen.innerText.includes("/")) {
        //     screen.innerText += "/";
        // }
    }
    window.addEventListener("keydown", setKey);
    function setKey(e) {
        if (e.key >= 0 && e.key <= 9) displayNumber(e.key);
        if (e.key === "+") displayOperator(e.key);
        if (e.key === "-") displayOperator(e.key);
        if (e.key === "*") displayOperator(e.key);
        if (e.key === "/") displayOperator(e.key);
        if (e.key === ".") displayDecimal(e.key);
        if (e.key === "Backspace") deleteNumber(e.key);
    }

})();


