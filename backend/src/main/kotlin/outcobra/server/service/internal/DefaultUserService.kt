package outcobra.server.service.internal

import org.springframework.stereotype.Component
import outcobra.server.model.dto.UserDto
import outcobra.server.service.UserService

@Component
open class DefaultUserService : UserService {
    override fun getCurrentUser(): UserDto {
        throw UnsupportedOperationException("not implemented") //To change body of created functions use File | Settings | File Templates.
    }
}