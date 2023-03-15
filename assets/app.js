/**----------------------------------
 * Name:Jupin Lathiya
 * project Title : Scientific Calculator
 * Github : https://github.com/jupinsimform
 ------------------------------------*/

// some comman function selecting form id & class
const input = document.querySelector("#screen");
const clear = document.querySelector("#clear");
const show = document.querySelectorAll(".show");
const result = document.querySelector(".equal");
const backspace = document.querySelector(".back");
const feButton = document.querySelector("#fe");
const fact = document.querySelector(".fact");
const memory = document.querySelector("#memory");
const memory_clear = document.querySelector("#mem_clear");
const memory_recall = document.querySelector("#mem_recall");

//  Regular expression to detect maths operator
let parens = /\(([0-9+\-*/\^ .]+)\)/; // Regex for identifying parenthetical expressions
let mul = /(\d+(?:\.\d+)?) ?\* ?(\d+(?:\.\d+)?)/; // Regex for identifying multiplication (x * y)
let div = /(\d+(?:\.\d+)?) ?\/ ?(\d+(?:\.\d+)?)/; // Regex for identifying division (x / y)
let add = /(\d+(?:\.\d+)?) ?\+ ?(\d+(?:\.\d+)?)/; // Regex for identifying addition (x + y)
let sub = /(\d+(?:\.\d+)?) ?- ?(\d+(?:\.\d+)?)/; // Regex for identifying subtraction (x - y)
let mode = /(\d+(?:\.\d+)?) ?% ?(\d+(?:\.\d+)?)/; // Regex for identifying modulo (x % y)
let squr = /(\d+(?:\.\d+)?) ?\^ ?(\d+(?:\.\d+)?)/; // Regex for identifying modulo (x % y)
let root = /(\d+(?:\.\d+)?) ?√ ?(\d+(?:\.\d+)?)/; // Regex for identifying modulo (x √ y)
let tan = /tan(\d+)/; // Regex for identifying tan
let sin = /sin(\d+)/; // Regex for identifying sin
let cos = /cos(\d+)/; // Regex for identifying cos
let arcTan = /arcTan(.)*(\d+)/; // Regex for identifying tan inverse
let arcSin = /arcSin(.)*(\d+)/; // Regex for identifying sin inverse
let arcCos = /arcCos(.)*(\d+)/; // Regex for identifying cos inverse
let log = /log(\d+(?:\.\d+)?)/; // Regex for identifying log
let ylogx = /(\d+(?:\.\d+)?) ?log ?(\d+(?:\.\d+)?)/; // Regex for identifying log x base y
let ln = /ln(\d+(?:\.\d+)?)/; // Regex for identifying ln

// alias for the operator
for (item of show) {
  item.addEventListener("click", (e) => {
    btntext = e.target.innerText;
    if (btntext == "÷") {
      btntext = "/";
    }
    if (btntext == "×") {
      btntext = "*";
    }
    if (btntext == "π") {
      btntext = "3.14159";
    }
    if (btntext == "mod") {
      btntext = "%";
    }
    if (btntext == "e") {
      btntext = "2.71828";
    }
    if (btntext == "xy") {
      btntext = "^";
    }
    if (btntext == "tan-1") {
      btntext = "arcTan";
    }
    if (btntext == "sin-1") {
      btntext = "arcSin";
    }
    if (btntext == "cos-1") {
      btntext = "arcCos";
    }
    if (btntext == "y√x") {
      btntext = "√";
    }
    if (btntext == "logyx") {
      btntext = "log";
    }
    input.value += btntext;
  });
}

// function for convert degree to radian or vice-versa
function degToRad() {
  let unit = document.getElementById("toggle").innerHTML;
  if (unit == "DEG") {
    input.value =
      ((Number(input.value) * 180) / Math.PI).toFixed(2).toString() + "°";
    document.getElementById("toggle").innerHTML = "RAD";
  } else if (unit == "RAD") {
    input.value = ((Number(input.value.slice(0, -1)) * Math.PI) / 180)
      .toFixed(2)
      .toString();
    document.getElementById("toggle").innerHTML = "DEG";
  }
}

// convert value into fixed to exponent
feButton.addEventListener("click", () => {
  input.value = Number(input.value).toExponential(2).toString();
});

// function for Enable and disable MC & MR button
function Enable_MC_MR_Btn() {
  memory_clear.disabled = false;
  memory_recall.disabled = false;
}

// All memory Related operation using Event Delegation
memory.addEventListener("click", (e) => {
  if (e.target.id == "mem_store") {
    Enable_MC_MR_Btn();
    let int = Number(input.value);
    let arr;
    if (localStorage.getItem("arr") === null) {
      arr = " ";
    } else {
      arr = JSON.parse(localStorage.getItem("arr"));
    }
    localStorage.setItem("arr", JSON.stringify(int));
    input.value = "";
  } else if (e.target.id == "mem_plus") {
    Enable_MC_MR_Btn();
    let int = Number(input.value);
    int = int + Number(localStorage.getItem("arr"));

    localStorage.setItem("arr", JSON.stringify(int));

    input.value = int.toString();
  } else if (e.target.id == "mem_minus") {
    Enable_MC_MR_Btn();
    let int = Number(input.value);
    int = Number(localStorage.getItem("arr")) - int;

    localStorage.setItem("arr", JSON.stringify(int));

    input.value = int.toString();
  } else if (e.target.id == "mem_recall") {
    input.value = localStorage.getItem("arr").toString();
  } else if (e.target.id == "mem_clear") {
    memory_clear.disabled = true;
    memory_recall.disabled = true;
    localStorage.clear();
    input.value = " ";
  }
});

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
// for trigonometry button
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("shown");
  document.getElementById("rotate").classList.toggle("rotate");
}
// for Function button
function myFunction2() {
  document.getElementById("myDropdown2").classList.toggle("shown");
  document.getElementById("rotate2").classList.toggle("rotate");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("shown")) {
        openDropdown.classList.remove("shown");
        document.getElementById("rotate").classList.remove("rotate");
        document.getElementById("rotate2").classList.remove("rotate");
      }
    }
  }
};

// toggle 2nd to 1st and change the button respectivly
function featureToggle() {
  let unit = document.getElementById("otherFun").innerText;

  if (unit == "2nd") {
    document.getElementById("restTo3").style.display = "block";
    document.getElementById("cuberoot").style.display = "block";
    document.getElementById("y-squrroot-x").style.display = "block";
    document.getElementById("twox").style.display = "block";
    document.getElementById("xbasey").style.display = "block";
    document.getElementById("exponential").style.display = "block";

    document.getElementById("restTo2").style.display = "none";
    document.getElementById("squrroot").style.display = "none";
    document.getElementById("x-restTo-y").style.display = "none";
    document.getElementById("tenx").style.display = "none";
    document.getElementById("log").style.display = "none";
    document.getElementById("ln").style.display = "none";

    document.getElementById("otherFun").innerHTML =
      "<span>1<sup>st</sup></span>";
  } else if (unit == "1st") {
    document.getElementById("restTo3").style.display = "none";
    document.getElementById("cuberoot").style.display = "none";
    document.getElementById("y-squrroot-x").style.display = "none";
    document.getElementById("twox").style.display = "none";
    document.getElementById("xbasey").style.display = "none";
    document.getElementById("exponential").style.display = "none";

    document.getElementById("restTo2").style.display = "block";
    document.getElementById("squrroot").style.display = "block";
    document.getElementById("x-restTo-y").style.display = "block";
    document.getElementById("tenx").style.display = "block";
    document.getElementById("log").style.display = "block";
    document.getElementById("ln").style.display = "block";

    document.getElementById("otherFun").innerHTML =
      "<span>2<sup>nd</sup></span>";
  }
}

// function for floor value
const floor = () => (input.value = Math.floor(Number(input.value)).toString());

// function for ceil value
const ceil = () => (input.value = Math.ceil(Number(input.value)).toString());

// function for any value rest to 2
const restTo_2 = () =>
  (input.value = Math.pow(Number(input.value), 2).toString());

// function for any value rest to 3
const restTo_3 = () =>
  (input.value = Math.pow(Number(input.value), 3).toString());

// function for 1 divide any value
const by_x = () => (input.value = 1 / Number(input.value).toString());

// function for absolute value
const absolute = () => (input.value = Math.abs(Number(input.value)).toString());

// function for exponential value
const exponential = () =>
  (input.value = Math.exp(Number(input.value)).toString());

// function for squre root
const squr_root = () =>
  (input.value = Math.sqrt(Number(input.value)).toString());

// function for cube root
const cube_root = () =>
  (input.value = Math.cbrt(Number(input.value)).toString());

// function for 10 rest to any value
const ten_x = () =>
  (input.value = Math.pow(10, Number(input.value)).toString());

// function for 2 rest to any value
const two_x = () => (input.value = Math.pow(2, Number(input.value)).toString());

// change text sign + into - or vice-versa
const changeSign = () => {
  if (input.value.charAt(0) == "-") {
    input.value = "" + input.value.slice(1);
  } else {
    input.value = "-" + input.value;
  }
};

// calculate factorial for given value
fact.addEventListener("click", function () {
  let int = Number(input.value);
  if (int == 0 || int == 1) {
    int = 1;
  } else {
    for (var i = int - 1; i >= 1; i--) {
      int *= i;
    }
  }
  input.value = int.toString();
});

// this erase one value from the back of any displayed value
backspace.addEventListener("click", function () {
  let temp = input.value;
  temp = temp.slice(0, temp.length - 1);
  input.value = temp;
});

// this event handle equal sign
result.addEventListener("click", function () {
  let ans = evaluate(input.value);
  input.value = ans;
});

// function for handle keyboard input
const getText = (e) => {
  let key;
  if (window.event) {
    key = e.keyCode;
    if (key == 13) {
      let ans = evaluate(input.value);
      input.value = ans;
    }
  }
};

// evaluate expression displayed on screen
const evaluate = (expr) => {
  if (isNaN(Number(expr))) {
    if (parens.test(expr)) {
      let newExpr = expr.replace(parens, function (match, subExpr) {
        return evaluate(subExpr);
      });
      return evaluate(newExpr);
    } else if (div.test(expr)) {
      let newExpr = expr.replace(div, function (match, a, b) {
        return Number(a) / Number(b);
      });
      return evaluate(newExpr);
    } else if (mul.test(expr)) {
      let newExpr = expr.replace(mul, function (match, a, b) {
        return Number(a) * Number(b);
      });
      return evaluate(newExpr);
    } else if (add.test(expr)) {
      let newExpr;
      if (expr.charAt(0) == "-") {
        let arr = expr.split("+");
        newExpr = (Number(arr[0]) + Number(arr[1])).toString();
        return newExpr;
      } else {
        newExpr = expr.replace(add, function (match, a, b) {
          return Number(a) + Number(b);
        });
      }
      return evaluate(newExpr);
    } else if (sub.test(expr)) {
      let newExpr;
      if (expr.charAt(0) == "-") {
        let index = expr.lastIndexOf("-");
        let arr = [expr.slice(0, index), expr.slice(index + 1)];
        newExpr = (Number(arr[0]) - Number(arr[1])).toString();
        return newExpr;
      } else {
        newExpr = expr.replace(sub, function (match, a, b) {
          return Number(a) - Number(b);
        });
      }
      return evaluate(newExpr);
    } else if (mode.test(expr)) {
      let newExpr = expr.replace(mode, function (match, a, b) {
        return Number(a) % Number(b);
      });
      return evaluate(newExpr);
    } else if (squr.test(expr)) {
      let newExpr = expr.replace(squr, function (match, a, b) {
        return Math.pow(Number(a), Number(b));
      });
      return evaluate(newExpr);
    } else if (tan.test(expr)) {
      let ans = Math.tan((Number(expr.slice(3)) * Math.PI) / 180)
        .toFixed(3)
        .toString();
      if (ans.length > 6) {
        return evaluate("Not Defined");
      }
      return evaluate(ans);
    } else if (sin.test(expr)) {
      let ans = Math.sin((Number(expr.slice(3)) * Math.PI) / 180);
      return evaluate(ans.toFixed(3).toString());
    } else if (cos.test(expr)) {
      let ans = Math.cos((Number(expr.slice(3)) * Math.PI) / 180);
      return evaluate(ans.toFixed(3).toString());
    } else if (arcTan.test(expr)) {
      let ans = (Math.atan(Number(expr.slice(6))) * 180) / Math.PI;
      return evaluate(ans.toFixed(2).toString() + "°");
    } else if (arcSin.test(expr)) {
      let ans = (Math.asin(Number(expr.slice(6))) * 180) / Math.PI;

      return evaluate(ans.toFixed(2).toString() + "°");
    } else if (arcCos.test(expr)) {
      let ans = (Math.acos(Number(expr.slice(6))) * 180) / Math.PI;

      return evaluate(ans.toFixed(2).toString() + "°");
    } else if (root.test(expr)) {
      let newExpr = expr.replace(root, function (match, a, b) {
        return Math.pow(Number(b), 1 / Number(a));
      });
      return evaluate(newExpr);
    } else if (ylogx.test(expr)) {
      console.log("ylogx");
      let newExpr = expr.replace(ylogx, function (match, a, b) {
        return Math.log10(Number(b)) / Math.log10(Number(a));
      });
      return evaluate(newExpr);
    } else if (log.test(expr)) {
      let ans = Math.log10(Number(expr.slice(3)));
      return evaluate(ans.toFixed(11).toString());
    } else if (ln.test(expr)) {
      let ans = Math.log(Number(expr.slice(2)));
      return evaluate(ans.toFixed(11).toString());
    } else {
      alert("invalid input");
      return "";
    }
  }
  return Number(expr);
};

// this event for clear screen
clear.addEventListener("click", () => {
  input.value = "";
});
