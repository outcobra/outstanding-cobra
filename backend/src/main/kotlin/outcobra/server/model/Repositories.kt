package outcobra.server.model

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.querydsl.QueryDslPredicateExecutor
import org.springframework.stereotype.Repository

@Repository interface UserRepository : JpaRepository<User, String>, QueryDslPredicateExecutor<User>
@Repository interface InstitutionRepository : JpaRepository<Institution, Long>, QueryDslPredicateExecutor<Institution>
@Repository interface SchoolYearRepository : JpaRepository<SchoolYear, Long>, QueryDslPredicateExecutor<SchoolYear>
@Repository interface HolidayRepository : JpaRepository<Holiday, Long>, QueryDslPredicateExecutor<Holiday>
@Repository interface SemesterRepository : JpaRepository<Semester, Long>, QueryDslPredicateExecutor<Semester>
@Repository interface TimetableRepository : JpaRepository<Timetable, Long>, QueryDslPredicateExecutor<Timetable>
@Repository interface SubjectRepository : JpaRepository<Subject, Long>, QueryDslPredicateExecutor<Subject>
@Repository interface TaskRepository : JpaRepository<Task, Long>, QueryDslPredicateExecutor<Task>
@Repository interface MarkReportRepository : JpaRepository<MarkReport, Long>, QueryDslPredicateExecutor<MarkReport>
@Repository interface ExamRepository : JpaRepository<Exam, Long>, QueryDslPredicateExecutor<Exam>
@Repository interface MarkRepository : JpaRepository<Mark, Long>, QueryDslPredicateExecutor<Mark>