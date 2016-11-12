package outcobra.server.controller

import org.slf4j.LoggerFactory
import org.springframework.web.bind.annotation.*
import outcobra.server.model.dto.SchoolClassDto
import outcobra.server.service.SchoolClassService
import javax.inject.Inject
import javax.websocket.server.PathParam

/**
 * This Class defines all functions in the schoolClass endpoint of the REST APi
 * @author Florian Buergi
 */
@RestController
@RequestMapping("/api")
class SchoolClassController @Inject constructor(val schoolClassService: SchoolClassService) {

    companion object {
        val LOGGER = LoggerFactory.getLogger(javaClass)
    }

    /**
     * This method writes the given SchoolClassDto into the database
     * @param schoolClassDto the new [SchoolClassDto] you want to save, as Json in the [RequestBody]
     * @return the [schoolClassDto] that has been saved in the database
     */
    @RequestMapping(value = "/schoolClass", method = arrayOf(RequestMethod.PUT))
    fun createSchoolClass(@RequestBody schoolClassDto: SchoolClassDto): SchoolClassDto {
        return schoolClassService.createSchoolClass(schoolClassDto)
    }

    /**
     * This method reads a SchoolClass out of the database and returns it as a [SchoolClassDto]
     * @param id the id of the schoolClass you want to read, as [PathParam]
     */
    @RequestMapping(value = "/schoolClass/{id}", method = arrayOf(RequestMethod.GET))
    fun readSchoolClassById(@PathVariable id: Long): SchoolClassDto {
        return schoolClassService.readSchoolClassById(id)
    }

    /**
     * This method reads all schoolClasses that belong to the current user
     * @return a list of [SchoolClassDto]s under the given Institution
     */

    @RequestMapping(value = "/institution/{institutionId}/schoolClass", method = arrayOf(RequestMethod.GET))
    fun readAllSchoolClasses(@PathVariable institutionId: Long): List<SchoolClassDto> {
        return schoolClassService.readAllSchoolClasses(institutionId)
    }

    /**
     * This method saves the changes on a [SchoolClassDto] to the database
     * @param schoolClassDto the updated [SchoolClassDto] you want to save, as Json in the [RequestBody]
     * * @return the [schoolClassDto] that has been saved in the database
     */
    @RequestMapping(method = arrayOf(RequestMethod.POST))
    fun updateSchoolClass(@RequestBody schoolClassDto: SchoolClassDto): SchoolClassDto {
        return schoolClassService.updateSchoolClass(schoolClassDto)
    }

    /**
     * This method deletes a schoolClass
     * @param id the id of the SchoolClass you want to delete, as [PathParam]
     */
    @RequestMapping(value = "/schoolClass/{id}", method = arrayOf(RequestMethod.DELETE))
    fun deleteSchoolClass(@PathVariable id: Long) {
        schoolClassService.deleteSchoolClass(id)
    }
}