package outcobra.server.service

import outcobra.server.model.*

interface AuthorizationService {
    fun verifyOwner(user: User): Boolean
    fun verifyOwner(institution: Institution): Boolean
    fun verifyOwner(teacher: Teacher): Boolean
    fun verifyOwner(schoolClass: SchoolClass): Boolean
    fun verifyOwner(schoolYear: SchoolYear): Boolean
    fun verifyOwner(subject: Subject): Boolean
    fun verifyOwner(timetable: Timetable): Boolean
    fun verifyOwner(timetableEntry: TimetableEntry): Boolean
    fun verifyOwner(markReport: MarkReport): Boolean
    fun verifyOwner(mark: Mark): Boolean
    fun verifyOwner(markGroup: MarkGroup): Boolean
    fun verifyOwner(markReportEntry: MarkReportEntry): Boolean
    fun verifyOwner(task: Task): Boolean
    fun verifyOwner(exam: Exam): Boolean
    fun verifyOwner(examTask: ExamTask): Boolean
    fun verifyOwner(semester: Semester): Boolean
    fun verifyOwner(holiday: Holiday): Boolean
    fun verifyOwner(markValue: MarkValue): Boolean
}