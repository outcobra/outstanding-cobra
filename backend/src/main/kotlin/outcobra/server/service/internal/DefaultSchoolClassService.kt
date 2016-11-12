package outcobra.server.service.internal

import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import outcobra.server.model.QSchoolClass
import outcobra.server.model.SchoolClass
import outcobra.server.model.dto.SchoolClassDto
import outcobra.server.model.mapper.Mapper
import outcobra.server.model.repository.SchoolClassRepository
import outcobra.server.service.SchoolClassService
import outcobra.server.service.UserService
import javax.inject.Inject
import javax.websocket.server.PathParam

/**
 * Created by Florian on 11.11.2016.
 */
@Component
@Transactional
open class DefaultSchoolClassService
    @Inject constructor(val mapper : Mapper<SchoolClass,SchoolClassDto>,
                        val schoolClassRepository: SchoolClassRepository,
                        val userService: UserService) : SchoolClassService {

    override fun createSchoolClass(schoolClassDto: SchoolClassDto): SchoolClassDto {
        var schoolClass = mapper.fromDto(schoolClassDto)
        schoolClass = schoolClassRepository.save(schoolClass)
        return mapper.toDto(schoolClass)
    }


    override fun readSchoolClassById(id: Long): SchoolClassDto {
        return mapper.toDto(schoolClassRepository.getOne(id))
    }

    override fun readAllSchoolClasses(): List<SchoolClassDto> {
        val qInstitution= QSchoolClass.schoolClass.institution
        val filter = qInstitution.user.auth0Id.eq(userService.getCurrentUser().userId)
        return schoolClassRepository.findAll(filter).map { entity: SchoolClass -> mapper.toDto(entity) }

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