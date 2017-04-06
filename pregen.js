var CONST_A = Math.PI;
var CONST_A1 = Math.PI + 1;
var CONST_A2 = Math.PI + 2;
var CONST_A3 = Math.PI + 3;
var CONST_B = Math.E;
var CONST_B1 = Math.E + 1;
var CONST_C = Math.log(Math.PI);
var CONST_D = Math.atan(Math.E);
var PARENTHESES = ["((oxo)xo)xo", "(ox(oxo))xo", "(oxo)x(oxo)", "ox((oxo)xo)", "ox(ox(oxo))"];
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
            value = value.split("a'''").join(CONST_A3);
            value = value.split("a''").join(CONST_A2);
            value = value.split("a'").join(CONST_A1);
            value = value.split("a").join(CONST_A);
            value = value.split("b'").join(CONST_B1);
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
  var expressions = [];
  for (var value in valueMap) {
    expressions.push(valueMap[value]);
  }
  document.write("var " + name + " = [<br>&nbsp;&nbsp;\"" + expressions.join("\",<br>&nbsp;&nbsp;\"") + "\"<br>];<br><br>");
}

writeExp("EXP_ABCD", "a", "b", "c", "d");
writeExp("EXP_A1BC", "a", "a'", "b", "c");
writeExp("EXP_A1B1", "a", "a'", "b", "b'");
writeExp("EXP_A12B", "a", "a'", "a''", "b");
writeExp("EXP_A123", "a", "a'", "a''", "a'''");
writeExp("EXP_AABC", "a", "a", "b", "c");
writeExp("EXP_AAB1", "a", "a", "b", "b'");
writeExp("EXP_AA1B", "a", "a", "a'", "b");
writeExp("EXP_AABB", "a", "a", "b", "b");
writeExp("EXP_AA11", "a", "a", "a'", "a'");
writeExp("EXP_AAAB", "a", "a", "a", "b");
writeExp("EXP_AAA1", "a", "a", "a", "a'");
writeExp("EXP_A111", "a", "a'", "a'", "a'");
writeExp("EXP_AAAA", "a", "a", "a", "a");

writeExp("EXP_1ABC", "1", "a", "b", "c");
writeExp("EXP_1AAB", "1", "a", "a", "b");
writeExp("EXP_1AAA", "1", "a", "a", "a");
writeExp("EXP_11AB", "1", "1", "a", "b");
writeExp("EXP_11AA", "1", "1", "a", "a");
writeExp("EXP_111A", "1", "1", "1", "a");
writeExp("EXP_22AA", "2", "2", "a", "a");
writeExp("EXP_22AB", "2", "2", "a", "b");
writeExp("EXP_122A", "1", "2", "2", "a");
writeExp("EXP_2A2B", "2", "a", "a''", "b");
writeExp("EXP_2A12", "2", "a", "a'", "a''");
writeExp("EXP_2AA2", "2", "a", "a", "a''");
writeExp("EXP_2A22", "2", "a", "a''", "a''");
writeExp("EXP_2AAB", "2", "a", "a", "b");