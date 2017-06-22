package outcobra.server.validator

import org.springframework.stereotype.Component
import outcobra.server.model.Semester
import outcobra.server.model.dto.filter.ExamFilterDto
import outcobra.server.service.UserService
import outcobra.server.util.RepositoryLocator
import javax.inject.Inject
import javax.security.auth.Subject

/**
 * @author Florian Bürgi
 * @since <since>
 */
@Component
class ExamFilterValidator
@Inject constructor(locator: RepositoryLocator,
                    userService: UserService) : BaseValidator(locator, userService) {
    fun validateExamFilter(dto: ExamFilterDto) {
        if (dto.semesterId != null) validateRequestById(dto.semesterId, Semester::class)
        if (dto.subjectId != null) validateRequestById(dto.subjectId, Subject::class)
    }
}
