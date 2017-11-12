package outcobra.server.model.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.querydsl.QueryDslPredicateExecutor
import org.springframework.data.repository.NoRepositoryBean
import org.springframework.stereotype.Repository
import outcobra.server.model.*

/*
 * contains every JpaRepository for our Entities
 */

@NoRepositoryBean
interface OutcobraRepository<Entity> : JpaRepository<Entity, Long>, QueryDslPredicateExecutor<Entity>

@Repository
interface UserRepository : OutcobraRepository<User>

@Repository
interface InstitutionRepository : OutcobraRepository<Institution>

@Repository
interface SchoolYearRepository : OutcobraRepository<SchoolYear>

@Repository
interface HolidayRepository : OutcobraRepository<Holiday>

@Repository
interface SemesterRepository : OutcobraRepository<Semester>

@Repository
interface TimetableRepository : OutcobraRepository<Timetable>

@Repository
interface SubjectRepository : OutcobraRepository<Subject>

@Repository
interface TaskRepository : OutcobraRepository<Task>

@Repository
interface MarkReportRepository : OutcobraRepository<MarkReport>

@Repository
interface MarkGroupRepository : OutcobraRepository<MarkGroup>

@Repository
interface MarkValueRepository : OutcobraRepository<MarkValue>

@Repository
interface ExamRepository : OutcobraRepository<Exam>

@Repository
interface ExamTaskRepository : OutcobraRepository<ExamTask>

@Repository
interface SchoolClassRepository : OutcobraRepository<SchoolClass>

@Repository
interface TeacherRepository : OutcobraRepository<Teacher>

@Repository
interface IdentityRepository : OutcobraRepository<Identity> {
    fun findByUser(user: User): List<Identity>

    fun findByUserAndIdentityType(user: User, identityType: String): List<Identity>
}
