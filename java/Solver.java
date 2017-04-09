import java.lang.reflect.Field;
import java.util.HashMap;

import javax.script.Compilable;
import javax.script.CompiledScript;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import javax.script.SimpleBindings;

public class Solver {
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

	public static void main(String[] args) throws ScriptException {
		SimpleBindings bindings = new SimpleBindings();
		bindings.put("a", Integer.valueOf(4));
		bindings.put("b", Integer.valueOf(6));
		System.out.println(scriptMap.get("a*b").eval(bindings));
	}
}