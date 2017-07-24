package outcobra.server.service.internal

import org.springframework.stereotype.Service
import outcobra.server.model.ExamTask
import outcobra.server.model.dto.ExamTaskDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.ExamTaskRepository
import outcobra.server.service.ExamTaskService
import outcobra.server.service.base.internal.DefaultBaseService
import outcobra.server.validator.RequestValidator
import javax.inject.Inject

/**
 * @author Florian Bürgi
 * @since <since>
 */
@Service
class DefaultExamTaskService @Inject constructor(mapper: Mapper<ExamTask, ExamTaskDto>,
                                                 repository: ExamTaskRepository,
                                                 requestValidator: RequestValidator<ExamTaskDto>) : ExamTaskService,
        DefaultBaseService<ExamTask, ExamTaskDto, ExamTaskRepository>(mapper, repository, requestValidator, ExamTask::class) {

    override fun saveAll(examTasks: List<ExamTaskDto>): List<ExamTaskDto> {
        examTasks.forEach { requestValidator.validateRequestByDto(it) }
        return examTasks.map { save(it) }
    }

    override fun changeState(examTaskId: Long): ExamTaskDto {
        requestValidator.validateRequestById(examTaskId, type)
        var examTask = repository.findOne(examTaskId)
        examTask.isFinished = !examTask.isFinished
        examTask = repository.save(examTask)
        return mapper.toDto(examTask)
    }
}