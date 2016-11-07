package outcobra.server.service.internal

import org.springframework.stereotype.Component
import outcobra.server.model.*
import outcobra.server.model.repository.HolidayRepository
import outcobra.server.model.repository.InstitutionRepository
import outcobra.server.model.repository.TeacherRepository
import outcobra.server.service.AuthorizationService
import outcobra.server.service.UserService
import javax.inject.Inject

@Component
class DefaultAuthorizationService
@Inject constructor(val userService: UserService,
                    val institutionRepository: InstitutionRepository, val holidayRepository: HolidayRepository,
                    val teacherRepository: TeacherRepository) : AuthorizationService {
    override fun verifyOwner(user: User): Boolean {
        println("filter works")
        return false
    }


    fun getUserId(): String {
        return userService.getCurrentUser().userId
    }

    override fun verifyOwner(institution: Institution): Boolean {

        return getUserId() == institution.user.auth0Id
    }

    override fun verifyOwner(holiday: Holiday): Boolean {
        return verifyOwner(holiday.schoolYear)
    }

    override fun verifyOwner(teacher: Teacher): Boolean {
        return getUserId() == teacher.institution.user.auth0Id
    }

    override fun verifyOwner(schoolClass: SchoolClass): Boolean {
        return verifyOwner(schoolClass.institution)
    }

    override fun verifyOwner(schoolYear: SchoolYear): Boolean {
        return verifyOwner(schoolYear.schoolClass)
    }

    override fun verifyOwner(semester: Semester): Boolean {
        return verifyOwner(semester.schoolYear)
    }

    override fun verifyOwner(subject: Subject): Boolean {
        return false
    }

    override fun verifyOwner(timetable: Timetable): Boolean {
        throw UnsupportedOperationException("not implemented")
    }

    override fun verifyOwner(timetableEntry: TimetableEntry): Boolean {
        throw UnsupportedOperationException("not implemented")
    }

    override fun verifyOwner(markReport: MarkReport): Boolean {
        throw UnsupportedOperationException("not implemented")
    }

    override fun verifyOwner(mark: Mark): Boolean {
        throw UnsupportedOperationException("not implemented")
    }

    override fun verifyOwner(markGroup: MarkGroup): Boolean {
        throw UnsupportedOperationException("not implemented")
    }

    override fun verifyOwner(markReportEntry: MarkReportEntry): Boolean {
        throw UnsupportedOperationException("not implemented")
    }

    override fun verifyOwner(task: Task): Boolean {
        throw UnsupportedOperationException("not implemented")
    }

    override fun verifyOwner(exam: Exam): Boolean {
        throw UnsupportedOperationException("not implemented")
    }

    override fun verifyOwner(examTask: ExamTask): Boolean {
        throw UnsupportedOperationException("not implemented")
    }

    override fun verifyOwner(markValue: MarkValue): Boolean {
        throw UnsupportedOperationException("not implemented")
    }

}
