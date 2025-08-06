(() => {
    let elements = document.getElementsByTagName("li");
    let screen = document.getElementById("input");
    let clear = document.getElementsByClassName("clear")[0];
    let displayImage = document.querySelector(".img img");
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

    const actionButtons = {
        "\u00F7": "/",
        "\u00D7": "*",
        "\u2212": "-",
        "+": "+",
        "\u003D": "="
    }
    //Helper functions
    function substrCount(str, substr) {
        return str.split(substr).length - 1;
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

    function checkInput(input) {
       
        if (isNaN(Number(input)) && input in operators) {
            if (operator === null && screen.innerText.length > 0) {
                operator = operators[input];
                screen.innerText += operator;
            }
            return;
        }
        if (!isNaN(Number(input))) {
            screen.innerText += input;
        }
        if (!screen.innerText.includes(operator)) {
            if ((input === '.' && substrCount(screen.innerText, ".") < 1)) {
                screen.innerText += input;
            }
        } else {
            if ((input === '.' && substrCount(screen.innerText, ".") < 2)) {
                screen.innerText += input;
            }
        }
    }

    //Main logic
    function addToCurrentValue(i) {
        return function () {
            let userInput = elements[i].innerText;
            if (screen.innerText === 'Operator not found' || screen.innerText === 'undefined') {
                clearState();
                clearScreen();
            }
            if (screen.innerText.includes(operator) && userInput in actionButtons) {
                calculate()();
            }
            checkInput(userInput);
            if (operator !== null && screen.innerText.includes(operator) && !screen.innerText.endsWith('.')) {
                let sides = screen.innerText.split(operator);
                if (sides.length === 2 && sides[0] !== "" && sides[1] !== "") {
                    let left = Number(sides[0]);
                    let right = Number(sides[1]);
                    operands = [left, right];
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
            console.log(operands);
            if (!screen.innerText.includes(operator)) {
                answer = screen.innerText;
            } else {
                answer = operate(operator, operands[0], operands[1]);
            }
            screen.innerText = answer;
            if (answer === 'undefined') {
                clearState();
                displayImage.src = "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHMzbnpkYTl0OTF4MWo1MzR6eHB3NTk5cGVhcTJxcGVyMTRucm9sbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/u31fedwl4J7G0/giphy.gif"
                setTimeout(() => {
                    displayImage.src = "images/hulk.jpeg"
                }, 5000)
                //alert("Nice try buddy, division by zero is not possible");
            } else {
                clearState();
                operands.push(answer);
            }
        };
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


