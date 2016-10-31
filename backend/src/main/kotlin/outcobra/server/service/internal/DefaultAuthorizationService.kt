package outcobra.server.service.internal

import outcobra.server.model.repository.HolidayRepository
import outcobra.server.model.repository.InstitutionRepository
import outcobra.server.model.repository.TeacherRepository
import outcobra.server.service.UserService
import javax.inject.Inject

/**
 * Created by Florian on 30.10.2016.
 */
class DefaultAuthorizationService
@Inject constructor(val userService: UserService,
                    val institutionRepository: InstitutionRepository, val holidayRepository: HolidayRepository,
                    val teacherRepository: TeacherRepository) {
//
//    fun getUserId(): String {
//        userService.getCurrentUser().userId
//    }
//
//    override fun verifyOwner(institutionId: Long): Boolean {
//
//        return getUserId() == institution.user.auth0Id
//    }
//
//    override fun verifyOwner(holiday: Holiday): Boolean {
//        verifyOwner(holiday.schoolYear)
//    }
//
//    override fun verifyOwner(teacher: Teacher): Boolean {
//        return getUserId() == teacher.institution.user.auth0Id
//    }
//
//    override fun verifyOwner(schoolClass: SchoolClass): Boolean {
//        return verifyOwner(schoolClass.institution)
//    }
//
//    override fun verifyOwner(schoolYear: SchoolYear): Boolean {
//        return verifyOwner(schoolYear.schoolClass)
//    }
//
//    override fun verifyOwner(semester: Semester): Boolean {
//        return verifyOwner(semester.schoolYear)
//    }
//
//    override fun verifyOwner(subject: Subject): Boolean {
//        return
//    }
//
//    override fun verifyOwner(timetable: Timetable): Boolean {
//        throw UnsupportedOperationException("not implemented") //To change body of created functions use File | Settings | File Templates.
//    }
//
//    override fun verifyOwner(timetableEntry: TimetableEntry): Boolean {
//        throw UnsupportedOperationException("not implemented") //To change body of created functions use File | Settings | File Templates.
//    }
//
//    override fun verifyOwner(markReport: MarkReport): Boolean {
//        throw UnsupportedOperationException("not implemented") //To change body of created functions use File | Settings | File Templates.
//    }
//
//    override fun verifyOwner(mark: Mark): Boolean {
//        throw UnsupportedOperationException("not implemented") //To change body of created functions use File | Settings | File Templates.
//    }
//
//    override fun verifyOwner(markGroup: MarkGroup): Boolean {
//        throw UnsupportedOperationException("not implemented") //To change body of created functions use File | Settings | File Templates.
//    }
//
//    override fun verifyOwner(markReportEntry: MarkReportEntry): Boolean {
//        throw UnsupportedOperationException("not implemented") //To change body of created functions use File | Settings | File Templates.
//    }
//
//    override fun verifyOwner(task: Task): Boolean {
//        throw UnsupportedOperationException("not implemented") //To change body of created functions use File | Settings | File Templates.
//    }
//
//    override fun verifyOwner(exam: Exam): Boolean {
//        throw UnsupportedOperationException("not implemented") //To change body of created functions use File | Settings | File Templates.
//    }
//
//    override fun verifyOwner(examTask: ExamTask): Boolean {
//        throw UnsupportedOperationException("not implemented") //To change body of created functions use File | Settings | File Templates.
//    }
//
//    override fun verifyOwner(markValue: MarkValue): Boolean {
//        throw UnsupportedOperationException("not implemented") //To change body of created functions use File | Settings | File Templates.
//    }
//
}