package outcobra.server.model;

import java.util.Arrays;
import java.util.Random;

/**
 * @author Mario Kunz
 */
public enum Color {
    RED("F44336"),
    PINK("E91E63"),
    DEEP_PINK("AD1457"),
    PURPLE("9C27B0"),
    DEEP_PURPLE("673AB7"),
    INDIGO("3F51B5"),
    BLUE("2196F3"),
    DEEP_BLUE("283593"),
    LIGHT_BLUE("03A9F4"),
    CYAN("00BCD4"),
    TEAL("009688"),
    GREEN("4CAF50"),
    DEEP_GREEN("2E7D32"),
    LIGHT_GREEN("8BC34A"),
    LIME("CDDC39"),
    YELLOW("FDD835"),
    AMBER("FFC107"),
    ORANGE("FFA726"),
    DEEP_ORANGE("FF5722"),
    DEEP_RED("B71C1C");

    private String hex;

    Color(String hex) {
        this.hex = hex;
    }

    public String getHex() {
        return hex;
    }

    public static Color getByHex(String hex) {
        return Arrays.stream(values())
                .filter(color -> color.hex.equals(hex))
                .findFirst().orElse(null);
    }

    public static Color getRandomColor() {
        int rand = new Random().nextInt(Color.values().length + 1);
        return Color.values()[rand];
    }
}