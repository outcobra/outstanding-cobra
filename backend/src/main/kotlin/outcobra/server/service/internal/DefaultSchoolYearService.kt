package outcobra.server.service.internal

import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import outcobra.server.model.QSchoolYear
import outcobra.server.model.SchoolYear
import outcobra.server.model.dto.SchoolYearDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.SchoolYearRepository
import outcobra.server.service.SchoolYearService
import javax.inject.Inject

@Component
@Transactional
open class DefaultSchoolYearService @Inject constructor(val repository: SchoolYearRepository,
                                                        val mapper: Mapper<SchoolYear, SchoolYearDto>) : SchoolYearService {

    override fun createSchoolYear(schoolYearDto: SchoolYearDto): SchoolYearDto {
        var schoolYear = mapper.fromDto(schoolYearDto)
        schoolYear = repository.save(schoolYear)
        return mapper.toDto(schoolYear)
    }

    override fun readSchoolYearById(id: Long): SchoolYearDto {
        var schoolYear = repository.getOne(id)
        return mapper.toDto(schoolYear)
    }

    override fun readAllYearsByClass(schoolClassId: Long): List<SchoolYearDto> {
        val filter = QSchoolYear.schoolYear.schoolClass.id.eq(schoolClassId)
        return repository.findAll(filter).map { mapper.toDto(it) }
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