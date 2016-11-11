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

    @RequestMapping(method = arrayOf(RequestMethod.PUT))
    override fun createSchoolClass(schoolClassDto: SchoolClassDto): SchoolClassDto {
        var schoolClass = mapper.fromDto(schoolClassDto)
        schoolClass = schoolClassRepository.save(schoolClass)
        mapper.toDto(schoolClass)
    }

    @RequestMapping(method = arrayOf(RequestMethod.GET))
    override fun readSchoolClassById(@PathParam("") id: Long): SchoolClassDto {
        return mapper.toDto(schoolClassRepository.getOne(id))
    }

    override fun readAllSchoolClasses(): List<SchoolClassDto> {
        val filter = QSchoolClass.schoolClass.institution.user.eq(userService.getCurrentUser())
        schoolClassRepository.findAll(filter).map { entity ->  mapper.toDto(entity)}
    }

    override fun updateSchoolClass(schoolClassDto: SchoolClassDto): SchoolClassDto {
        throw UnsupportedOperationException("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun deleteSchoolClass(id: Long) {
        throw UnsupportedOperationException("not implemented") //To change body of created functions use File | Settings | File Templates.
    }
//TODO Implement
}