package outcobra.server.controller

import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController
import outcobra.server.model.dto.SchoolClassDto
import outcobra.server.service.SchoolClassService
import javax.inject.Inject
import javax.websocket.server.PathParam

/**
 * This Class defines all functions in the schoolClass endpoint of the REST APi
 * @author Florian Buergi
 */
@RestController
@RequestMapping("/api/schoolCass")
class SchoolClassController @Inject constructor(val schoolClassService: SchoolClassService) {

    /**
     * This method writes the given SchoolClassDto into the database
     * @param schoolClassDto the new [SchoolClassDto] you want to save, as Json in the [RequestBody]
     * @return the [schoolClassDto] that has been saved in the database
     */
    @RequestMapping(method = arrayOf(RequestMethod.PUT))
    fun createSchoolClass(@RequestBody schoolClassDto: SchoolClassDto) : SchoolClassDto {
        return schoolClassService.createSchoolClass(schoolClassDto)
    }

    /**
     * This method reads a SchoolClass out of the database and returns it as a [SchoolClassDto]
     * @param id the id of the schoolClass you want to read, as [PathParam]
     */
    @RequestMapping(method = arrayOf(RequestMethod.GET))
    fun readSchoolClassById(@PathParam("schoolClass/{value}") id :Long) : SchoolClassDto {
        return schoolClassService.readSchoolClassById(id)
    }
    /**
     * This method reads all schoolClasses that belong to the current user
     * @return a list of [SchoolClassDto]s under the given Institution
     */

    @RequestMapping("/institution",method = arrayOf(RequestMethod.GET))
    fun readAllSchoolClasses(@PathParam("institution/{value}") institutionId :Long) : List<SchoolClassDto> {
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
    @RequestMapping(method = arrayOf(RequestMethod.DELETE))
    fun deleteSchoolClass(@PathParam("schoolClass/{value}") id : Long){
        schoolClassService.deleteSchoolClass(id)
    }
}