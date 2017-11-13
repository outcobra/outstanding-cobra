package outcobra.server.web.auth

interface AuthService {
    fun loginOrSignUp(identification: String?, secret: String): String
}