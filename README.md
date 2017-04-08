# 24
[24 Game](https://en.wikipedia.org/wiki/24_Game) Solver: gives you all unsimilar solutions. [Try it!](http://ns.xqbase.com:8080/24.html)

## Similar Solutions
For example, for the card with the numbers 2, 3, 6, Q(12), possible solutions are:

    2 + 4 + 6 + 12 = 24
    4 ¡Á 6 ¡Â 2 + 12 = 24
    12 ¡Â 4 ¡Á (6 + 2) = 24
    ...

Here similar solutions are filtered, e.g.

    2 + 4 + 6 + 12 = 24
    (12 + 6) + (4 + 2) = 24   // associativity
    4 ¡Á 6 ¡Â 2 + 12 = 24
    6 ¡Â 2 ¡Á 4 + 12 = 24       // commutativity

We have other similar situations, e.g.

    4 ¡Á 6 + 5 - 5 = 24
    4 ¡Á 6 ¡Á 5 / 5 = 24        // useless numbers

    12 ¡Á (13 ¡Á 1 - 11) = 24
    12 ¡Á (13 ¡Â 1 - 11) = 24   // useless 1

    (2 + 2) ¡Á (3 + 3) = 24
    2 ¡Á 2 ¡Á (3 + 3) = 24      // 2 + 2 = 2 ¡Á 2

    (2 ¡Á 6 - 6) ¡Á 4 = 24
    (6 + 6) ¡Â 2 ¡Á 4 = 24      // 2 ¡Á a - a = (a + a) ¡Â 2

## Algorithms
We need a set of all inequivalent expressions involving 4 operands. E.g. `a ¡Á b ¡Â c + d = d + a ¡Â c ¡Á b`, so we have `a ¡Á b ¡Â c + d` in this set but not `d + a ¡Â c ¡Á b`.

We listed all expressions by combination of parenthesis skeletons, operand positions and operators. Then tested each expression with 4 transcendental numbers (**¦Ð**, **e**, **ln ¦Ð** and **arctan e**). Equivalent expressions always have same result, and vice versa. Finally, we found out 1,170 (matches with sequence [A140606](http://oeis.org/A140606)) inequivalent expressions.

For 4 different numbers (`a, b, c, d`), we can try for each expression to check whether it equals to 24. E.g. `2, 3, 6, Q`, there are `a + b + c + d`, `b ¡Á c ¡Â a + d` and other 8 expressions match to 24.

But this does not work for 4 numbers with 2 same `(a, b, c, c)`, or with `1` (`1, a, b, c`), or with `2`, ... So we must have other sets of inequivalent expressions:

* a, a, b, c // two a's may be commuted, or may be useless
* a, a, b, b
* a, a, a, b
* a, a, a, a
* 1, a, b, c // 1 may be useless
* 1, a, a, b
* 1, a, a, a
* 1, 1, a, b
* 1, 1, a, a
* 1, 1, 1, a
* 2, 2, a, b // 2 + 2 = 2 ¡Á 2
* 2, 2, a, a
* 1, 2, 2, a
* 2, a, a, b // 2 ¡Á a - a = (a + a) ¡Â 2

In our JavaScript programs, [pregen.js](https://github.com/auntyellow/24/blob/master/pregen.js) generated these sets of inequivalent expressions and saved as [24-expressions.js](https://github.com/auntyellow/24/blob/master/24-expressions.js). [24.js](https://github.com/auntyellow/24/blob/master/pregen.js) just decides which set is used and find out all matched expressions.

For situation `a, a', b, c` where `a' = a + 1`, 

## Known Bugs
