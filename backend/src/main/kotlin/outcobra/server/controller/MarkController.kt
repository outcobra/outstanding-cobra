package outcobra.server.controller

import org.springframework.web.bind.annotation.*
import outcobra.server.model.dto.MarkGroupDto
import outcobra.server.model.dto.MarkValueDto
import outcobra.server.model.dto.mark.SemesterMarkDto
import outcobra.server.service.MarkGroupService
import outcobra.server.service.MarkService
import javax.inject.Inject

/**
 * @author Florian Bürgi
 * @since <since>
 */
@RestController
@RequestMapping("/api/mark")
class MarkController @Inject constructor(val markService: MarkService,
                                         val markGroupService: MarkGroupService) {

    @RequestMapping(value = "/value", method = arrayOf(RequestMethod.PUT, RequestMethod.POST))
    fun saveMarkValue(@RequestBody markValueDto: MarkValueDto): MarkGroupDto {
        return markService.saveMarkAndGetChangedParent(markValueDto)
    }

    @GetMapping(value = "/value/{id}")
    fun readMarkValueById(@PathVariable id: Long): MarkValueDto {
        return this.markService.readById(id)
    }

    @GetMapping(value = "/group/{markGroupId}/value")
    fun readMarkValuesByGroup(@PathVariable markGroupId: Long): List<MarkValueDto> {
        return markService.readAllByMarkGroup(markGroupId)
    }

    @GetMapping(value = "/subject/{subjectId}/value")
    fun readMarkValuesBySubject(@PathVariable subjectId: Long): List<MarkValueDto> {
        return markService.readAllBySubject(subjectId)
    }

    @DeleteMapping(value = "/value/{id}")
    fun deleteMarkValue(@PathVariable id: Long) {
        markService.delete(id)
    }

    @RequestMapping(value = "/group", method = arrayOf(RequestMethod.PUT, RequestMethod.POST))
    fun saveMarkGroup(@RequestBody markDto: MarkGroupDto): MarkGroupDto {
        return markGroupService.save(markDto)
    }

    @GetMapping(value = "/group/{id}")
    fun readMarkGroupById(@PathVariable id: Long): MarkGroupDto {
        return this.markGroupService.readById(id)
    }

    @GetMapping(value = "/subject/{subjectId}/group")
    fun readMarkGroupBySubject(@PathVariable subjectId: Long): MarkGroupDto {
        return markGroupService.getGroupBySubject(subjectId)
    }

    @DeleteMapping(value = "/group/{id}")
    fun deleteMarkGroup(@PathVariable id: Long) {
        markGroupService.delete(id)
    }

    @GetMapping(value = "/semester/{semesterId}")
    fun getInitialMarkData(@PathVariable semesterId: Long): SemesterMarkDto {
        return markGroupService.getInitialData(semesterId)
    }


}
