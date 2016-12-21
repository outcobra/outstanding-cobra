package outcobra.server.controller

import org.springframework.web.bind.annotation.*
import outcobra.server.model.dto.SchoolClassDto
import outcobra.server.service.SchoolClassService
import javax.inject.Inject
import javax.websocket.server.PathParam

/**
 * This Class defines all functions for the schoolClass endpoint of the REST API
 * @see RestController
 * @author Florian Bürgi
 * @since 1.0.0
 */
@RestController
@RequestMapping("/api")
class SchoolClassController @Inject constructor(val schoolClassService: SchoolClassService) {

    /**
     * This method saves the given SchoolClassDto into the database
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
     * This method reads all SchoolClasses that are associated with a specific Institution
     * @param institutionId The id of the Institution of which to get all SchoolClasses
     * @return All SchoolClasses that are associated with the given Institution
     */

    @RequestMapping(value = "/institution/{institutionId}/schoolClass", method = arrayOf(RequestMethod.GET))
    fun readAllSchoolClasses(@PathVariable institutionId: Long): List<SchoolClassDto> {
        return schoolClassService.readAllSchoolClasses(institutionId)
    }

    /**
     * This method saves the changes on a [SchoolClassDto] to the database
     * @param schoolClassDto the updated [SchoolClassDto] you want to save, as Json in the [RequestBody]
     * @return the [schoolClassDto] that has been saved in the database
     */
    @RequestMapping(value = "/schoolClass", method = arrayOf(RequestMethod.POST))
    fun updateSchoolClass(@RequestBody schoolClassDto: SchoolClassDto): SchoolClassDto {
        return schoolClassService.updateSchoolClass(schoolClassDto)
    }

    /**
     * This method deletes a schoolClass
     * @param id The id of the SchoolClass that should be deleted
     */
    @RequestMapping(value = "/schoolClass/{id}", method = arrayOf(RequestMethod.DELETE))
    fun deleteSchoolClass(@PathVariable id: Long) {
        schoolClassService.deleteSchoolClass(id)
    }
}