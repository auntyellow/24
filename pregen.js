var CONST_A = Math.PI;
var CONST_B = Math.E;
var CONST_C = Math.log(Math.PI);
var CONST_D = Math.atan(Math.E);
var PARENTHESES = ["((oxo)xo)xo", "(ox(oxo))xo", "(oxo)x(oxo)", "ox((oxo)xo)", "ox(ox(oxo))"];
var PARENTHESES_3 = ["(oxo)xo", "ox(oxo)"];
var OPERATORS = ["+", "-", "*", "/"];

// Expressions = Parentheses x Positions x Operators
function writeExp(name, sa, sb, sc, sd) {
  var posMap = {};
  var ss = [sa, sb, sc, sd];
  for (var h = 0; h < 4; h ++) { // a
    for (var i = 0; i < 4; i ++) { // b
      if (i == h) {
        continue;
      }
      for (var j = 0; j < 4; j ++) { // c
        if (j == h || j == i) {
          continue;
        }
        for (var k = 0; k < 4; k ++) { // d
          if (k == h || k == i || k == j) {
            continue;
          }
          posMap[ss[h] + "," + ss[i] + "," + ss[j] + "," + ss[k]] = true;
        }
      }
    }
  }

  var valueMap = {};
  for (var i = 0; i < PARENTHESES.length; i ++) {
    var parentheses = PARENTHESES[i];
    for (var posKey in posMap) {
      var posArray = posKey.split(",");
      var position = parentheses;
      for (var j = 0; j < 4; j ++) {
        position = position.replace("o", posArray[j]);
      }
      for (var j = 0; j < OPERATORS.length; j ++) {
        for (var k = 0; k < OPERATORS.length; k ++) {
          for (var m = 0; m < OPERATORS.length; m ++) {
            var expression = position;
            expression = expression.replace("x", OPERATORS[j]);
            expression = expression.replace("x", OPERATORS[k]);
            expression = expression.replace("x", OPERATORS[m]);
            var value = expression;
            value = value.split("a").join(CONST_A);
            value = value.split("b").join(CONST_B);
            value = value.split("c").join(CONST_C);
            value = value.split("d").join(CONST_D);
            value = eval(value);
            if (isNaN(value)) {
              continue;
            }
            var key = "_" + Math.floor(value * 1000000);
            var old = valueMap[key];
            if (typeof old == "string") {
              var oldSlashes = old.split("/").length;
              var newSlashes = expression.split("/").length;
              if (newSlashes < oldSlashes) {
                valueMap[key] = expression;
              }
            } else {
              valueMap[key] = expression;
            }
          }
        }
      }
    }
  }
  var expressions = [];
  for (var value in valueMap) {
    expressions.push(valueMap[value]);
  }
  document.write("var " + name + " = [<br>&nbsp;&nbsp;\"" + expressions.join("\",<br>&nbsp;&nbsp;\"") + "\"<br>];<br><br>");
}

writeExp("EXP_ABCD", "a", "b", "c", "d");
writeExp("EXP_AABC", "a", "a", "b", "c");
writeExp("EXP_AABB", "a", "a", "b", "b");
writeExp("EXP_AAAB", "a", "a", "a", "b");
writeExp("EXP_AAAA", "a", "a", "a", "a");

writeExp("EXP_1ABC", "a", "b", "c", "1");
writeExp("EXP_1AAB", "a", "a", "b", "1");
writeExp("EXP_1AAA", "a", "a", "a", "1");
writeExp("EXP_11AB", "a", "b", "1", "1");
writeExp("EXP_11AA", "a", "a", "1", "1");
writeExp("EXP_111A", "a", "1", "1", "1");

writeExp("EXP_22AB", "a", "b", "2", "2");
writeExp("EXP_22AA", "a", "a", "2", "2");
writeExp("EXP_122A", "a", "2", "2", "1");
writeExp("EXP_2AAB", "a", "a", "b", "2");

document.write("var EXP_AB = [\"a+b\", \"a*b\"];<br><br>");
document.write("var EXP_AA = [\"a+a\"];<br><br>");