package outcobra.server.validator

import org.springframework.stereotype.Component
import outcobra.server.model.QSchoolYear
import outcobra.server.model.SchoolYear
import outcobra.server.model.repository.SchoolYearRepository
import outcobra.server.util.doesNotOverlap
import javax.inject.Inject

/**
 * Validator for the [SchoolYear] entity
 *
 * @author Florian Bürgi
 * @since <since>
 */
@Component
open class SchoolYearValidator @Inject constructor(val schoolYearRepository: SchoolYearRepository) {

    /**
     * checks that the given [SchoolYear] does not overlap with any other [SchoolYear]
     * @return returns true if no [SchoolYear] was found which overlaps with the given [SchoolYear]
     */
    fun validateSchoolYearCreation(schoolYear: SchoolYear): Boolean {
        val instanceId = schoolYear.id
        val predicate = QSchoolYear.schoolYear.schoolClass.id.eq(schoolYear.schoolClass.id)
        val schoolYears = schoolYearRepository.findAll(predicate).toList()
        return schoolYears.all { it.doesNotOverlap(schoolYear) }
    }


}