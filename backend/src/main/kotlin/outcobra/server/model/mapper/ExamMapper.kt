package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.Exam
import outcobra.server.model.ExamTask
import outcobra.server.model.MarkValue
import outcobra.server.model.dto.ExamDto
import outcobra.server.model.dto.ExamTaskDto
import outcobra.server.model.dto.MarkValueDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.SubjectRepository
import outcobra.server.validator.RequestValidator
import javax.inject.Inject

/**
 * @author Florian Bürgi
 * @since <since>
 */
@Component
class ExamMapper @Inject constructor(val markMapper: Mapper<MarkValue, MarkValueDto>,
                                     val examTaskMapper: Mapper<ExamTask, ExamTaskDto>,
                                     val subjectRepository: SubjectRepository,
                                     val subjectMapper: SubjectMapper,
                                     val requestValidator: RequestValidator<ExamDto>)
    : Mapper<Exam, ExamDto>, BaseMapper() {

    override fun fromDto(from: ExamDto): Exam {
        if (from.examTasks.isNotEmpty()) {
            validateChildren(from.examTasks.map { it.id }, ExamTask::class, from.id, Exam::class)
        }
        val subject = subjectRepository.findOne(from.subject.id)
        var markValue: MarkValue? = null
        if (from.mark != null) {
            markValue = markMapper.fromDto(from.mark)
        }
        val exam = Exam(from.id, from.name, from.description,
                from.date, from.examTasks.map { examTaskMapper.fromDto(it) }, subject, markValue)
        return exam
    }

    override fun toDto(from: Exam): ExamDto {
        var markValue: MarkValueDto? = null
        if (from.mark != null) {
            markValue = markMapper.toDto(from.mark as MarkValue)
        }
        return ExamDto(from.id, from.name, from.description ?: "", from.date, markValue,
                from.tasks.map { examTaskMapper.toDto(it) }, subjectMapper.toDto(from.subject))
    }
}