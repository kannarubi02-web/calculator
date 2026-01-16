let display = document.getElementById("display");
let buttons = document.querySelectorAll(".btn");
let historyList = document.getElementById("history-list");

let currentInput = "";

/* Button Clicks */
buttons.forEach(button => {
    button.addEventListener("click", () => {
        handleInput(button.textContent);
    });
});

/* Keyboard Support */
document.addEventListener("keydown", (e) => {
    if ("0123456789.+-*/".includes(e.key)) handleInput(e.key);

    if (e.key === "Enter") handleInput("=");

    if (e.key === "Backspace") {
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput;
    }

    if (e.key === "Escape") handleInput("C");
});

/* Main Logic */
function handleInput(value) {
    if (value === "C") {
        currentInput = "";
        display.value = "";
    }
    else if (value === "=") {
        try {
            let result = eval(currentInput);
            addToHistory(currentInput, result);
            currentInput = result.toString();
            display.value = currentInput;
        } catch {
            display.value = "Error";
            currentInput = "";
        }
    }
    else if (value === "%") {
        let result = eval(currentInput) / 100;
        addToHistory(currentInput + "%", result);
        currentInput = result.toString();
        display.value = currentInput;
    }
    else if (value === "√") {
        let result = Math.sqrt(eval(currentInput));
        addToHistory("√(" + currentInput + ")", result);
        currentInput = result.toString();
        display.value = currentInput;
    }
    else if (value === "x²") {
        let result = Math.pow(eval(currentInput), 2);
        addToHistory(currentInput + "²", result);
        currentInput = result.toString();
        display.value = currentInput;
    }
    else {
        currentInput += value;
        display.value = currentInput;
    }
}

/* History */
function addToHistory(expression, result) {
    let li = document.createElement("li");
    li.textContent = `${expression} = ${result}`;
    historyList.prepend(li);
}
