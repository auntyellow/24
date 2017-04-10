import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

class Answer {
	int[] numbers;
	List<String> solutions;
}

public class SolveAll {
	private static ScriptEngine engine = new ScriptEngineManager().
			getEngineByMimeType("application/javascript");

	private static <K, V> void put(TreeMap<K, List<V>> map,
			K key, V value) {
		List<V> values = map.get(key);
		if (values == null) {
			values = new ArrayList<>();
			map.put(key, values);
		}
		values.add(value);
	}

	private static int abs(String expression) {
		try {
			return Math.abs((int) Math.floor(((Number) engine.
					eval(expression)).doubleValue() + .5));
		} catch (ScriptException e) {
			throw new RuntimeException(e);
		}
	}

	public static void main(String[] args) {
		TreeMap<Integer, List<Answer>> answersMap = new TreeMap<>();
		TreeMap<Integer, List<Answer>> largestMap = new TreeMap<>(Comparator.reverseOrder());
		List<Answer> fractionals = new ArrayList<>();
		for (int h = 1; h <= 13; h ++) {
			System.out.print("Solve [" + h + ", ... ");
			for (int i = h; i <= 13; i ++) {
				for (int j = i; j <= 13; j ++) {
					for (int k = j; k <= 13; k ++) {
						Answer a = new Answer();
						a.numbers = new int[] {h, i, j, k};
						a.solutions = Solver.solve(a.numbers);
						put(answersMap, Integer.valueOf(a.solutions.size()), a);
						int fracts = 0;
						int m = Integer.MAX_VALUE;
						for (String solution : a.solutions) {
							// 1 Find large number as intermediate step
							// ((oxo)xo)xo,(xo(oxo))xo,(oxo)x(oxo),xo((oxo)xo),xo(ox(oxo))
							int leftPar1 = solution.indexOf('(');
							int leftPar2 = solution.indexOf('(', leftPar1 + 1);
							if (leftPar2 < 0) {
								// 1.1 Filter oxo*(a'-a)
								m = 0;
								continue;
							}
							int rightPar2 = solution.lastIndexOf(')');
							int rightPar1 = solution.lastIndexOf(')', rightPar2 - 1);
							if (rightPar1 < 0) {
								throw new RuntimeException("Missing ')': " + solution);
							}
							if (rightPar1 < leftPar2) {
								if (m == 0) {
									continue;
								}
								// 1.2 Filter (oxo)-(oxo)
								if (solution.charAt(rightPar1 + 1) != '-') {
									m = 0;
									continue;
								}
								String left = solution.substring(leftPar1 + 1, rightPar1);
								String right = solution.substring(leftPar2 + 1, rightPar2);
								int leftMul = left.indexOf('*');
								int rightMul = right.indexOf('*');
								if (leftMul < 0 || rightMul < 0) {
									m = 0;
									continue;
								}
								int n1 = Integer.parseInt(left.substring(0, leftMul));
								int n2 = Integer.parseInt(left.substring(leftMul + 1));
								int n3 = Integer.parseInt(right.substring(0, rightMul));
								int n4 = Integer.parseInt(right.substring(rightMul + 1));
								if (n1 == n3 || n2 == n3 || n1 == n4 || n2 == n4) {
									m = 0;
									continue;
								}
								m = Math.min(m, Math.max(abs(left), abs(right)));
								continue;
							}
							if (leftPar1 == 0 && solution.charAt(rightPar2 + 1) == '/') {
								// 1.3 Filter ((oxo)*o)/o and (o*(oxo))/o
								if (leftPar2 == 1) {
									if (solution.charAt(rightPar1 + 1) == '*') {
										m = 0;
									}
								} else if (solution.charAt(leftPar2 - 1) == '*') {
									m = 0;
								}
							}
							if (m > 0) {
								String outer = solution.substring(leftPar1 + 1, rightPar2);
								String inner = solution.substring(leftPar2 + 1, rightPar1);
								int slash = inner.length() + 2;
								if (outer.startsWith("(" + inner) && outer.charAt(slash) == '/') {
									int mul = inner.indexOf('*');
									if (mul < 0) {
										m = 0;
									} else {
										int n1 = Integer.parseInt(inner.substring(0, mul));
										int n2 = Integer.parseInt(inner.substring(mul + 1));
										int n3 = Integer.parseInt(outer.substring(slash + 1));
										if (n1 % n3 == 0 || n2 % n3 == 0) {
											m = 0;
										}
									}
								}
								if (m > 0) {
									m = Math.min(m, Math.max(abs(outer), abs(inner)));
								}
							}
							// 2 Find fractional solution
							int slash = solution.indexOf('/', leftPar2 + 1);
							if (slash < 0 || slash > rightPar1) {
								continue;
							}
							int numerator = Integer.parseInt(solution.
									substring(leftPar2 + 1, slash));
							int denominator = Integer.parseInt(solution.
									substring(slash + 1, rightPar1));
							if (numerator % denominator != 0) {
								fracts ++;
							}
						}
						if (a.solutions.size() > 0) {
							put(largestMap, Integer.valueOf(m), a);
						}
						if (fracts > 0 && fracts == a.solutions.size()) {
							fractionals.add(a);
						}
					}
				}
			}
			System.out.println("Done.");
		}
		for (Answer a : answersMap.lastEntry().getValue()) {
			System.out.println(Arrays.toString(a.numbers) +
					" has " + a.solutions.size() + " solution(s)");
			a.solutions.forEach(s -> System.out.println(s + "=24"));
		}
		Map.Entry<Integer, List<Answer>> entry = answersMap.firstEntry();
		System.out.println(entry.getValue().size() +
				" combinations have " + entry.getKey() + " solution");
		System.out.println(fractionals.size() +
				" combinations have fractional solution(s) only");
		for (Answer a : fractionals) {
			System.out.println(Arrays.toString(a.numbers) +
					" has fractional solution(s) only");
			a.solutions.forEach(s -> System.out.println(s + "=24"));
		}
		for (Map.Entry<Integer, List<Answer>> entry_ : largestMap.entrySet()) {
			int m = entry_.getKey().intValue();
			if (m <= 36) {
				break;
			}
			for (Answer a : entry_.getValue()) {
				System.out.println(Arrays.toString(a.numbers) +
						" has a large number " + m + " as intermediate step");
				a.solutions.forEach(s -> System.out.println(s + "=24"));
			}
		}
	}
}