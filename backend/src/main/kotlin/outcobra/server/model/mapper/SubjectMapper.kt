package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.domain.SchoolClassSemester
import outcobra.server.model.domain.SchoolClassSemesterSubject
import outcobra.server.model.domain.Subject
import outcobra.server.model.dto.SchoolClassSemesterDto
import outcobra.server.model.dto.SubjectDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.UserRepository
import javax.inject.Inject

/**
 * @since 1.0.0
 * @author Florian Bürgi
 */
@Component
class SubjectMapper @Inject constructor(val schoolClassMapper: SchoolClassMapper,
                                        val semesterMapper: SemesterMapper,
                                        val userRepository: UserRepository,
                                        val colorMapper: ColorMapper) : Mapper<Subject, SubjectDto>, BaseMapper() {

    override fun fromDto(from: SubjectDto): Subject {
        val user = userRepository.findOne(from.userId)

        val subject = Subject(from.name,
                colorMapper.fromDto(from.color),
                user
        )
        subject.schoolClassSemesterSubjects = from.schoolClassSemesterDto.map {
            SchoolClassSemesterSubject(
                    SchoolClassSemester(
                            schoolClassMapper.fromDto(it.schoolClassDto),
                            semesterMapper.fromDto(it.semesterDto)
                    ),
                    subject
            )
        }


        subject.id = from.identifier
        return subject
    }

    override fun toDto(from: Subject): SubjectDto {
        val schoolClassSemesterSubjectDtos = from.schoolClassSemesterSubjects.map { SchoolClassSemesterDto(
                schoolClassMapper.toDto(it.schoolClassSemester.schoolClass),
                semesterMapper.toDto(it.schoolClassSemester.semester)
        ) }
        val teacherId = from.teacher?.id ?: 0L
        val color = from.color
        return SubjectDto(from.id,
                schoolClassSemesterSubjectDtos,
                from.name,
                colorMapper.toDto(color),
                from.user.id,
                teacherId
        )
    }
}