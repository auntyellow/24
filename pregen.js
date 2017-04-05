var CONST_A = Math.PI;
var CONST_B = Math.E;
var CONST_C = Math.log(Math.PI);
var CONST_D = Math.atan(Math.E);
var ABCD = ["a", "b", "c", "d"];
var OPERATORS = ["+", "-", "*", "/"];

var PARENTHESES = ["((oxo)xo)xo", "(ox(oxo))xo", "(oxo)x(oxo)", "ox((oxo)xo)", "ox(ox(oxo))"];
var POSITIONS_ABCD = [], POSITIONS_AABC = [], POSITIONS_AABB = [], POSITIONS_AAAB = [], POSITIONS_AAAA = [];

function setPositions(position) {
  var na = 0; nb = 0; nc = 0; nd = 0;
  for (var i = 0; i < 4; i ++) {
    switch (position[i]) {
    case "a":
       na ++;
       break;
    case "b":   
       nb ++;
       break;
    case "c":   
       nc ++;
       break;
    case "d":   
       nd ++;
       break;
    }
  }
  if (na == 4) {
    POSITIONS_AAAA.push(position);
  } else if (na == 3) {
    if (nb == 1) {
      POSITIONS_AAAB.push(position);
    }
  } else if (na == 2) {
    if (nb == 2) {
      POSITIONS_AABB.push(position);
    } else if (nb == 1 && nc == 1) {
      POSITIONS_AABC.push(position);
    }
  } else if (na == 1) {
    if (nb == 1 && nc == 1) {
      POSITIONS_ABCD.push(position);
    }
  }
}

for (var h = 0; h < 4; h ++) { // a
  for (var i = 0; i < 4; i ++) { // b
    for (var j = 0; j < 4; j ++) { // c
      for (var k = 0; k < 4; k ++) { // d
        setPositions([ABCD[h], ABCD[i], ABCD[j], ABCD[k]]);
      }
    }
  }
}

// Expressions = Parentheses x Positions x Operators
var EXPRESSIONS_ABCD = [], EXPRESSIONS_AABC = [], EXPRESSIONS_AABB = [], EXPRESSIONS_AAAB = [], EXPRESSIONS_AAAA = []; 

function setExpressions(expressions, positions) {
  var valueMap = {};
  for (var i = 0; i < PARENTHESES.length; i ++) {
    var parentheses = PARENTHESES[i];
    for (var j = 0; j < positions.length; j ++) {
      var position = parentheses;
      var posArray = positions[j];
      for (var k = 0; k < 4; k ++) {
        position = position.replace("o", posArray[k]);
      }
      for (var k = 0; k < OPERATORS.length; k ++) {
        for (var m = 0; m < OPERATORS.length; m ++) {
          for (var n = 0; n < OPERATORS.length; n ++) {
            var expression = position;
            expression = expression.replace("x", OPERATORS[k]);
            expression = expression.replace("x", OPERATORS[m]);
            expression = expression.replace("x", OPERATORS[n]);
            var value = expression;
            value = value.split("a").join(CONST_A);
            value = value.split("b").join(CONST_B);
            value = value.split("c").join(CONST_C);
            value = value.split("d").join(CONST_D);
            value = eval(value);
            if (isNaN(value)) {
              continue;
            }
            valueMap["_" + Math.floor(value * 1000000)] = expression;
          }
        }
      }
    }
  }
  for (var value in valueMap) {
    expressions.push(valueMap[value]);
  }
}

setExpressions(EXPRESSIONS_ABCD, POSITIONS_ABCD);
setExpressions(EXPRESSIONS_AABC, POSITIONS_AABC);
setExpressions(EXPRESSIONS_AABB, POSITIONS_AABB);
setExpressions(EXPRESSIONS_AAAB, POSITIONS_AAAB);
setExpressions(EXPRESSIONS_AAAA, POSITIONS_AAAA);

document.write("var EXPRESSIONS_ABCD = [<br>&nbsp;&nbsp;\"" + EXPRESSIONS_ABCD.join("\",<br>&nbsp;&nbsp;\"") + "\"<br>];<br><br>");
document.write("var EXPRESSIONS_AABC = [<br>&nbsp;&nbsp;\"" + EXPRESSIONS_AABC.join("\",<br>&nbsp;&nbsp;\"") + "\"<br>];<br><br>");
document.write("var EXPRESSIONS_AABB = [<br>&nbsp;&nbsp;\"" + EXPRESSIONS_AABB.join("\",<br>&nbsp;&nbsp;\"") + "\"<br>];<br><br>");
document.write("var EXPRESSIONS_AAAB = [<br>&nbsp;&nbsp;\"" + EXPRESSIONS_AAAB.join("\",<br>&nbsp;&nbsp;\"") + "\"<br>];<br><br>");
document.write("var EXPRESSIONS_AAAA = [<br>&nbsp;&nbsp;\"" + EXPRESSIONS_AAAA.join("\",<br>&nbsp;&nbsp;\"") + "\"<br>];<br><br>");