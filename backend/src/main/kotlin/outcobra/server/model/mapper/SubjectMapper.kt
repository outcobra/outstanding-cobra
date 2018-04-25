package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.domain.*
import outcobra.server.model.dto.SubjectDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.*
import javax.inject.Inject

/**
 * @since 1.0.0
 * @author Florian Bürgi
 */
@Component
class SubjectMapper @Inject constructor(val semesterRepository: SemesterRepository,
                                        val taskRepository: TaskRepository,
                                        val examRepository: ExamRepository,
                                        val markGroupRepository: MarkGroupRepository,
                                        val markReportRepository: MarkReportRepository,
                                        val timetableRepository: TimetableRepository,
                                        val userRepository: UserRepository,
                                        val colorMapper: ColorMapper) : Mapper<Subject, SubjectDto>, BaseMapper() {

    override fun fromDto(from: SubjectDto): Subject {
        val id = from.identifier
        // TODO implement with features
        //val timetableEntries = timetableRepository.findOne(QTimetable.timetable.semester.id.eq(from.semesterId))?.entries ?: listOf()
        //val reportEntries = markReportRepository.findOne(QMarkReport.markReport.semester.id.eq(from.semesterId))?.entries ?: listOf()
        val tasks = taskRepository.findAll(QTask.task.subject.id.eq(id)).toList()
        val exams = examRepository.findAll(QExam.exam.subject.id.eq(id)).toList()
        val markGroup = markGroupRepository.findOne(QMarkGroup.markGroup1.id.eq(id))
        val semesters = from.semesterIds.map { semesterRepository.findOne(it) }
        val user = userRepository.findOne(from.userId)
        val subject = Subject(from.name, colorMapper.fromDto(from.color), user, semesters, listOf(), tasks, listOf(), exams, markGroup, null)
        subject.id = from.identifier
        return subject
    }

    override fun toDto(from: Subject): SubjectDto {
        val semesterIds = from.semesters.map { it.id }
        val teacherId = from.teacher?.id ?: 0L
        val color = from.color ?: Color.BLUE //how else do you want to recover in this case
        return SubjectDto(from.id, semesterIds, from.name, colorMapper.toDto(color), teacherId)
    }
}