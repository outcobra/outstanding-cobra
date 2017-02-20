package outcobra.server.service.internal

import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import outcobra.server.model.Institution
import outcobra.server.model.QTeacher
import outcobra.server.model.Teacher
import outcobra.server.model.dto.TeacherDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.TeacherRepository
import outcobra.server.service.TeacherService
import outcobra.server.service.base.internal.DefaultBaseService
import outcobra.server.validator.RequestValidator
import javax.inject.Inject

@Component
@Transactional
open class DefaultTeacherService
@Inject constructor(repository: TeacherRepository,
                    mapper: Mapper<Teacher, TeacherDto>,
                    requestValidator : RequestValidator<TeacherDto>) : TeacherService,
        DefaultBaseService<Teacher, TeacherDto, TeacherRepository>(mapper, repository, requestValidator, Teacher::class.java) {

    override fun readAllByInstitution(institutionId: Long): List<TeacherDto> {
        requestValidator.validateByParentId(institutionId, Institution::class)
        val withSameId = QTeacher.teacher.institution.id.eq(institutionId)
        return repository.findAll(withSameId).map { mapper.toDto(it) }
    }
}