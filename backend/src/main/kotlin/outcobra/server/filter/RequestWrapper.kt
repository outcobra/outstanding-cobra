package outcobra.server.filter

import java.io.BufferedReader
import javax.servlet.http.HttpServletRequest

class RequestWrapper(val request: HttpServletRequest) : HttpServletRequest by request {
    private val reader = request.reader

    override fun getReader(): BufferedReader = reader
}