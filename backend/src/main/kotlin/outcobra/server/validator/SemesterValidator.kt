package outcobra.server.validator

import org.springframework.stereotype.Component
import outcobra.server.exception.DateOutsideExpectedRangeException
import outcobra.server.model.QSemester
import outcobra.server.model.SchoolYear
import outcobra.server.model.Semester
import outcobra.server.model.repository.SchoolYearRepository
import outcobra.server.model.repository.SemesterRepository
import outcobra.server.util.contains
import outcobra.server.util.doesNotOverlap
import javax.inject.Inject


/**
 * Validator for the [Semester] entity
 *
 * @author Florian Bürgi
 * @since <since>
 */
@Component
open class SemesterValidator @Inject constructor(val schoolYearRepository: SchoolYearRepository,
                                                 val semesterRepository: SemesterRepository) {
    /**
     * checks that the given [Semester] does not overlap with any other [Semester] in the same [SchoolYear]
     * checks that the given [Semester] is in the parent [SchoolYear]
     *
     * @return returns true if the conditions from above are both true
     * @throws DateOutsideExpectedRangeException when the semester isn't in the parent schoolYear
     */
    fun validateSemesterCreation(semester: Semester): Boolean {
        val parentId = semester.schoolYear.id
        val parent = schoolYearRepository.findOne(parentId)

        if (semester !in parent)
            throw DateOutsideExpectedRangeException("Semester is not inside the given schoolYear")

        val withSameParent = QSemester.semester.schoolYear.id.eq(parentId)
        val semesters = semesterRepository.findAll(withSameParent).toList()
        return semesters.all { it.doesNotOverlap(semester) }
    }
}