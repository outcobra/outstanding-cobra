package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.domain.QSubject
import outcobra.server.model.domain.Teacher
import outcobra.server.model.dto.TeacherDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.SubjectRepository
import outcobra.server.model.repository.UserRepository
import javax.inject.Inject


/**
 * @author Florian Bürgi
 * @since 1.0.0
 */
@Component
class TeacherMapper @Inject constructor(val subjectRepository: SubjectRepository,
                                        val userRepository: UserRepository) : Mapper<Teacher, TeacherDto> {

    override fun fromDto(from: TeacherDto): Teacher {
        val subjects = subjectRepository.findAll(QSubject.subject.teacher.id.eq(from.id)).toList()
        val user = userRepository.findOne(from.userId)
        val teacher = Teacher(from.name, from.email, user, subjects)
        teacher.id = from.id
        return teacher
    }

    override fun toDto(from: Teacher): TeacherDto {
        val email = from.email ?: ""
        return TeacherDto(from.id, from.user.id, from.name, email)
    }
}
