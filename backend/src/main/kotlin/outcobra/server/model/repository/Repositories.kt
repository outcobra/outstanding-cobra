package outcobra.server.model.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.querydsl.QueryDslPredicateExecutor
import org.springframework.stereotype.Repository
import outcobra.server.model.*

/*
 * contains every JpaRepository for our Entities
 */
@Repository interface UserRepository : JpaRepository<User, Long>, QueryDslPredicateExecutor<User>

@Repository interface InstitutionRepository : JpaRepository<Institution, Long>, QueryDslPredicateExecutor<Institution>
@Repository interface SchoolYearRepository : JpaRepository<SchoolYear, Long>, QueryDslPredicateExecutor<SchoolYear>
@Repository interface HolidayRepository : JpaRepository<Holiday, Long>, QueryDslPredicateExecutor<Holiday>
@Repository interface SemesterRepository : JpaRepository<Semester, Long>, QueryDslPredicateExecutor<Semester>
@Repository interface TimetableRepository : JpaRepository<Timetable, Long>, QueryDslPredicateExecutor<Timetable>
@Repository interface SubjectRepository : JpaRepository<Subject, Long>, QueryDslPredicateExecutor<Subject>
@Repository interface TaskRepository : JpaRepository<Task, Long>, QueryDslPredicateExecutor<Task>
@Repository interface MarkReportRepository : JpaRepository<MarkReport, Long>, QueryDslPredicateExecutor<MarkReport>
@Repository interface MarkGroupRepository : JpaRepository<MarkGroup, Long>, QueryDslPredicateExecutor<MarkGroup>
@Repository interface MarkValueRepository : JpaRepository<MarkValue, Long>, QueryDslPredicateExecutor<MarkValue>
@Repository interface ExamRepository : JpaRepository<Exam, Long>, QueryDslPredicateExecutor<Exam>
@Repository interface ExamTaskRepository : JpaRepository<ExamTask, Long>, QueryDslPredicateExecutor<ExamTask>
@Repository interface SchoolClassRepository : JpaRepository<SchoolClass, Long>, QueryDslPredicateExecutor<SchoolClass>
@Repository interface TeacherRepository : JpaRepository<Teacher, Long>, QueryDslPredicateExecutor<Teacher>
