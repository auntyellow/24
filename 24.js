function parse(s) {
  switch (s.toUpperCase()) {
  case "A":
    return 1;
  case "J":
    return 11;
  case "Q":
    return 12;
  case "K":
    return 13;
  }
  var n = parseInt(s);
  if (isNaN(n) || n < 1 || n > 13) {
    alert("Invalid Input: " + s);
    return 0;
  }
  return n;
}

function calc(expressions, na, nb, nc, nd) {
  var solutions = [];
  for (var i = 0; i < expressions.length; i ++) {
    var value = expressions[i];
    value = value.split("a").join(na);
    value = value.split("b").join(nb);
    value = value.split("c").join(nc);
    value = value.split("d").join(nd);
    if (Math.abs(eval(value) - 24) < 0.000001) {
      solutions.push(value + "=24");
    }
  }
  output.innerHTML = solutions.length + " Solutions<br>" + solutions.join("<br>");
}

function calculate() {
  var ns = [parse(input_a.value), parse(input_b.value), parse(input_c.value), parse(input_d.value)];
  if (ns.indexOf(0) >= 0) {
    return;
  }
  ns.sort();
  var n0 = ns[0];
  var n1 = ns[1];
  var n2 = ns[2];
  var n3 = ns[3];
  if (n0 == n1) {
    if (n1 == n2) {
      if (n2 == n3) {
        // n0 = n1 = n2 = n3
        calc(EXPRESSIONS_AAAA, n0, 0, 0, 0);
      } else {
        // n0 = n1 = n2 < n3
        calc(EXPRESSIONS_AAAB, n0, n3, 0, 0);
      }
    } else if (n2 == n3) {
      // n0 = n1 < n2 = n3
      calc(EXPRESSIONS_AABB, n0, n2, 0, 0);
    } else {
      // n0 = n1 < n2 < n3
      calc(EXPRESSIONS_AABC, n0, n2, n3, 0);
    }
  } else if (n1 == n2) {
    if (n2 == n3) {
      // n0 < n1 = n2 = n3
      calc(EXPRESSIONS_AAAB, n1, n0, 0, 0);
    } else {
      // n0 < n1 = n2 < n3
      calc(EXPRESSIONS_AABC, n1, n0, n3, 0);
    }
  } else if (n2 == n3) {
    // n0 < n1 < n2 = n3
    calc(EXPRESSIONS_AABC, n2, n0, n1, 0);
  } else {
    // n0 < n1 < n2 < n3
    calc(EXPRESSIONS_ABCD, n0, n1, n2, n3);
  }
}