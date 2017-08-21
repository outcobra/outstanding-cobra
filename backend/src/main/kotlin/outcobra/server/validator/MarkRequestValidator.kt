package outcobra.server.validator

import org.springframework.context.annotation.Primary
import org.springframework.stereotype.Component
import outcobra.server.model.dto.MarkValueDto
import outcobra.server.service.UserService
import outcobra.server.util.RepositoryLocator
import outcobra.server.util.validate
import javax.inject.Inject

/**
 * @author Florian Bürgi
 * @since 1.2.0
 */
@Component
@Primary
class MarkRequestValidator @Inject constructor(locator: RepositoryLocator,
                                               userService: UserService)
    : RequestValidator<MarkValueDto>(locator, userService) {

    override fun validateRequestByDto(dto: MarkValueDto) {
        dto.validate()
        super.validateRequestByDto(dto)
    }
}