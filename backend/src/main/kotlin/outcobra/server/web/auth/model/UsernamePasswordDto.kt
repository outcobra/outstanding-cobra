package outcobra.server.web.auth.model

data class UsernamePasswordDto(val username: String? = "", val mail: String = "", val password: String = "", val passwordVerify: String?)