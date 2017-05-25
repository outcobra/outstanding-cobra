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
 * @since <since>
 */
@Component
@Primary
class MarkRequestValidator @Inject constructor(override val locator: RepositoryLocator,
                                               override val userService: UserService)
    : RequestValidator<MarkValueDto>(locator, userService) {

    override fun validateDtoSaving(dto: MarkValueDto) {
        dto.validate()
        super.validateDtoSaving(dto)
    }
}