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
                                        val markReportEntryRepository: MarkReportEntryRepository,
                                        val timetableEntryRepository: TimetableEntryRepository) : Mapper<Subject, SubjectDto> {
    override fun fromDto(from: SubjectDto): Subject {
        val id = from.id
        val timetableEntries = timetableEntryRepository.findAll(QTimetableEntry.timetableEntry.subject.id.eq(id)).toList()
        val markReportEntries = markReportEntryRepository.findAll(QMarkReportEntry.markReportEntry.subject.id.eq(id)).toList()
        val tasks = taskRepository.findAll(QTask.task.subject.id.eq(id)).toList()
        val exams = examRepository.findAll(QExam.exam.subject.id.eq(id)).toList()
        val markGroup = markGroupRepository.findOne(QMarkGroup.markGroup1.id.eq(id))
        return Subject(from.subjectName, semesterRepository.findOne(from.semesterId),
                timetableEntries, tasks, markReportEntries, exams, markGroup, teacherMapper.fromDto(from.teacher))

    }

    override fun toDto(from: Subject): SubjectDto {
        return SubjectDto(from.id, from.semester.id, from.name, teacherMapper.toDto(from.teacher))
    }

}