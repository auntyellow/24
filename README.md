# 24 Game Solver
[24 Game](https://en.wikipedia.org/wiki/24_Game) Solver: gives you all dissimilar solutions. [Try it!](http://ns1.xqbase.com:8080/24.html)

## Similar Solutions
For example, for the card with the numbers 2, 3, 6, Q(12), possible solutions are:

    2 + 4 + 6 + 12 = 24
    4 × 6 ÷ 2 + 12 = 24
    12 ÷ 4 × (6 + 2) = 24
    ...

Here similar solutions are filtered out, e.g.

    2 + 4 + 6 + 12 = 24
    (12 + 6) + (4 + 2) = 24   // associativity
    4 × 6 ÷ 2 + 12 = 24
    6 ÷ 2 × 4 + 12 = 24       // commutativity

We have other similar situations, e.g.

    4 × 6 + 5 - 5 = 24
    4 × 6 × 5 / 5 = 24        // useless duplicated numbers

    12 × (13 × 1 - 11) = 24
    12 × (13 ÷ 1 - 11) = 24   // useless 1

    (2 + 2) × (3 + 3) = 24
    2 × 2 × (3 + 3) = 24      // 2 + 2 = 2 × 2

    (2 × 6 - 6) × 4 = 24
    (6 + 6) ÷ 2 × 4 = 24      // 2 × a - a = (a + a) ÷ 2

## Algorithms
We need a set of all inequivalent expressions involving 4 operands. E.g. `a × b ÷ c + d = d + a ÷ c × b`, so we have `a × b ÷ c + d` in this set but not `d + a ÷ c × b`.

We listed all expressions by combination of parenthesis skeletons, operand positions and operators. Then we tested each expression with 4 transcendental numbers (**π**, **e**, **ln π** and **arctan e**). Equivalent expressions always have same result, and vice versa. Finally, we found out 1,170 (matches with sequence [A140606](http://oeis.org/A140606)) inequivalent expressions.

For 4 different numbers (`a, b, c, d`), we can test each expression to check whether it equals to 24. E.g. `2, 3, 6, 12`, there are `a + b + c + d`, `b × c ÷ a + d` and other 8 expressions match to 24.

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
* 2, 2, a, b // 2 + 2 = 2 × 2
* 2, 2, a, a
* 1, 2, 2, a
* 2, a, a, b // 2 × a - a = (a + a) ÷ 2

In our JavaScript programs, [pregen.js](https://github.com/auntyellow/24/blob/master/pregen.js) generated these sets of inequivalent expressions and saved as [24-expressions.js](https://github.com/auntyellow/24/blob/master/24-expressions.js). [24.js](https://github.com/auntyellow/24/blob/master/pregen.js) just decides which set is used and find out all matched expressions.

For situation `a, a', b, c` where `a' = a + 1`, we must consider that `a' - a` may be useless. So we must filter out all expressions that contain `(a' - a) ×`, `× (a' - a)` and `÷ (a' - a)`, then try `b + c` and `b × c` in addition.

## Defects

`1, 1, 5, 5` has only one dissimilar solution, because we regard `(a + 1) × (a - 1)` and `a × a - 1 × 1` as the same.

`2, 4, 6, 6` has a pair of solutions that seems similar: `(6 - (4 - 2)) × 6` (A) and `(6 - 4 ÷ 2) × 6` (B), but we have not considered `4 - 2` similar to `4 ÷ 2`.

`2, 4, 6, 6` has another pair of solutions that seems similar: `(6 - 4 + 2) × 6` (C) and `(6 - 4) × 2 × 6` (D), but we have not considered `(a" - a) + 2` similar to `(a" - a) × 2` where `a" = a + 2`.

It is hard to implement the above two considerations, because A is similar to C obviously but B is not similar to D at all.

## Combination with the most solutions
`2, 4, 8, 10` has 11 solutions:

	10 + 8 + 4 + 2 = 24
	(10 - 4) × 8 ÷ 2 = 24
	(10 × 4 + 8) ÷ 2 = 24
	((10 + 2) × 8 ÷ 4 = 24
	10 × 2 + 8 - 4 = 24
	(10 - 2) × 4 - 8 = 24
	8 × 4 - 10 + 2 = 24
	(8 ÷ 4 + 10) × 2 = 24
	(8 × 2 - 10) × 4 = 24
	(10 - 8 ÷ 2)) × 4 = 24
	10 × 4 - 8 × 2 = 24

## Combinations with fraction solution(s) only

    1, 3, 4, 6
    1, 4, 5, 6 (2 solutions)
    1, 5, 5, 5
    1, 6, 6, 8
	1, 8, 12, 12
	2, 2, 11, 11
	2, 2, 13, 13
	2, 3, 5, 12
	2, 4, 10, 10
	2, 5, 5, 10
	2, 7, 7, 10
	3, 3, 7, 7
	3, 3, 8, 8
	4, 4, 7, 7
	5, 5, 7, 11
	5, 7, 7, 11

## Solutions with large number as intermediate step

    1, 7, 13, 13
    6, 12, 12, 13
    1, 6, 11, 13
    6, 11, 12, 12
    5, 10, 10, 13
    1, 5, 11, 11
    5, 10, 10, 11
    4, 8, 8, 13
    4, 4, 10, 10
    4, 8, 8, 11
    6, 9, 9, 10
    3, 8, 8, 10
    3, 5, 7, 13
    3, 6, 6, 11
    1, 2, 7, 7
    5, 8, 9, 13
    5, 9, 10, 11
    4, 7, 11, 13
    4, 9, 11, 11
    4, 10, 10, 11
    6, 7, 7, 11
    3, 5, 8, 13
    5, 5, 8, 11
    2, 3, 13, 13

Combinations with `a × b - a × c = 24` are not listed.