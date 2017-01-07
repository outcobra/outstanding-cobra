package outcobra.server.validator

import org.springframework.stereotype.Component
import outcobra.server.model.QSchoolYear
import outcobra.server.model.SchoolYear
import outcobra.server.model.dto.SchoolYearDto
import outcobra.server.model.repository.SchoolYearRepository
import outcobra.server.util.DateOverlabUtil
import javax.inject.Inject

@Component
open class SchoolYearValidator
@Inject constructor(val schoolYearRepository: SchoolYearRepository) {

    fun validateSchhoolYearCreation(schoolYearDto: SchoolYearDto): Boolean {

        var predicate = QSchoolYear.schoolYear.schoolClass.id.eq(schoolYearDto.schoolClassId)
        var schoolYears = schoolYearRepository.findAll(predicate).toList()
        return schoolYears.all { checkOverlap(it, schoolYearDto) }
    }

    private fun checkOverlap(existing: SchoolYear, new: SchoolYearDto): Boolean {
        return !DateOverlabUtil.isOverlab(existing.validFrom, existing.validTo, new.validFrom!!, new.validTo!!)
    }
}