(() => {
    let elements = document.getElementsByTagName("li");
    let screen = document.querySelectorAll("p")[0];
    let clear = document.getElementsByClassName('clear')[0];

    for (let i = 0; i < elements.length; i++) {
        if (elements[i].innerHTML === "=") {
            elements[i].addEventListener("click", calculate(i));
        } else {
            elements[i].addEventListener("click", addToCurrentValue(i));
        }
    }

    function addToCurrentValue(i) {
        return function () {
            if (elements[i].innerHTML === " ÷ ") {
                screen.innerHTML += " / ";
            } else if (elements[i].innerHTML === " x ") {
                screen.innerHTML += " * ";
            } else {
                screen.innerHTML += elements[i].innerHTML;
            }
        };
    }

    clear.onclick = function () {
        screen.innerHTML = "";
    };

    function calculate() {
        return function () {
            screen.innerHTML = eval(screen.innerHTML);
        };
    }

    function operate(operator, number1, number2) {
        const operations = {
            "+": (a, b) => a + b,
            "-": (a, b) => a - b,
            "*": (a, b) => a * b,
            "/": (a, b) => b === 0 ? "Seriously, Division by zero is undefined" : a / b
        }
        const operation = operations[operator];

        return operation ? operation(number1, number2) : "Operator not found";
    }

})();

