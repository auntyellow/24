import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

class Answer {
	int[] numbers;
	List<String> solutions;
}

public class SolveAll {
	public static void main(String[] args) {
		TreeMap<Integer, List<Answer>> answersMap = new TreeMap<>();
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
	}
}