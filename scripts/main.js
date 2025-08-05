(() => {
    let elements = document.getElementsByTagName("li");
    let screen = document.getElementById("input");
    let clear = document.getElementsByClassName("clear")[0];
    let operator = null;
    let answer = null;
    let operands = [];

    let backspaceBtn = document.getElementById("backspace");
    let decimal = document.getElementById("dot");

    const operators = {
        "\u00F7": "/",
        "\u00D7": "*",
        "\u2212": "-",
        "+": "+",
    }

    function addToCurrentValue(i) {
        return function () {
            let userInput = elements[i].innerText;
            if (operands.length === 2 && !screen.innerText.includes(".")) {
                calculate()();
            }
            if (isNaN(Number(userInput)) && userInput in operators) {
                if (operator === null && screen.innerText.length > 0) {
                    operator = operators[userInput];
                    screen.innerText += operator;
                }
                return;
            }
            if (!isNaN(Number(userInput)) || userInput === '.') {
                screen.innerText += userInput;
            }
            if ((operator !== null) && (screen.innerText.includes(operator)) && (!screen.innerText.endsWith('.'))) {
                let sides = screen.innerText.split(operator);
                if (sides.length === 2 && sides[0] !== "" && sides[1] !== "") {
                    let left = Number(sides[0]);
                    let right = Number(sides[1]);
                    operands = [left, right];
                    console.log(operands);
                    console.log(operands.length);
                }
            }
        }
    };

    for (let i = 0; i < elements.length; i++) {
        if (elements[i].innerText === "=") {
            elements[i].addEventListener("click", calculate(i));
        } else {
            elements[i].addEventListener("click", addToCurrentValue(i));
        }
    }

    clear.addEventListener('click', function (e) {
        clearScreen();
        operands = [];
        operator = null;
    });

    function clearState() {
        operands = [];
        operator = null;
    }

    function clearScreen() {
        screen.innerText = '';
    }

    function calculate() {
        return function () {
            answer = operate(operator, operands[0], operands[1]);

            screen.innerText = answer;
            if (answer === 'undefined') {
                clearState();
                setTimeout(() => {
                    clearScreen();
                }, 500);
            } else {
                clearState();
                operands.push(answer);
            }
        };
    }

    function operate(operator, number1, number2) {
        const operations = {
            "+": (a, b) => a + b,
            "-": (a, b) => a - b,
            "*": (a, b) => a * b,
            "/": (a, b) => b === 0 ? "undefined" : a / b
        }
        const operation = operations[operator];

        return operation ? operation(number1, number2) : "Operator not found";
    }


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
    window.addEventListener("keydown", setKey);
    function setKey(e) {
        if (e.key >= 0 && e.key <= 9) displayNumber(e.key);
        if (e.key === ".") displayDecimal(e.key);
        if (e.key === "Backspace") deleteNumber(e.key);
    }

})();


