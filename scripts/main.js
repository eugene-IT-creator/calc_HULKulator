(() => {
    let elements = document.getElementsByTagName("li");
    let screen = document.querySelectorAll("p")[0];
    let clear = document.getElementsByClassName('clear')[0];
    let operator = null;
    let operands = [];

    function addToCurrentValue(i) {
        return function () {
            let value = elements[i].innerText;
            if (operands.length === 2) {
                calculate()();
            }
            switch (value) {
                case "\u00F7":
                    screen.innerText += "/";
                    operator = "/"
                    break;
                case "\u00D7":
                    screen.innerText += "*";
                    operator = "*";
                    break;
                case "\u2212":
                    screen.innerText += "-";
                    operator = "-";
                    break;
                case "+":
                    screen.innerText += "+";
                    operator = "+";
                    break;
                default:
                    screen.innerText += value;
                    operands.push(Number(value));
            }
        };
    }

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
            if (operands.length === 1) {
                answer = operands[0];
            } else {
                answer = operate(operator, operands[0], operands[1]);
            }
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
})();


