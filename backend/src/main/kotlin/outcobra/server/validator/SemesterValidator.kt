package outcobra.server.validator

import org.springframework.stereotype.Component
import outcobra.server.exception.DateOutsideExpectedRangeException
import outcobra.server.model.QSemester
import outcobra.server.model.Semester
import outcobra.server.model.repository.SchoolYearRepository
import outcobra.server.model.repository.SemesterRepository
import outcobra.server.util.doesNotOverlap
import outcobra.server.util.isAfterOrEqual
import outcobra.server.util.isBeforeOrEqual
import javax.inject.Inject


@Component
open class SemesterValidator @Inject constructor(val schoolYearRepository: SchoolYearRepository,
                                                 val semesterRepository: SemesterRepository) {
    fun validateSemesterCreation(semester: Semester): Boolean {
        val parentId = semester.schoolYear.id
        val parent = schoolYearRepository.findOne(parentId)
        if (!(parent.validFrom.isBeforeOrEqual(semester.validFrom) &&
                parent.validTo.isAfterOrEqual(semester.validTo))) {
            throw DateOutsideExpectedRangeException("Semester is not inside the given schoolYear")
        }
        val withSameParent = QSemester.semester.schoolYear.id.eq(parentId)
        val semesters = semesterRepository.findAll(withSameParent).toList()
        return semesters.all { it.doesNotOverlap(semester) }
    }


}