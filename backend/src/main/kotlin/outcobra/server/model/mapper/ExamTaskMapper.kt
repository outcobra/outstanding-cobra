package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.domain.Exam
import outcobra.server.model.domain.ExamTask
import outcobra.server.model.dto.ExamDto
import outcobra.server.model.dto.ExamTaskDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.ExamRepository
import outcobra.server.validator.RequestValidator
import javax.inject.Inject

/**
 * @author Florian Bürgi
 * @since 1.2.0
 */
@Component
class ExamTaskMapper @Inject constructor(val examRepository: ExamRepository,
                                         val requestValidator: RequestValidator<ExamDto>) : BaseMapper(), Mapper<ExamTask, ExamTaskDto> {
    override fun fromDto(from: ExamTaskDto): ExamTask {
        requestValidator.validateRequestById(from.examId, Exam::class)
        val exam = examRepository.findOne(from.examId)
        val examTask = ExamTask(from.task, exam, from.finished)
        examTask.id = from.id
        return examTask
    }

    override fun toDto(from: ExamTask): ExamTaskDto {
        return ExamTaskDto(from.id, from.task, from.finished, from.exam?.id ?: 0L)
    }
}