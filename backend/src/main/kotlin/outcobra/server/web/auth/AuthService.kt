package outcobra.server.web.auth

interface AuthService<in T> {
    fun loginOrSignUp(arg: T): String
}