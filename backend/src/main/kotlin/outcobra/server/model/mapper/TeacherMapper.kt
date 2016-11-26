package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.QSubject
import outcobra.server.model.Teacher
import outcobra.server.model.dto.TeacherDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.InstitutionRepository
import outcobra.server.model.repository.SubjectRepository
import javax.inject.Inject

@Component
open class TeacherMapper @Inject constructor(val subjectRepository: SubjectRepository,
                                             val institutionRepository: InstitutionRepository) : Mapper<Teacher, TeacherDto> {
    //TODO implement
    override fun fromDto(from: TeacherDto): Teacher {
        val subjects = subjectRepository.findAll(QSubject.subject.teacher.id.eq(from.teacherId)).toList()
        return Teacher(from.teacherName, from.teacherEmail, institutionRepository.findOne(from.institutionId), subjects)
    }

    override fun toDto(from: Teacher): TeacherDto {
        return TeacherDto(from.id, from.institution.id, from.name, from.email)
    }
}
