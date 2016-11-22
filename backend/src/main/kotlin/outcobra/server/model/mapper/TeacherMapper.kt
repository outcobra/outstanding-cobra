package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.Teacher
import outcobra.server.model.dto.TeacherDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.InstitutionRepository
import javax.inject.Inject

@Component
open class TeacherMapper @Inject constructor(val institutionRepository: InstitutionRepository) : Mapper<Teacher, TeacherDto> {
    override fun toDto(from: Teacher): TeacherDto = TeacherDto(from.id, from.institution.id, from.name, from.email)

    override fun fromDto(from: TeacherDto): Teacher {
        val teacher = Teacher(from.name, from.email, null, mutableListOf())
        teacher.id = from.id
        teacher.institution = when (from.institutionId) {
            in 1L..Long.MAX_VALUE -> institutionRepository.findOne(from.institutionId)
            else -> null
        }
        return teacher
    }
}
