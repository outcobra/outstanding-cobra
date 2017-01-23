package outcobra.server.service.internal

import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import outcobra.server.exception.DateOutsideExpectedRangeException
import outcobra.server.model.QSchoolYear
import outcobra.server.model.SchoolYear
import outcobra.server.model.dto.SchoolYearDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.SchoolYearRepository
import outcobra.server.service.SchoolYearService
import outcobra.server.service.base.internal.DefaultBaseService
import outcobra.server.validator.SchoolYearValidator
import javax.inject.Inject

@Component
@Transactional
open class DefaultSchoolYearService
@Inject constructor(mapper: Mapper<SchoolYear, SchoolYearDto>,
                    repository: SchoolYearRepository,
                    val schoolYearValidator: SchoolYearValidator)
    : SchoolYearService, DefaultBaseService<SchoolYear, SchoolYearDto, SchoolYearRepository>(mapper, repository) {

    override fun save(dto: SchoolYearDto): SchoolYearDto {
        val schoolYear = mapper.fromDto(dto)
        if (!schoolYearValidator.validateSchoolYearCreation(schoolYear)) {
            throw DateOutsideExpectedRangeException("The new school-year overlaps with an existing one")
        }
        return super.save(dto)
    }

    override fun readAllByClass(schoolClassId: Long): List<SchoolYearDto> {
        val filter = QSchoolYear.schoolYear.schoolClass.id.eq(schoolClassId)
        return repository.findAll(filter).map { mapper.toDto(it) }
    }

}