var a = 2, b = 3, c = 6, d = 12;

for (var i = 0; i < EXPRESSIONS_ABCD.length; i ++) {
  var value = EXPRESSIONS_ABCD[i];
  value = value.split("a").join(a);
  value = value.split("b").join(b);
  value = value.split("c").join(c);
  value = value.split("d").join(d);
  if (Math.abs(eval(value) - 24) < 0.000001) {
    document.write(value + "<br>");
  }
}