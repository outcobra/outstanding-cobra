package outcobra.server.service

import outcobra.server.model.dto.UserDto

interface UserService {
    fun getCurrentUser(): UserDto
}