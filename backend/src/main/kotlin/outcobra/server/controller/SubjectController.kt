package outcobra.server.controller

import org.springframework.web.bind.annotation.*
import outcobra.server.model.Subject
import outcobra.server.model.dto.SubjectDto
import outcobra.server.service.SubjectService
import javax.inject.Inject

/**
 * This Class defines all functions for the subject endpoint of the REST API
 *
 * @author Florian Bürgi
 * @since 1.0.0
 */
@RestController
@RequestMapping("/api")
class SubjectController @Inject constructor(val subjectService: SubjectService) {

    /**
     * This method saves the given [SubjectDto] into the database
     * @param subjectDto the new [SubjectDto] as Json in the [RequestBody]
     * @return the [SubjectDto] that has been saved in the database
     */
    @PutMapping(value = "/subject")
    fun createSubject(@RequestBody subjectDto: SubjectDto): SubjectDto {
        return subjectService.createSubject(subjectDto)
    }

    @GetMapping(value = "/subject")
    fun readAllSubjectsByUser(): List<SubjectDto> {
        return subjectService.readAllSubjectsByUser()
    }

    /**
     * This method reads a subject out of the database and returns it as a [SubjectDto]
     * @param semesterId the id of the subject to read
     */
    @GetMapping(value = "/semester/{semesterId}/subject")
    fun readAllSubjectsBySemester(@PathVariable semesterId: Long): List<SubjectDto> {
        return subjectService.readAllSubjectsBySemester(semesterId)
    }

    /**
     * This method reads all subjects that are associated with a specific Semester
     * @param id The id of the Semester of which to read all Subjects
     * @return All Subjects that are associated with the given Semester
     */
    @GetMapping(value = "/subject/{id}")
    fun readSubjectById(@PathVariable id: Long): SubjectDto {
        return subjectService.readSubjectById(id)
    }

    /**
     * This method saves the changes on a [SubjectDto] to the database
     * @param subjectDto the updated [SubjectDto] as Json in the [RequestBody]
     * @return the [SubjectDto] that has been updated in the database
     */
    @PostMapping(value = "/subject")
    fun updateSubject(@RequestBody subjectDto: SubjectDto): SubjectDto {
        return subjectService.updateSubject(subjectDto)
    }

    /**
     * This method deletes a subject
     * @param subjectId The id of the Subject that should be deleted
     */
    @DeleteMapping(value = "/subject/{subjectId}")
    fun deleteSubject(@PathVariable subjectId: Long) {
        subjectService.deleteSubject(subjectId)
    }
}