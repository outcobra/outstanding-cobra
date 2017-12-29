package outcobra.server.web.auth.model

import org.springframework.security.core.userdetails.User

class OutcobraUser(username: String, password: String, val mail: String) : User(username, password, listOf())