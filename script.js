//create calculator body:
let container = document.querySelector(".container");
let calcBody = createElement("div");
addClass(calcBody, "calc-body");
container.appendChild(calcBody);

//create display screen:
let display = createElement("INPUT");
display.setAttribute("type", "text");
display.setAttribute("readonly", "readonly");
addClass(display, "display");
display.addEventListener("click", scanBtn);
calcBody.appendChild(display);

//create add, sub, multi, divi, percent, decimal, equal, pos/neg, back, clear buttons
let fnBtnTxt = ["C", "+/-", "%", "/", ".", "<-", "*", "+", "-", "="];

let fnBtns1 = createElement("div");
addClass(fnBtns1, "fnBtns1");
for (let i = 0; i < 4; i++) {
  let button = createElement("button");
  addClass(button, "func-btn1");
  button.setAttribute("onclick", "scanBtn(event);");
  button.textContent = fnBtnTxt.splice(0, 1);
  fnBtns1.appendChild(button);
}
calcBody.appendChild(fnBtns1);
let flxCont = createElement("div");
addClass(flxCont, "flex-container");
calcBody.appendChild(flxCont);

//create buttons 0 thru 9:
let nums = createElement("div");
addClass(nums, "nums");
for (let i = 0; i < 10; i++) {
  let button = createElement("button");
  button.setAttribute("onclick", "scanBtn(event);");
  addClass(button, "digit");
  button.textContent = i;
  nums.appendChild(button);
}

let firstChild = nums.firstChild;
nums.appendChild(firstChild);
flxCont.appendChild(nums);

let decimal = createElement("button");
let goBack = createElement("button");
decimal.setAttribute("onclick", "scanBtn(event);");
goBack.setAttribute("onclick", "scanBtn(event);");
addClass(decimal, "decimal");
addClass(goBack, "back");
decimal.textContent = fnBtnTxt.splice(0, 1);
goBack.textContent = fnBtnTxt.splice(0, 1);
nums.appendChild(decimal);
nums.appendChild(goBack);

let fnBtns2 = createElement("div");
addClass(fnBtns2, "fnBtns2");

for (let i = 0; i < 4; i++) {
  let button = createElement("button");
  button.setAttribute("onclick", "scanBtn(event);");
  addClass(button, "func-btn2");
  button.textContent = fnBtnTxt.splice(0, 1);
  fnBtns2.appendChild(button);
}
flxCont.appendChild(fnBtns2);

let number = "";
//pushes inner text of btn to display screen
function scanBtn(e) {
  let current = null;

  if (e.target.classList.contains("back")) {
    number = "";
    if (display.value !== "") {
      display.value = display.value.substring(0, display.value.length - 1);
    }
  }
  if (e.target.innerHTML === "C") {
    display.value = "";
    number = "";
  }
  if (e.target.classList.contains("digit") || e.target.innerHTML === ".") {
    current = e.target.innerHTML;
    number = number.concat("", current);
    display.value += `${current}`;
  }
  if (
    e.target.innerHTML === "*" ||
    e.target.innerHTML === "+" ||
    e.target.innerHTML === "-" ||
    e.target.innerHTML === "/"
  ) {
    if (display.value !== "") {
      number = "";
      current = e.target.innerHTML;
      display.value += `${current}`;
    }
  }
  if (e.target.innerHTML === "+/-") {
    if (number > 0) {
      number = "-" + number.toString();
      display.value =
        display.value.substring(0, display.value.length - number.length + 1) +
        `${number}`;
      number = "";
    }
  }

  if (e.target.innerHTML === "%") {
    if (parseInt(number) % 1 === 0) {
      display.value =
        display.value.substring(0, display.value.length - number.length) +
        parseFloat(number / 100);
      number = "";
    }
  }

  if (e.target.innerHTML === "=") {
    let result = calculate(display.value);
    display.value = "";
    display.value = result;
  }
}

function calculate(str) {
  return Function("return " + str)();
}

function createElement(elem) {
  return document.createElement(elem);
}

function addClass(elem, string) {
  return elem.classList.add(string);
}
