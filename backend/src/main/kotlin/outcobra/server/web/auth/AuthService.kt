package outcobra.server.web.auth

import outcobra.server.web.auth.model.AuthResponseDto

interface AuthService<in T> {
    fun loginOrSignUp(arg: T): AuthResponseDto
}