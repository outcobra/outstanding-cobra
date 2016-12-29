package outcobra.server.model;

import java.util.Arrays;

/**
 * @author Mario Kunz
 */
public enum Color {
    TURQUIOSE("1abc9c"),
    EMERLAND("2ecc71"),
    PETERRIVER("3498db"),
    AMETHYST("9b59b6"),
    WETASHPALT("34495e"),
    GREENSEA("16a085"),
    NEPHRITIS("27ae60"),
    BELIZEHOLE("2980b9"),
    WISTERIA("8e44ad"),
    MIDNIGHTBLUE("2c3e50"),
    SUNFLOWER("f1c40f"),
    CARROT("e67e22"),
    ALIZARIN("e74c3c"),
    CONCRETE("95a5a6"),
    ORANGE("f39c12"),
    PUMPKIN("d35400"),
    POMEGRANATE("c0392b"),
    SILVER("bdc3c7"),
    ASBESTOS("7f8c8d");

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
}