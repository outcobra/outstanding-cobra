package outcobra.server.service.internal

import org.springframework.stereotype.Service
import outcobra.server.model.QInstitution
import outcobra.server.model.dto.manage.ManageDto
import outcobra.server.model.mapper.manage.ManageDtoMapper
import outcobra.server.model.repository.InstitutionRepository
import outcobra.server.service.ManageService
import outcobra.server.service.UserService
import javax.inject.Inject

@Service
class DefaultManageService @Inject constructor(val institutionRepository: InstitutionRepository,
                                               val userService: UserService,
                                               val manageDtoMapper: ManageDtoMapper) : ManageService {
    override fun getManageData(): ManageDto {
        val ownedByUser = QInstitution.institution.user.id.eq(userService.getCurrentUser()!!.id)
        val institutions = institutionRepository.findAll(ownedByUser).toList()
        return manageDtoMapper.toDto(institutions)
    }

}
