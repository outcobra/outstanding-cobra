package outcobra.server.controller

import org.springframework.web.bind.annotation.*
import outcobra.server.model.dto.SubjectDto
import outcobra.server.service.SubjectService
import javax.inject.Inject

/**
 * Created by Florian on 26.11.2016.
 */
@RestController
@RequestMapping("/api")
class SubjectController @Inject constructor(val subjectService: SubjectService) {

    @RequestMapping(value = "/subject", method = arrayOf(RequestMethod.PUT))
    fun createSubject(@RequestBody subjectDto: SubjectDto): SubjectDto {
        return subjectService.createSubject(subjectDto)
    }

    @RequestMapping(value = "/semester/{semesterId}/subject", method = arrayOf(RequestMethod.GET))
    fun readAllSubjectsBySemester(@PathVariable semesterId: Long): List<SubjectDto> {
        return subjectService.readAllSubjectsBySemester(semesterId)
    }

    @RequestMapping(value = "/subject/{id}", method = arrayOf(RequestMethod.GET))
    fun readSubjectById(@PathVariable id: Long): SubjectDto {
        return subjectService.readSubjectById(id)
    }

    @RequestMapping(value = "/subject", method = arrayOf(RequestMethod.POST))
    fun updateSubject(@RequestBody subjectDto: SubjectDto): SubjectDto {
        return subjectService.updateSubject(subjectDto)
    }

    @RequestMapping(value = "/subject/{subjectId}", method = arrayOf(RequestMethod.DELETE))
    fun deleteSubject(@PathVariable subjectId: Long) {
        subjectService.deleteSubject(subjectId)
    }

}