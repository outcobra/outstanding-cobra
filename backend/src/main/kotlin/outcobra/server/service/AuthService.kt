package outcobra.server.service

import outcobra.server.model.dto.UserDto

interface AuthService {
    fun loginOrSignUp(identification: String?, secret: String): UserDto
}