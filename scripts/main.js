(() => {
    let elements = document.getElementsByTagName("li");
    let screen = document.querySelectorAll("p")[0];
    let clear = document.getElementsByClassName('clear')[0];

    function addToCurrentValue(i) {
        return function () {
            let value = elements[i].innerText;
            switch (value) {
                case "\u00F7":
                    screen.innerText += "/";
                    break;
                case "\u00D7":
                    screen.innerText += "*";
                    break;
                case "\u2212":
                    screen.innerText += "-";
                    break;
                default:
                    screen.innerText += value;
            }
        };
    }

    for (let i = 0; i < elements.length; i++) {
        if (elements[i].innerHTML === "=") {
            elements[i].addEventListener("click", calculate(i));
        } else {
            elements[i].addEventListener("click", addToCurrentValue(i));
        }
    }

    clear.onclick = function () {
        screen.innerHTML = "";
    };

    function calculate() {
        return function () {
            screen.innerText = eval(screen.innerText);
        };
    }

    //we need to eventually switch to this, eval is dangerous
    // function operate(operator, number1, number2) {
    //     const operations = {
    //         "+": (a, b) => a + b,
    //         "-": (a, b) => a - b,
    //         "*": (a, b) => a * b,
    //         "/": (a, b) => b === 0 ? "Seriously, Division by zero is undefined" : a / b
    //     }
    //     const operation = operations[operator];

    //     return operation ? operation(number1, number2) : "Operator not found";
    // }

})();

