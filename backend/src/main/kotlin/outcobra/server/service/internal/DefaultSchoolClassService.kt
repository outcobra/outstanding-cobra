package outcobra.server.service.internal

import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import outcobra.server.model.QSchoolClass
import outcobra.server.model.SchoolClass
import outcobra.server.model.dto.SchoolClassDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.SchoolClassRepository
import outcobra.server.service.SchoolClassService
import outcobra.server.service.UserService
import outcobra.server.service.base.internal.DefaultBaseService
import javax.inject.Inject

/**
 * @author Florian Bürgi
 * @since 1.0.0
 */
@Component
@Transactional
open class DefaultSchoolClassService
@Inject constructor(mapper: Mapper<SchoolClass, SchoolClassDto>,
                    repository: SchoolClassRepository,
                    val userService: UserService)
    : SchoolClassService, DefaultBaseService<SchoolClass, SchoolClassDto, SchoolClassRepository>(mapper, repository) {

    override fun readAllSchoolClassesByUser(): List<SchoolClassDto> {
        val userId = userService.getCurrentUser()!!.id
        val filter = QSchoolClass.schoolClass.institution.user.id.eq(userId)
        return jpaRepository.findAll(filter).map { dtoMapper.toDto(it) }
    }

    override fun readAllSchoolClassesByInstitution(institutionId: Long): List<SchoolClassDto> {
        val filter = QSchoolClass.schoolClass.institution.id.eq(institutionId)
        return jpaRepository.findAll(filter).map { dtoMapper.toDto(it) }
    }
}