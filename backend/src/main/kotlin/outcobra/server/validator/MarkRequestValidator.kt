package outcobra.server.validator

import org.springframework.context.annotation.Primary
import org.springframework.stereotype.Component
import outcobra.server.model.dto.MarkDto
import outcobra.server.service.UserService
import outcobra.server.util.RepositoryLocator
import outcobra.server.util.validate
import javax.inject.Inject

/**
 * @author Florian Bürgi
 * @since <since>
 */
@Component
@Primary
class MarkRequestValidator @Inject constructor(override val locator: RepositoryLocator,
                                               override val userService: UserService)
    : RequestValidator<MarkDto>(locator, userService) {

    override fun validateDtoSaving(dto: MarkDto) {
        dto.validate()
        super.validateDtoSaving(dto)
    }
}