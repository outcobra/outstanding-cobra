package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.*
import outcobra.server.model.dto.SubjectDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.*
import javax.inject.Inject

/**
 * @since 1.0.0
 * @author Florian Bürgi
 */
@Component
class SubjectMapper @Inject constructor(val teacherRepository: TeacherRepository,
                                        val semesterRepository: SemesterRepository,
                                        val taskRepository: TaskRepository,
                                        val examRepository: ExamRepository,
                                        val markGroupRepository: MarkGroupRepository,
                                        val markReportRepository: MarkReportRepository,
                                        val timetableRepository: TimetableRepository,
                                        val colorMapper: ColorMapper) : Mapper<Subject, SubjectDto> {

    override fun fromDto(from: SubjectDto): Subject {
        val id = from.identifier
        val timetableEntries = timetableRepository.findOne(QTimetable.timetable.semester.id.eq(from.semesterId))?.entries
        val reportEntries = markReportRepository.findOne(QMarkReport.markReport.semester.id.eq(from.semesterId))?.entries
        val tasks = taskRepository.findAll(QTask.task.subject.id.eq(id))?.toList()
        val exams = examRepository.findAll(QExam.exam.subject.id.eq(id))?.toList()
        val markGroup = markGroupRepository.findOne(QMarkGroup.markGroup1.id.eq(id))
        val semester = semesterRepository.findOne(from.semesterId)
        val teacher = teacherRepository.findOne(from.teacherId)
        val subject = Subject(from.name, colorMapper.fromDto(from.color), semester, timetableEntries, tasks, reportEntries, exams, markGroup, teacher)
        subject.id = from.identifier
        return subject
    }

    override fun toDto(from: Subject): SubjectDto {
        val id = if (from.id == null) 0 else from.id
        return SubjectDto(id, from.semester.id, from.name, colorMapper.toDto(from.color), from.teacher?.id)
    }

}