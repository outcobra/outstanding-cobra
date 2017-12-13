package outcobra.server.web.auth

import outcobra.server.web.auth.model.AuthResponseDto

interface AuthService<in T> {
    fun login(arg: T): AuthResponseDto
    fun signUp(arg: T): AuthResponseDto
}