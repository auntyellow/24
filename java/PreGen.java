import java.io.IOException;
import java.io.PrintWriter;
import java.lang.reflect.Field;

public class PreGen {
	public static void main(String[] args) {
		try (PrintWriter out = new PrintWriter("java/Methods.java")) {
			out.println("public class Methods {");
			for (Field field : Expressions.class.getFields()) {
				String fieldName = field.getName();
				if (!fieldName.startsWith("EXP_")) {
					continue;
				}
				for (String expression : (String[]) field.get(null)) {
					out.println("\tpublic static double " +
							Expressions.method(expression) +
							"(double a, double b, double c, double d) {return " +
							expression.replace("1", "1.0").replace("2", "2.0") +
							";}");
				}
			}
			out.print("}");
		} catch (IOException | ReflectiveOperationException e) {
			throw new RuntimeException(e);
		}
	}
}