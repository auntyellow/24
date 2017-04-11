import java.util.Arrays;
import java.util.List;

public class Test {
	private static void test(int na, int nb, int nc, int nd, int expected) {
		int[] ns = {na, nb, nc, nd};
		List<String> solutions = Solver.solve(ns);
		System.out.println(Arrays.toString(ns) + " should have " + expected +
				" solution(s), actually " + solutions.size() + " solution(s)");
		for (String s : solutions) {
			System.out.println(s + "=24");
		}
	}

	public static void main(String[] args) {
		Solver.solve(new int[] {1, 1, 1, 1});
		long t = System.currentTimeMillis();
		// n0 = n1 = n2 = n3
		test(3, 3, 3, 3, 1);
		// n0 = n1 = n2 < n3
		test(1, 1, 1, 12, 1);
		test(3, 3, 3, 5, 1);
		test(3, 3, 3, 4, 2);
		// n0 = n1 < n2 = n3
		test(1, 1, 5, 5, 1);
		test(2, 2, 3, 3, 2);
		test(3, 3, 5, 5, 1);
		test(4, 4, 5, 5, 3);
		// n0 = n1 < n2 < n3
		test(1, 1, 4, 5, 2);
		test(2, 2, 4, 5, 4);
		test(2, 2, 3, 12, 6);
		test(3, 3, 5, 6, 7);
		test(3, 3, 4, 8, 3);
		// n0 < n1 = n2 = n3
		test(1, 8, 8, 8, 1);
		test(2, 3, 3, 3, 2);
		// n0 < n1 = n2 < n3
		test(1, 2, 2, 6, 2);
		test(1, 3, 3, 4, 3);
		test(2, 6, 6, 8, 5);
		test(2, 3, 3, 8, 3);
		test(2, 12, 12, 13, 2);
		test(2, 3, 3, 4, 0);
		test(3, 6, 6, 9, 4);
		test(3, 4, 4, 6, 5);
		test(4, 6, 6, 7, 2);
		test(5, 6, 6, 7, 4);
		// n0 < n1 < n2 = n3
		test(1, 3, 6, 6, 3);
		test(1, 2, 12, 12, 2);
		test(2, 4, 6, 6, 5);
		test(2, 3, 12, 12, 4);
		test(2, 11, 12, 12, 2);
		test(2, 3, 4, 4, 3);
		test(4, 6, 8, 8, 4);
		test(3, 4, 12, 12, 2);
		test(3, 7, 8, 8, 3);
		test(11, 12, 13, 13, 2);
		// n0 < n1 < n2 < n3
		test(1, 4, 6, 8, 3);
		test(1, 2, 3, 8, 4);
		test(2, 4, 6, 12, 10);
		test(3, 4, 11, 13, 4);
		test(3, 5, 6, 8, 3);
		test(4, 6, 9, 10, 4);
		test(3, 4, 5, 8, 6);
		test(3, 8, 9, 10, 3);
		test(2, 3, 7, 8, 4);
		test(5, 6, 7, 8, 3);
		System.out.println(System.currentTimeMillis() - t + "ms");
	}
}