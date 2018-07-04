package outcobra.server.service.internal

import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import outcobra.server.model.domain.Teacher
import outcobra.server.model.dto.TeacherDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.TeacherRepository
import outcobra.server.service.TeacherService
import outcobra.server.service.base.internal.DefaultBaseService
import outcobra.server.validator.RequestValidator
import javax.inject.Inject

@Component
@Transactional
class DefaultTeacherService
@Inject constructor(repository: TeacherRepository,
                    mapper: Mapper<Teacher, TeacherDto>,
                    requestValidator: RequestValidator<TeacherDto>)
    : TeacherService, DefaultBaseService<Teacher, TeacherDto, TeacherRepository>(mapper, repository, requestValidator, Teacher::class) {
}