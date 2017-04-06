function solve1(expressions, na, nb, nc, nd, na1, nb1, na2, na3) {
  var solutions = [];
  for (var i = 0; i < expressions.length; i ++) {
    var value = expressions[i];
    value = value.split("a'''").join(na3);
    value = value.split("a''").join(na2);
    value = value.split("a'").join(na1);
    value = value.split("a").join(na);
    value = value.split("b'").join(nb1);
    value = value.split("b").join(nb);
    value = value.split("c").join(nc);
    value = value.split("d").join(nd);
    if (Math.abs(eval(value) - 24) < 0.000001) {
      solutions.push(value + "=24");
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
        // n0 = n1 = n2 = n3
        return solve1(EXP_AAAA, n0);
      }
      // n0 = n1 = n2 < n3
      if (n3 - n0 == 1) {
        return solve1(EXP_AAA1, n0, 0, 0, 0, n3);
      }
      return solve1(EXP_AAAB, n0, n3);
    }
    if (n2 == n3) {
      // n0 = n1 < n2 = n3
      if (n2 - n1 == 1) {
        return solve1(EXP_AA11, n0, 0, 0, 0, n2);
      }
      return solve1(EXP_AABB, n0, n2);
    }
    // n0 = n1 < n2 < n3
    return solve1(EXP_AABC, n0, n2, n3);
  }
  if (n1 == n2) {
    if (n2 == n3) {
      // n0 < n1 = n2 = n3
      return solve1(EXP_AAAB, n1, n0);
    }
    // n0 < n1 = n2 < n3
    return solve1(EXP_AABC, n1, n0, n3);
  }
  if (n2 == n3) {
    // n0 < n1 < n2 = n3
    return solve1(EXP_AABC, n2, n0, n1);
  }
  // n0 < n1 < n2 < n3
  return solve1(EXP_ABCD, n0, n1, n2, n3);
}