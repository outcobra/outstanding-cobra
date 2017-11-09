package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.Institution
import outcobra.server.model.Teacher
import outcobra.server.model.dto.TeacherDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.InstitutionRepository
import outcobra.server.model.repository.SubjectRepository
import javax.inject.Inject


/**
 * @author Florian Bürgi
 * @since 1.0.0
 */
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
        val id = from.id
        val email = from.email ?: ""
        val institution = from.institution as Institution
        return TeacherDto(id, institution.id, from.name, email)
    }
}
