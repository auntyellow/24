function append(result, expressions, na, nb, nc, nd) {
  var suffix = "*(" + nc + "-" + nd + ")";
  var solutions = solve4(expressions, na, nb);
  for (var i = 0; i < solutions.length; i ++) {
    result.push(solutions[i] + suffix);
  }
  return result;
}

function filter(input, nc, nd) {
  var pattern = "(" + nc + "-" + nd + ")";
  var output = [];
  for (var i = 0; i < input.length; i ++) {
    var exp = input[i];
    var _exp_ = "(" + exp + ")";
    if (_exp_.indexOf("(" + pattern + "*") < 0 &&
        _exp_.indexOf("*" + pattern + ")") < 0 &&
        _exp_.indexOf("/" + pattern + ")") < 0) {
      output.push(exp);
    }
  }
  return output;
}

function solve4(expressions, na, nb, nc, nd) {
  var solutions = [];
  for (var i = 0; i < expressions.length; i ++) {
    var value = expressions[i];
    value = value.split("a").join(na);
    value = value.split("b").join(nb);
    value = value.split("c").join(nc);
    value = value.split("d").join(nd);
    if (Math.abs(eval(value) - 24) < 0.000001) {
      solutions.push(value);
    }
  }
  return solutions;
}

function solve(ns) {
  ns.sort(function (a,b) {return a - b});
  var n0 = ns[0];
  var n1 = ns[1];
  var n2 = ns[2];
  var n3 = ns[3];
  if (n0 == n1) {
    if (n1 == n2) {
      if (n2 == n3) {
        // n0 = n1 = n2 = n3, 3333
        return solve4(EXP_AAAA, n0);
      }
      // n0 = n1 = n2 < n3
      if (n0 == 1) {
        // 111Q
        return solve4(EXP_111A, n3);
      }
      if (n0 == 2) {
        // 2228
        return solve4(EXP_222A, n3);
      }
      // 3335
      var result = solve4(EXP_AAAB, n0, n3);
      if (n3 - n0 == 1) {
        // 3334
        return append(filter(result, n3, n0), EXP_AA, n0, 0, n3, n0);
      }
      return result;
    }
    if (n2 == n3) {
      // n0 = n1 < n2 = n3
      if (n0 == 1) {
        // 1155
        return solve4(EXP_11AA, n2);
      }
      if (n0 == 2) {
        // 2233
        return solve4(EXP_22AA, n2);
      }
      // 3355
      var result = solve4(EXP_AABB, n2, n0);
      if (n2 - n1 == 1) {
        // 4455
        return append(filter(result, n2, n0), EXP_AB, n2, n0, n3, n0);
      }
      return result;
    }
    // n0 = n1 < n2 < n3
    if (n0 == 1) {
      // 1145
      return solve4(EXP_11AB, n3, n2);
    }
    if (n0 == 2) {
      // 2245
      var result = solve4(EXP_22AB, n3, n2);
      if (n2 == 3) {
        // 223Q
        return append(filter(result, 3, 2), EXP_AB, n3, 2, 3, 2);
      }
      return result;
    }
    // 3356
    var result = solve4(EXP_AABC, n0, n3, n2);
    if (n2 - n0 == 1) {
      // 3348
      return append(filter(result, n2, n0), EXP_AB, n3, n0, n2, n0);
    }
    // n3 - n2 == 1 && n0 + n0 == 24 is impossible
    return result;
  }
  if (n1 == n2) {
    if (n2 == n3) {
      // n0 < n1 = n2 = n3
      if (n0 == 1) {
        // 1888
        return solve4(EXP_1AAA, n1);
      }
      // 2333
      return solve4(EXP_AAAB, n1, n0);
    }
    // n0 < n1 = n2 < n3
    if (n0 == 1) {
      if (n1 == 2) {
        // 1226
        return solve4(EXP_122A, n3);
      }
      // 1334
      return solve4(EXP_1AAB, n1, n3);
    }
    if (n0 == 2) {
      // 2668
      var result = solve4(EXP_2AAB, n1, n3);
      var result2 = [];
      if (n1 == 3) {
        // 2338
        result = filter(result, 3, 2);
        append(result2, EXP_AB, n3, 3, 3, 2);
      }
      if (n3 - n1 == 1) {
        // 2QQK
        result = filter(result, n3, n1);
        append(result2, EXP_AB, n1, 2, n3, n1);
      }
      // 2334
      return result.concat(result2);
    }
    // 3669
    var result = solve4(EXP_AABC, n1, n3, n0);
    var result2 = [];
    if (n1 - n0 == 1) {
      // 3446
      result = filter(result, n1, n0);
      append(result2, EXP_AB, n3, 1, n1, n0);
    }
    if (n3 - n1 == 1) {
      // 4667
      result = filter(result, n3, n1);
      append(result2, EXP_AB, n1, 0, n3, n1);
    }
    // 5667
    return result.concat(result2);
  }
  if (n2 == n3) {
    // n0 < n1 < n2 = n3
    if (n0 == 1) {
      // 1366
      var result = solve4(EXP_1AAB, n3, n1);
      if (n1 == 2) {
        // 12QQ
        return append(filter(result, 2, 1), EXP_AA, n2, 0, 2, 1);
      }
      return result;
    }
    if (n0 == 2) {
      // 2466
      var result = solve4(EXP_2AAB, n3, n1);
      var result2 = [];
      if (n1 == 3) {
        // 23QQ
        result = filter(result, 3, 2);
        append(result2, EXP_AA, n2, 0, 3, 2);
      }
      if (n2 - n1 == 1) {
        // 2JQQ
        result = filter(result, n2, n1);
        append(result2, EXP_AB, n2, 2, n2, n1);
      }
      // 2344
      return result.concat(result2);
    }
    // 4688
    var result = solve4(EXP_AABC, n2, n1, n0);
    var result2 = [];
    if (n1 - n0 == 1) {
      // 34QQ
      result = filter(result, n1, n0);
      append(result2, EXP_AA, n2, 0, n1, n0);
    }
    if (n2 - n1 == 1) {
      // 3788
      result = filter(result, n2, n1);
      append(result2, EXP_AB, n2, n0, n2, n1);
    }
    // JQKK
    return result.concat(result2);
  }
  // n0 < n1 < n2 < n3
  if (n0 == 1) {
    // 1468
    var result = solve4(EXP_1ABC, n3, n2, n1);
    if (n1 == 2) {
      // 1238
      return append(filter(result, 2, 1), EXP_AB, n3, n2, 2, 1);
    }
    return result;
  }
  // 246Q
  var result = solve4(EXP_ABCD, n3, n2, n1, n0);
  var result2 = [];
  if (n1 - n0 == 1) {
    // 34JK
    result = filter(result, n1, n0);
    append(result2, EXP_AB, n3, n2, n1, n0);
  }
  if (n2 - n1 == 1) {
    // 3568
    result = filter(result, n2, n1);
    append(result2, EXP_AB, n3, n0, n2, n1);
  }
  if (n3 - n2 == 1) {
    // 46910
    result = filter(result, n3, n2);
    append(result2, EXP_AB, n1, n0, n3, n2);
  }
  // 3458,38910,2378,5678
  return result.concat(result2);
}

function depar(solution, leftPar, rightPar) {
  var inner = solution.substring(leftPar + 1, rightPar);
  var opIndex;
  var opInner;
  if (inner.charAt(0) == "(") {
    // ...((oxo)Xo)... (X = opInner)
    opIndex = inner.indexOf(")") + 1;
  } else if (inner.charAt(inner.length - 1) == ")") {
    // ...(ox(oXo))...
    opIndex = inner.indexOf("(") - 1;
  } else {
    // ...(oXo)...
    opIndex = 1;
  }
  opInner = inner.charAt(opIndex);
  while (opInner >= "0" && opInner <= "9") {
    opIndex ++;
    opInner = inner.charAt(opIndex);
  }
  // opOuter
  var opLeft = "", opRight = "";
  if (leftPar > 0) {
    // oX(oxo)... (x = opInner, X = opOuter)
    opLeft = solution.charAt(leftPar - 1);
  }
  if (rightPar < solution.length - 1) {
    // ...(oxo)Xo
    opRight = solution.charAt(rightPar + 1);
  }
  if (opInner == "+" || opInner == "-") {
    if (opLeft == "*" || opLeft == "/" || opRight == "*" || opRight == "/") {
      return solution;
    }
    if (opLeft == "-") {
      // o-(o+o)... => o-o-o... , o-(o-o)... => o-o+o...
      inner = inner.substring(0, opIndex) +
          (opInner == "+" ? "-" : "+") + inner.substring(opIndex + 1);
    }
  } else if (opLeft == "/") {
    // o/(o*o)... => o/o/o... , o/(o/o)... => o/o*o...
    inner = inner.substring(0, opIndex) +
        (opInner == "*" ? "/" : "*") + inner.substring(opIndex + 1);
  }
  return solution.substring(0, leftPar) + inner + solution.substring(rightPar + 1);
}

function renderOp(solution) {
  return solution.split("+").join(" + ").split("-").join(" &minus; ").
      split("*").join(" &times; ").split("/").join(" &divide; ");
}

function render(solution) {
  var leftPar1 = solution.indexOf('(');
  var leftPar2 = solution.indexOf('(', leftPar1 + 1);
  var rightPar2 = solution.lastIndexOf(')');
  var rightPar1 = solution.lastIndexOf(')', rightPar2 - 1);
  if (leftPar2 < 0 || rightPar1 < 0) {
    return renderOp(depar(solution, leftPar1, rightPar2));
  }
  if (rightPar1 < leftPar2) {
    return renderOp(depar(depar(solution, leftPar2, rightPar2), leftPar1, rightPar1));
  }
  var depared = depar(solution, leftPar1, rightPar2);
  if (depared.length == solution.length) {
    var inner = depared.substring(leftPar1 + 1, rightPar2);
    depared = depared.substring(0, leftPar1) + "(" +
        depar(inner, inner.indexOf('('), inner.lastIndexOf(')')) +
        ")" + depared.substring(rightPar2 + 1);
  } else {
    depared = depar(depared, depared.indexOf('('), depared.lastIndexOf(')'));
  }
  return renderOp(depared);
}