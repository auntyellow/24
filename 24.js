var CONST_A = Math.PI;
var CONST_B = Math.E;
var CONST_C = Math.log(Math.PI);
var CONST_D = Math.atan(Math.E);
var ABCD = ["a", "b", "c", "d"];
var OPERATORS = ["+", "-", "*", "/"];

var PARENTHESES = ["((oxo)xo)xo", "(ox(oxo))xo", "(oxo)x(oxo)", "ox((oxo)xo)", "ox(ox(oxo))"];
var POSITIONS_ABCD = [], POSITIONS_AABC = [], POSITIONS_AABB = [], POSITIONS_AAAB = [], POSITIONS_AAAA = [];

function setPositionsArray(position) {
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

var allPositions = [];
for (var h = 0; h < 4; h ++) { // a
  for (var i = 0; i < 4; i ++) { // b
    for (var j = 0; j < 4; j ++) { // c
      for (var k = 0; k < 4; k ++) { // d
        setPositionsArray([ABCD[h], ABCD[i], ABCD[j], ABCD[k]]);
      }
    }
  }
}


alert(POSITIONS_ABCD);
alert(POSITIONS_AABC);
alert(POSITIONS_AABB);
alert(POSITIONS_AAAB);
alert(POSITIONS_AAAA);