package outcobra.server.filter

import java.io.BufferedReader
import java.io.InputStreamReader
import javax.servlet.ServletInputStream
import javax.servlet.http.HttpServletRequest

/**
 *
 * @author Joel Messerli
 * @since <since>
 */
class RequestWrapper(val request: HttpServletRequest) : HttpServletRequest by request {
    private val inputStream: ServletInputStream?
    private val reader: BufferedReader

    init {
        inputStream = request.inputStream
        reader = if (inputStream != null) BufferedReader(InputStreamReader(inputStream)) else request.reader
    }

    override fun getInputStream() = inputStream
    override fun getReader() = reader
}