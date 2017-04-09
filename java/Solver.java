import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import javax.script.Compilable;
import javax.script.CompiledScript;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import javax.script.SimpleBindings;

public class Solver implements Expressions {
	private static HashMap<String, CompiledScript> scriptMap = new HashMap<>();

	static {
		Compilable engine = (Compilable) new ScriptEngineManager().
				getEngineByMimeType("text/javascript");
		for (Field field : Expressions.class.getFields()) {
			String fieldName = field.getName();
			if (!fieldName.startsWith("EXP_")) {
				continue;
			}
			System.out.print("Compiling " + fieldName + "...");
			try {
				for (String expression : (String[]) field.get(null)) {
					scriptMap.put(expression, engine.compile(expression));
				}
			} catch (ReflectiveOperationException | ScriptException e) {
				throw new RuntimeException(e);
			}
			System.out.println("Done.");
		}
	}

	private static List<String> append(List<String> input, int nc, int nd) {
		return input.stream().map(s -> s + "*(" + nc + "-" + nd + ")").
				collect(Collectors.toList());
	}

	private static List<String> filter(List<String> input, int nc, int nd) {
		String pattern = "(" + nc + "-" + nd + ")";
		return input.stream().map(s -> "(" + s + ")").filter(s ->
				s.indexOf("(" + pattern + "*") < 0 &&
				s.indexOf("*" + pattern + ")") < 0 &&
				s.indexOf("/" + pattern + ")") < 0).
				collect(Collectors.toList());
	}

	private static List<String> solve4(String[] expressions, int... n) {
		SimpleBindings bindings = new SimpleBindings();
		for (int i = 0; i < n.length; i ++) {
			bindings.put("" + (char) ('a' + i), Integer.valueOf(n[i]));
		}
		ArrayList<String> result = new ArrayList<>();
		for (String expression : expressions) {
			double val;
			try {
				val = ((Number) scriptMap.get(expression).
						eval(bindings)).doubleValue();
			} catch (ScriptException e) {
				throw new RuntimeException(e);
			}
			if (Math.abs(val - 24) < .000_001) {
				String value = expression;
				for (int i = 0; i < n.length; i ++) {
					value = value.replace("" + (char) ('a' + i), "" + n[i]);
				}
				result.add(value);
			}
		}
		return result;
	}

	public static List<String> solve(int[] ns) {
		Arrays.sort(ns);
		int n0 = ns[0];
		int n1 = ns[1];
		int n2 = ns[2];
		int n3 = ns[3];
		if (n0 == n1) {
			if (n1 == n2) {
				if (n2 == n3) {
					// n0 = n1 = n2 = n3, 3333
					return solve4(EXP_AAAA, n0);
				}
				// n0 = n1 = n2 < n3
				if (n0 == 1) {
					// 111Q
					return solve4(EXP_111A, n3);
				}
				// 3335
				List<String> result = solve4(EXP_AAAB, n0, n3);
				if (n3 - n0 == 1) {
					// 3334
					result = filter(result, n3, n0);
					result.addAll(append(solve4(EXP_AA, n0), n3, n0));
				}
				return result;
			}
			if (n2 == n3) {
				// n0 = n1 < n2 = n3
				if (n0 == 1) {
					// 1155
					return solve4(EXP_11AA, n2);
				}
				if (n0 == 2) {
					// 2233
					return solve4(EXP_22AA, n2);
				}
				// 3355
				List<String> result = solve4(EXP_AABB, n2, n0);
				if (n2 - n1 == 1) {
					// 4455
					result = filter(result, n2, n0);
					result.addAll(append(solve4(EXP_AB, n2, n0), n3, n0));
				}
				return result;
			}
			// n0 = n1 < n2 < n3
			if (n0 == 1) {
				// 1145
				return solve4(EXP_11AB, n3, n2);
			}
			if (n0 == 2) {
				// 2245
				List<String> result = solve4(EXP_22AB, n3, n2);
				if (n2 == 3) {
					// 223Q
					result = filter(result, 3, 2);
					result.addAll(append(solve4(EXP_AB, n3, 2), 3, 2));
				}
				return result;
			}
			// 3356
			List<String> result = solve4(EXP_AABC, n0, n3, n2);
			if (n2 - n0 == 1) {
				// 3348
				result = filter(result, n2, n0);
				result.addAll(append(solve4(EXP_AB, n3, n0), n2, n0));
			}
			// n3 - n2 == 1 && n0 + n0 == 24 is impossible
			return result;
		}
		if (n1 == n2) {
			if (n2 == n3) {
				// n0 < n1 = n2 = n3
				if (n0 == 1) {
					// 1888
					return solve4(EXP_1AAA, n1);
				}
				// 2333
				return solve4(EXP_AAAB, n1, n0);
			}
			// n0 < n1 = n2 < n3
			if (n0 == 1) {
				if (n1 == 2) {
					// 1226
					return solve4(EXP_122A, n3);
				}
				// 1334
				return solve4(EXP_1AAB, n1, n3);
			}
			if (n0 == 2) {
				// 2668
				List<String> result = solve4(EXP_2AAB, n1, n3);
				List<String> result2 = new ArrayList<>();
				if (n1 == 3) {
					// 2338
					result = filter(result, 3, 2);
					result2.addAll(append(solve4(EXP_AB, n3, 3), 3, 2));
				}
				if (n3 - n1 == 1) {
					// 2QQK
					result = filter(result, n3, n1);
					result2.addAll(append(solve4(EXP_AB, n1, 2), n3, n1));
				}
				// 2334
				result.addAll(result2);
				return result;
			}
			// 3669
			List<String> result = solve4(EXP_AABC, n1, n3, n0);
			List<String> result2 = new ArrayList<>();
			if (n1 - n0 == 1) {
				// 3446
				result = filter(result, n1, n0);
				result2.addAll(append(solve4(EXP_AB, n3, 1), n1, n0));
			}
			if (n3 - n1 == 1) {
				// 4667
				result = filter(result, n3, n1);
				result2.addAll(append(solve4(EXP_AB, n1, 0), n3, n1));
			}
			// 5667
			result.addAll(result2);
			return result;
		}
		if (n2 == n3) {
			// n0 < n1 < n2 = n3
			if (n0 == 1) {
				// 1366
				List<String> result = solve4(EXP_1AAB, n3, n1);
				if (n1 == 2) {
					// 12QQ
					result = filter(result, 2, 1);
					result.addAll(append(solve4(EXP_AA, n2), 2, 1));
				}
				return result;
			}
			if (n0 == 2) {
				// 2466
				List<String> result = solve4(EXP_2AAB, n3, n1);
				List<String> result2 = new ArrayList<>();
				if (n1 == 3) {
					// 23QQ
					result = filter(result, 3, 2);
					result2.addAll(append(solve4(EXP_AA, n2), 3, 2));
				}
				if (n2 - n1 == 1) {
					// 2JQQ
					result = filter(result, n2, n1);
					result2.addAll(append(solve4(EXP_AB, n2, 2), n2, n1));
				}
				// 2344
				result.addAll(result2);
				return result;
			}
			// 4688
			List<String> result = solve4(EXP_AABC, n2, n1, n0);
			List<String> result2 = new ArrayList<>();
			if (n1 - n0 == 1) {
				// 34QQ
				result = filter(result, n1, n0);
				result2.addAll(append(solve4(EXP_AA, n2), n1, n0));
			}
			if (n2 - n1 == 1) {
				// 3788
				result = filter(result, n2, n1);
				result2.addAll(append(solve4(EXP_AB, n2, n0), n2, n1));
			}
			// JQKK
			result.addAll(result2);
			return result;
		}
		// n0 < n1 < n2 < n3
		if (n0 == 1) {
			// 1468
			List<String> result = solve4(EXP_1ABC, n3, n2, n1);
			if (n1 == 2) {
				// 1238
				result = filter(result, 2, 1);
				result.addAll(append(solve4(EXP_AB, n3, n2), 2, 1));
			}
			return result;
		}
		// 246Q
		List<String> result = solve4(EXP_ABCD, n3, n2, n1, n0);
		List<String> result2 = new ArrayList<>();
		if (n1 - n0 == 1) {
			// 34JK
			result = filter(result, n1, n0);
			result2.addAll(append(solve4(EXP_AB, n3, n2), n1, n0));
		}
		if (n2 - n1 == 1) {
			// 3568
			result = filter(result, n2, n1);
			result2.addAll(append(solve4(EXP_AB, n3, n0), n2, n1));
		}
		if (n3 - n2 == 1) {
			// 46910
			result = filter(result, n3, n2);
			result2.addAll(append(solve4(EXP_AB, n1, n0), n3, n2));
		}
		// 3458,38910,2378,5678
		result.addAll(result2);
		return result;
	}
}