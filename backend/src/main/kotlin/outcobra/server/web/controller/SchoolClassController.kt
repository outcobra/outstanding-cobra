package outcobra.server.web.controller

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
class SchoolClassController
@Inject constructor(val schoolClassService: SchoolClassService) {

    /**
     * This method saves the given SchoolClassDto into the database
     * @param schoolClassDto the new [SchoolClassDto] you want to save, as Json in the [RequestBody]
     * @return the [schoolClassDto] that has been saved in the database
     */
    @RequestMapping("/schoolClass", method = arrayOf(RequestMethod.POST, RequestMethod.PUT))
    fun saveSchoolClass(@RequestBody schoolClassDto: SchoolClassDto): SchoolClassDto {
        return schoolClassService.save(schoolClassDto)
    }

    /**
     * This method reads a SchoolClass out of the database and returns it as a [SchoolClassDto]
     * @param id the id of the schoolClass you want to read, as [PathParam]
     */
    @GetMapping("/schoolClass/{id}")
    fun readSchoolClassById(@PathVariable id: Long): SchoolClassDto {
        return schoolClassService.readById(id)
    }

    @GetMapping("/schoolClass")
    fun readSchoolClassesByUser(): List<SchoolClassDto> {
        return schoolClassService.readAllByUser()
    }

    /**
     * This method deletes a schoolClass
     * @param id The id of the SchoolClass that should be deleted
     */
    @DeleteMapping("/schoolClass/{id}")
    fun deleteSchoolClass(@PathVariable id: Long) {
        schoolClassService.delete(id)
    }

    @PutMapping("/schoolClass/{id}/link/{schoolYearId}")
    fun linkSchoolYear(@PathVariable id: Long, @PathVariable schoolYearId: Long) {
        schoolClassService
    }
}
