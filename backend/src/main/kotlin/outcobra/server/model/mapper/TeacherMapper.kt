package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.Teacher
import outcobra.server.model.dto.TeacherDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.InstitutionRepository
import outcobra.server.model.repository.SubjectRepository
import javax.inject.Inject

@Component
class TeacherMapper @Inject constructor(val subjectRepository: SubjectRepository,
                                        val institutionRepository: InstitutionRepository) : Mapper<Teacher, TeacherDto> {

    override fun fromDto(from: TeacherDto): Teacher {
        val subjects = subjectRepository.findAll(QSubject.subject.teacher.id.eq(from.id)).toList()
        val institution = institutionRepository.findOne(from.institutionId)
        val teacher = Teacher(from.name, from.email, institution, subjects)
        teacher.id = from.id
        return teacher
    }

    override fun toDto(from: Teacher): TeacherDto {
        val id = from.id ?: 0
        return TeacherDto(id, from.institution.id, from.name, from.email)
    }
}
