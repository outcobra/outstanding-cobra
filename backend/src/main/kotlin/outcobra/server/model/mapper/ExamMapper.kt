package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.domain.Exam
import outcobra.server.model.domain.ExamTask
import outcobra.server.model.domain.MarkValue
import outcobra.server.model.domain.QMarkValue
import outcobra.server.model.dto.ExamDto
import outcobra.server.model.dto.ExamTaskDto
import outcobra.server.model.dto.MarkValueDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.MarkValueRepository
import outcobra.server.validator.RequestValidator
import javax.inject.Inject

/**
 * @author Florian Bürgi
 * @since 1.2.0
 */
@Component
class ExamMapper @Inject constructor(val markMapper: Mapper<MarkValue, MarkValueDto>,
                                     val examTaskMapper: Mapper<ExamTask, ExamTaskDto>,
                                     val schoolClassSemesterSubjectMapper: SchoolClassSubjectSemesterMapper,
                                     val markRepository: MarkValueRepository,
                                     val subjectMapper: SubjectMapper,
                                     val schoolClassMapper: SchoolClassMapper,
                                     val semesterMapper: SemesterMapper,
                                     val requestValidator: RequestValidator<ExamDto>)
    : Mapper<Exam, ExamDto>, BaseMapper() {

    override fun fromDto(from: ExamDto): Exam {
        var markValue: MarkValue? = markRepository.findAll(QMarkValue.markValue.exam.id.eq(from.id)).firstOrNull()
        if (from.mark != null) {
            markValue = markMapper.fromDto(from.mark)
        }
        val exam = Exam(from.name,
                from.date,
                listOf(),
                schoolClassSemesterSubjectMapper.fromDto(from),
                markValue,
                from.description
        )
        exam.id = from.id
        return exam

    }

    override fun toDto(from: Exam): ExamDto {
        var markValue: MarkValueDto? = null
        if (from.mark != null) {
            markValue = markMapper.toDto(from.mark!!)
        }

        val (schoolClass, subject, semester) = schoolClassSemesterSubjectMapper.toDtoTriple(from.schoolClassSemesterSubject)
        return ExamDto(from.id,
                from.name,
                from.description,
                from.date,
                markValue,
                from.tasks.map { examTaskMapper.toDto(it) }.toMutableList(),
                schoolClass,
                subject,
                semester
        )
    }
}