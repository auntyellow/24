import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;

class Answer {
	int[] numbers;
	List<String> solutions;
}

public class SolveAll {
	public static void main(String[] args) {
		ScriptEngine engine = new ScriptEngineManager().
				getEngineByMimeType("application/javascript");
		TreeMap<Integer, List<Answer>> answersMap = new TreeMap<>();
		List<Answer> larges = new ArrayList<>();
		List<Answer> fractionals = new ArrayList<>();
		for (int h = 1; h <= 13; h ++) {
			System.out.print("Solve [" + h + ", ... ");
			for (int i = h; i <= 13; i ++) {
				for (int j = i; j <= 13; j ++) {
					for (int k = j; k <= 13; k ++) {
						Answer a = new Answer();
						a.numbers = new int[] {h, i, j, k};
						a.solutions = Solver.solve(a.numbers);
						Integer size = Integer.valueOf(a.solutions.size());
						List<Answer> answers = answersMap.get(size);
						if (answers == null) {
							answers = new ArrayList<>();
							answersMap.put(size, answers);
						}
						answers.add(a);
						int fracts = 0;
						for (String solution : a.solutions) {
							// Find large solution
							// ((oxo)xo)xo,(xo(oxo))xo,(oxo)x(oxo),xo((oxo)xo),xo(ox(oxo))
							// Find fractional solution
							int slash = 0;
							while ((slash = solution.indexOf('/', slash + 1)) >= 0) {
								if (solution.charAt(slash - 1) == ')' ||
										solution.charAt(slash + 1) == '(') {
									continue;
								}
								int leftPar = solution.lastIndexOf('(', slash - 1);
								int rightPar = solution.indexOf(')', slash + 1);
								if (leftPar < 0 || rightPar < 0) {
									continue;
								}
								int numerator = Integer.parseInt(solution.
										substring(leftPar + 1, slash));
								int denominator = Integer.parseInt(solution.
										substring(slash + 1, rightPar));
								if (numerator % denominator != 0) {
									fracts ++;
									break;
								}
							}
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
		for (Answer a : fractionals) {
			System.out.println(Arrays.toString(a.numbers) +
					" has fractional solution(s) only");
			a.solutions.forEach(s -> System.out.println(s + "=24"));
		}
	}
}