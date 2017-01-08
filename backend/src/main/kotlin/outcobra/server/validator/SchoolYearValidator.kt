package outcobra.server.validator

import org.springframework.stereotype.Component
import outcobra.server.model.QSchoolYear
import outcobra.server.model.SchoolYear
import outcobra.server.model.repository.SchoolYearRepository
import outcobra.server.util.doesNotOverlap
import javax.inject.Inject

@Component
open class SchoolYearValidator
@Inject constructor(val schoolYearRepository: SchoolYearRepository) {

    fun validateSchoolYearCreation(schoolYear: SchoolYear): Boolean {

        val predicate = QSchoolYear.schoolYear.schoolClass.id.eq(schoolYear.schoolClass.id)
        val schoolYears = schoolYearRepository.findAll(predicate).toList()
        return schoolYears.all { it.doesNotOverlap(schoolYear) }
    }


}