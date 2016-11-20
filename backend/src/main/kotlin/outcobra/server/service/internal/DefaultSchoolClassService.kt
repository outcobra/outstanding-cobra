package outcobra.server.service.internal

import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import outcobra.server.model.QSchoolClass
import outcobra.server.model.SchoolClass
import outcobra.server.model.dto.SchoolClassDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.SchoolClassRepository
import outcobra.server.service.SchoolClassService
import javax.inject.Inject

/**
 * @author Florian Bürgi
 * @since 1.0.0
 */
@Component
@Transactional
open class DefaultSchoolClassService
@Inject constructor(val mapper: Mapper<SchoolClass, SchoolClassDto>,
                    val schoolClassRepository: SchoolClassRepository) : SchoolClassService {

    override fun createSchoolClass(schoolClassDto: SchoolClassDto): SchoolClassDto {
        var schoolClass = mapper.fromDto(schoolClassDto)
        schoolClass = schoolClassRepository.save(schoolClass)
        return mapper.toDto(schoolClass)
    }

    override fun readSchoolClassById(id: Long): SchoolClassDto {
        return mapper.toDto(schoolClassRepository.getOne(id))
    }

    override fun readAllSchoolClasses(institutionId: Long): List<SchoolClassDto> {
        val filter = QSchoolClass.schoolClass.institution.id.eq(institutionId)
        return schoolClassRepository.findAll(filter).map { mapper.toDto(it) }
    }

    override fun updateSchoolClass(schoolClassDto: SchoolClassDto): SchoolClassDto {
        var schoolClass = mapper.fromDto(schoolClassDto)
        schoolClass = schoolClassRepository.save(schoolClass)
        return mapper.toDto(schoolClass)
    }

    override fun deleteSchoolClass(id: Long) {
        schoolClassRepository.delete(id)
    }
}