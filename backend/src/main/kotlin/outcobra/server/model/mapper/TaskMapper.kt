package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.domain.Task
import outcobra.server.model.dto.TaskDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.SubjectRepository
import javax.inject.Inject

/**
 * @author Vincent Perret
 * @since 1.0.0
 */
@Component
class TaskMapper @Inject constructor(val subjectRepository: SubjectRepository,
                                     val schoolClassSubjectSemesterMapper: SchoolClassSubjectSemesterMapper,
                                     val subjectMapper: SubjectMapper) : Mapper<Task, TaskDto> {

    override fun toDto(from: Task): TaskDto {
        val effort = from.effort.toDouble().div(60)

        val (schoolClassDto, subjectDto, semesterDto) = schoolClassSubjectSemesterMapper.toDtoTriple(from.schoolClassSemesterSubject)
        return TaskDto(from.id,
                from.name,
                from.description,
                from.todoDate,
                from.dueDate,
                effort,
                from.progress,
                schoolClassDto,
                subjectDto,
                semesterDto
        )
    }

    override fun fromDto(from: TaskDto): Task {
        val effort = Math.round(from.effort * 60).toInt()
        val task = Task(from.name,
                from.description,
                from.todoDate,
                from.dueDate,
                effort,
                from.progress,
                schoolClassSubjectSemesterMapper.fromDto(from)
        )
        task.id = from.id
        return task
    }
}
