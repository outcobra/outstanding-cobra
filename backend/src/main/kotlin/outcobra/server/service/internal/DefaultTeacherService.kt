package outcobra.server.service.internal

import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import outcobra.server.model.QTeacher
import outcobra.server.model.dto.TeacherDto
import outcobra.server.model.mapper.TeacherDtoMapper
import outcobra.server.model.repository.TeacherRepository
import outcobra.server.service.TeacherService
import outcobra.server.service.UserService
import javax.inject.Inject

/**
 * Created by Florian on 13.11.2016.
 */
@Component
@Transactional
open class DefaultTeacherService @Inject constructor(val repository: TeacherRepository,
                                                     val mapper: TeacherDtoMapper,
                                                     val userService: UserService) : TeacherService {
    override fun createTeacher(teacherDto: TeacherDto): TeacherDto {
        var teacher = mapper.fromDto(teacherDto)
        teacher = repository.save(teacher)
        return mapper.toDto(teacher)
    }

    override fun readTeacherById(id: Long): TeacherDto {
        return mapper.toDto(repository.findOne(id))
    }

    override fun readAllYearsByInstitution(institutionId: Long): List<TeacherDto> {
        val qInstitution = QTeacher.teacher.institution
        val filter = qInstitution.id.eq(institutionId).and(qInstitution.user.auth0Id.eq(userService.getCurrentUser().userId))
        return repository.findAll(filter).map { entity -> mapper.toDto(entity) }
    }

    override fun updateTeacher(teacherDto: TeacherDto): TeacherDto {
        var teacher = mapper.fromDto(teacherDto)
        teacher = repository.save(teacher)
        return mapper.toDto(teacher)
    }

    override fun deleteTeacher(id: Long) {
        repository.delete(id)
    }
}