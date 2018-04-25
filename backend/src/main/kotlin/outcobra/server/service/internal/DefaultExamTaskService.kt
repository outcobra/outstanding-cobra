package outcobra.server.service.internal

import org.springframework.stereotype.Service
import outcobra.server.model.domain.ExamTask
import outcobra.server.model.domain.QExamTask
import outcobra.server.model.dto.ExamTaskDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.ExamTaskRepository
import outcobra.server.service.ExamTaskService
import outcobra.server.service.base.internal.DefaultBaseService
import outcobra.server.validator.RequestValidator
import javax.inject.Inject

/**
 * @author Florian Bürgi
 * @since 1.2.0
 */
@Service
class DefaultExamTaskService @Inject constructor(mapper: Mapper<ExamTask, ExamTaskDto>,
                                                 repository: ExamTaskRepository,
                                                 requestValidator: RequestValidator<ExamTaskDto>) : ExamTaskService,
        DefaultBaseService<ExamTask, ExamTaskDto, ExamTaskRepository>(mapper, repository, requestValidator, ExamTask::class) {

    override fun saveAll(examTasks: List<ExamTaskDto>): List<ExamTaskDto> {
        examTasks.forEach { requestValidator.validateRequestByDto(it) }
        val result = examTasks.map { save(it) }
        repository.flush()
        return result
    }

    override fun readByExamId(examId: Long): List<ExamTaskDto> =
        repository.findAll(QExamTask.examTask.exam.id.eq(examId))
                .map(mapper::toDto)


    override fun changeState(examTaskId: Long): ExamTaskDto {
        requestValidator.validateRequestById(examTaskId, type)
        var examTask = repository.findOne(examTaskId)
        examTask.finished = !examTask.finished
        examTask = repository.saveAndFlush(examTask)
        return mapper.toDto(examTask)
    }
}