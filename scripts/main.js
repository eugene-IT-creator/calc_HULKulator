(() => {
    const memeLink = "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHMzbnpkYTl0OTF4MWo1MzR6eHB3NTk5cGVhcTJxcGVyMTRucm9sbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/u31fedwl4J7G0/giphy.gif"
    let numbers = document.querySelectorAll('.numberBtn');
    let operators = document.querySelectorAll(".operator");
    let equal = document.getElementById("equal");
    let dot = document.getElementById("dot");
    let screenBackground = document.querySelector(".img img");
    let screen = document.querySelectorAll("p")[0];
    let clear = document.getElementsByClassName("clear")[0];
    let backspaceBtn = document.getElementById("backspace");
    let operatorList = ["\u00F7", "\u00D7", "-", "+"];
    let currentOperatorText;
    let currentOperator = null;
    let firstNum = null;
    let secondNum = null;
    let resetScreen = false;
    let result = null;

    function setOperatorButtonActive() {
        operators.forEach((operator) => {
            operator.classList.remove("selected-operator");
            if (operator.innerText === currentOperatorText || operator.id == currentOperator) {
                operator.classList.add("selected-operator");
            }
        });
    }
    function setOperatorButtonsDisabled(value) {
        operators.forEach(operator => operator.disabled = value);
    }
    function updateOperatorButtonState() {
        let empty;
        if (screen.innerText === "" || screen.innerText === "r u serious?") {
            empty = true;
        }
        setOperatorButtonsDisabled(empty);
    }
    updateOperatorButtonState();

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
        if (resetScreen || screen.innerText === "r u serious?") {
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
        if (screen.innerText === "") {
            return;
        }
        if (screen.innerText === "r u serious?") {
            clearScreen();
        }
        setOperand(showNumber());
        setTheOperator(operatorId);
        currentOperatorText = operatorText;
        setOperatorButtonActive();
        resetScreen = true;
    }

    function showNumber() {
        return screen.innerText;
    }

    function setOperand(value) {
        if (firstNum === null) {
            firstNum = value;
        } else if (currentOperator !== null && !resetScreen) {
            secondNum = value;
        }
    }

    function setTheOperator(operator) {

        currentOperator = operator;
        if (firstNum && secondNum) {
            result = operate(Number(firstNum), Number(secondNum), currentOperator);
            clearAllValues();
            displayNumber(result);
            firstNum = result;
            currentOperator = operator;
        }
    }

    // EQUALS HANDLING

    function readEquals() {
        result = calculateResult();
        if (result === "r u serious?") {
            screenBackground.src = memeLink;
            setTimeout(() => {
                screenBackground.src = "images/hulk.jpeg"
            }, 5000)
        }

        clearAllValues();
        if (result !== null && result !== false) {
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
            updateOperatorButtonState();
        });
    });

    dot.addEventListener("click", displayDecimal);

    operators.forEach((operator) => {
        operator.addEventListener("click", (e) => {
            readOperator(e.target.id, operator.innerText);
        });
    });

    equal.addEventListener("click", () => {
        readEquals();
        updateOperatorButtonState();
        setOperatorButtonActive();
    });

    // CLEAR
    function clearScreen() {
        screen.innerText = "";
    }

    function clearAllValues() {
        firstNum = null;
        secondNum = null;
        currentOperator = null;
        currentOperatorText = null;
        clearScreen();
    }

    clear.addEventListener("click", () => {
        clearAllValues();
        updateOperatorButtonState();
    });

    // BACKSPACE
    backspaceBtn.addEventListener("click", deleteNumber)
    function deleteNumber() {
        if (screen.innerText !== "") {
            if (operatorList.includes(screen.innerText.slice(-1))) {
                currentOperator = null;
            }
            screen.innerText = screen.innerText.toString().slice(0, -1);
        }
        updateOperatorButtonState();
        setOperatorButtonActive();
    }

    // KEYBOARD INPUT HANDLING
    window.addEventListener("keydown", setKey);

    function setKey(e) {
        if (e.key >= 0 && e.key <= 9) {
            if (resetScreen)
                clearScreen();
            displayNumber(e.key);
            updateOperatorButtonState();
            resetScreen = false;
        }
        switch (e.key) {
            case "+":
            case "-":
            case "*":
            case "/":
                readOperator(e.key, e.key);
                updateOperatorButtonState();
                break;
            case ".":
            case ",":
                displayDecimal(e.key);
                break;
            case "Backspace":
                deleteNumber();
                updateOperatorButtonState();
                break;
            case "=":
            case "Enter":
                readEquals();
                updateOperatorButtonState();
                setOperatorButtonActive();
                break;
            case "Escape":
                clearAllValues();
                setOperatorButtonActive();
                updateOperatorButtonState();
                break;
        }
    }

})();
