package outcobra.server.web.auth.internal

import outcobra.server.model.User
import outcobra.server.web.auth.AuthService
import outcobra.server.web.auth.model.AuthResponseDto
import outcobra.server.web.auth.model.OutcobraUser
import outcobra.server.web.auth.util.JwtUtil

abstract class BaseAuthService<in T>(private val jwtUtil: JwtUtil) : AuthService<T> {
    // TODO move other similar logic to here
    fun userToResponse(user: User): AuthResponseDto {
        return AuthResponseDto(jwtUtil.generateToken(OutcobraUser(user.username, "", user.mail)))
    }
}
