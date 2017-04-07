function SUB(a, b) {
  return "(" + a + "-" + b + ")";
}

function filter(input, pattern) {
  var output = [];
  for (var i = 0; i < input.length; i ++) {
    var exp = input[i];
    if (exp.indexOf("(" + pattern + "*") < 0 &&
        exp.indexOf("*" + pattern + ")") < 0 &&
        exp.indexOf("/" + pattern + ")") < 0) {
      output.push(exp);
    }
  }
  return output;
}

function filterSub(input, nc, nd) {
  return filter(input, SUB(nc, nd));
}

function append(input, suffix) {
  var output = [];
  for (var i = 0; i < input.length; i ++) {
    output.push(input[i] + suffix);
  }
  return output;
}

function appendSub(input, nc, nd) {
  return append(input, "*" + SUB(nc, nd));
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
      var result = solve4(EXP_AAAB, n0, n3);
      if (n3 - n0 == 1) {
        // 3334
        return filterSub(result, n3, n0).concat(appendSub(solve4(EXP_AA, n0), n3, n0));
      }
      // 3335
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
      var result = solve4(EXP_AABB, n0, n2);
      if (n2 - n1 == 1) {
        // 4455
        return filterSub(result, n2, n0).concat(appendSub(solve4(EXP_AB, n0, n2), n3, n0));
      }
      // 3355
      return result;
    }
    // n0 = n1 < n2 < n3
    if (n0 == 1) {
      // 1145
      return solve4(EXP_11AB, n2, n3);
    }
    if (n0 == 2) {
      var result = solve4(EXP_22AB, n2, n3);
      if (n2 == 3) {
        // 223Q
        return filterSub(result, 3, 2).concat(appendSub(solve4(EXP_AB, 2, n3), 3, 2));
      }
      // 2245
      return result;
    }
    var result = solve4(EXP_AABC, n0, n2, n3);
    if (n2 - n0 == 1) {
      // 3348
      return filterSub(result, n2, n0).concat(appendSub(solve4(EXP_AB, n0, n3), n2, n0));
    }
    if (n3 - n2 == 1) {
      // 3356
      return filterSub(result, n3, n2).concat(appendSub(solve4(EXP_AA, n0), n3, n2));
    }
    // 3357
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
      return solve4(EXP_2AAB, n1, n3);
    }
    return solve4(EXP_AABC, n1, n0, n3);
  }
  if (n2 == n3) {
    // n0 < n1 < n2 = n3
    return solve4(EXP_AABC, n2, n0, n1);
  }
  // n0 < n1 < n2 < n3
  return solve4(EXP_ABCD, n0, n1, n2, n3);
}