package outcobra.server.service.internal

import org.springframework.stereotype.Service
import outcobra.server.model.Color
import outcobra.server.model.QInstitution
import outcobra.server.model.dto.manage.*
import outcobra.server.model.mapper.manage.ManageDtoMapper
import outcobra.server.model.repository.InstitutionRepository
import outcobra.server.service.ManageService
import outcobra.server.service.UserService
import java.time.LocalDate
import java.util.*

@Service
open class DefaultManageService(val institutionRepository: InstitutionRepository,
                                val userService: UserService,
                                val manageDtoMapper: ManageDtoMapper) : ManageService {
    override fun getManageData(): ManageDto {
        val institutions = institutionRepository.findAll(QInstitution.institution.user.id.eq(userService.getCurrentUser()?.id)).toList()
        return manageDtoMapper.toDto(institutions)
    }
}