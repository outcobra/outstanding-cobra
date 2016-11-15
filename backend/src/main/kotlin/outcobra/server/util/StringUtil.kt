package outcobra.server.util

/**
 * Upper-Cases the first character of a string
 *
 * @author Joel Messerli
 * @since <since>
 */
fun String.firstToUpper(): String {
    if (this.length == 0) return this
    if (this.length == 1) return this.toUpperCase()
    return this.substring(0, 1).toUpperCase() + this.substring(1, this.length)
}