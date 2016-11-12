package outcobra.server.service

import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import outcobra.server.model.QSchoolYear
import outcobra.server.model.SchoolYear
import outcobra.server.model.dto.SchoolYearDto
import outcobra.server.model.mapper.Mapper
import outcobra.server.model.repository.SchoolYearRepository
import outcobra.server.service.internal.SchoolYearService
import javax.inject.Inject

/**
 * Created by Florian on 12.11.2016.
 */
@Component
@Transactional
open class DefaultSchoolYearService @Inject constructor(val repository: SchoolYearRepository,
                                                   val mapper: Mapper<SchoolYear, SchoolYearDto>,
                                                   val userService: UserService) : SchoolYearService {

    override fun createSchoolYear(schoolYearDto: SchoolYearDto): SchoolYearDto {
        var schoolYear = mapper.fromDto(schoolYearDto)
        schoolYear = repository.save(schoolYear)
        return mapper.toDto(schoolYear)
    }

    override fun readSchoolYearById(id: Long): SchoolYearDto {
        var schoolYear = repository.findOne(id)
        return mapper.toDto(schoolYear)
    }

    override fun readAllYearsByClass(schoolClassId: Long): List<SchoolYearDto> {
        val classCriteria = QSchoolYear.schoolYear.schoolClass
        val userCriteria = classCriteria.institution.user.auth0Id
        val filter = classCriteria.id.eq(schoolClassId).and(userCriteria.eq(userService.getCurrentUser().userId))
        return repository.findAll(filter).map { entity -> mapper.toDto(entity) }
    }

    override fun updateSchoolYear(schoolYearDto: SchoolYearDto): SchoolYearDto {
        var schoolYear = mapper.fromDto(schoolYearDto)
        schoolYear = repository.save(schoolYear)
        return mapper.toDto(schoolYear)
    }

    override fun deleteSchoolYear(id: Long) {
        repository.delete(id)
    }

}
