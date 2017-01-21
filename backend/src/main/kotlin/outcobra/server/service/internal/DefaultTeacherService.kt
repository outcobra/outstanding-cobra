package outcobra.server.service.internal

import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import outcobra.server.model.QTeacher
import outcobra.server.model.Teacher
import outcobra.server.model.dto.TeacherDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.TeacherRepository
import outcobra.server.service.TeacherService
import outcobra.server.service.base.internal.DefaultBaseService
import javax.inject.Inject

@Component
@Transactional
open class DefaultTeacherService
@Inject constructor(val repository: TeacherRepository,
                    val mapper: Mapper<Teacher, TeacherDto>)
    : TeacherService, DefaultBaseService<Teacher, TeacherDto>(mapper, repository) {

    override fun readAllYearsByInstitution(institutionId: Long): List<TeacherDto> {
        val withSameId = QTeacher.teacher.institution.id.eq(institutionId)
        return repository.findAll(withSameId).map { mapper.toDto(it) }
    }
}