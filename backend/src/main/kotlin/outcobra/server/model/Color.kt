package outcobra.server.model

import java.util.*

/**
 * @author Mario Kunz
 * @since 1.1.0
 */
enum class Color(val hex: String) {
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


    companion object {

        fun getByHex(hexString: String): Color? {
            var hex = hexString
            if (hex.contains("-")) {            //TODO remove ugly date-parsing workaround
                val index = hex.indexOf('-')
                hex = hex.substring(0, index)
            }
            return values().firstOrNull { color -> color.hex == hex }
        }

        val randomColor: Color
            get() {
                val rand = Random().nextInt(Color.values().size)
                return Color.values()[rand]
            }
    }
}