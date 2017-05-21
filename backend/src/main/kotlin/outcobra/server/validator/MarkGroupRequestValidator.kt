package outcobra.server.validator

import org.springframework.context.annotation.Primary
import org.springframework.stereotype.Component
import outcobra.server.model.dto.MarkGroupDto
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
class MarkGroupRequestValidator @Inject constructor(override val locator: RepositoryLocator,
                                                    override val userService: UserService)
    : RequestValidator<MarkGroupDto>(locator, userService) {

    override fun validateDtoSaving(dto: MarkGroupDto) {
        dto.validate()
        super.validateDtoSaving(dto)
    }
}