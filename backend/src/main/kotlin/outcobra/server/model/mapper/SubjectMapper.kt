package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.*
import outcobra.server.model.dto.SubjectDto
import outcobra.server.model.dto.TeacherDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.*
import javax.inject.Inject

/**
 * Created by Florian on 26.11.2016.
 */
@Component
class SubjectMapper @Inject constructor(val teacherMapper: Mapper<Teacher, TeacherDto>,
                                        val semesterRepository: SemesterRepository,
                                        val taskRepository: TaskRepository,
                                        val examRepository: ExamRepository,
                                        val markGroupRepository: MarkGroupRepository,
                                        val markReportRepository: MarkReportRepository,
                                        val timetableRepository: TimetableRepository) : Mapper<Subject, SubjectDto> {

    override fun fromDto(from: SubjectDto): Subject {
        val id = from.id
        val timetableEntries = timetableRepository.findOne(QTimetable.timetable.semester.id.eq(from.semesterId)).entries
        val reportEntries = markReportRepository.findOne(QMarkReport.markReport.semester.id.eq(from.semesterId)).entries
        val tasks = taskRepository.findAll(QTask.task.subject.id.eq(id)).toList()
        val exams = examRepository.findAll(QExam.exam.subject.id.eq(id)).toList()
        val markGroup = markGroupRepository.findOne(QMarkGroup.markGroup1.id.eq(id))
        val semester = semesterRepository.findOne(from.semesterId)
        val teacher = teacherMapper.fromDto(from.teacher)
        val subject = Subject(from.subjectName, semester, timetableEntries, tasks, reportEntries, exams, markGroup, teacher)
        subject.id = from.id
        return subject
    }

    override fun toDto(from: Subject): SubjectDto {
        return SubjectDto(from.id, from.semester.id, from.name, teacherMapper.toDto(from.teacher))
    }

}