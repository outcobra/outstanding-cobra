package outcobra.server.web.controller

import org.springframework.web.bind.annotation.*
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
    @RequestMapping("/subject", method = arrayOf(RequestMethod.POST, RequestMethod.PUT))
    fun saveSubject(@RequestBody subjectDto: SubjectDto): SubjectDto {
        return subjectService.save(subjectDto)
    }

    @GetMapping("/subject")
    fun readAllSubjectsByUser(): List<SubjectDto> {
        return subjectService.readAllByUser()
    }

    @GetMapping("/semester/current/subject")
    fun readSubjectsByCurrentSemester(): List<SubjectDto> {
        return subjectService.readAllByCurrentSemester()
    }

    /**
     * This method reads a subject out of the database and returns it as a [SubjectDto]
     * @param semesterId the id of the subject to read
     */
    @GetMapping("/semester/{semesterId}/subject")
    fun readAllSubjectsBySemester(@PathVariable semesterId: Long): List<SubjectDto> {
        return subjectService.readAllBySemester(semesterId)
    }

    /**
     * This method reads all subjects that are associated with a specific Semester
     * @param subjectId The subjectId of the Semester of which to read all Subjects
     * @return All Subjects that are associated with the given Semester
     */
    @GetMapping("/subject/{subjectId}")
    fun readSubjectById(@PathVariable subjectId: Long): SubjectDto {
        return subjectService.readById(subjectId)
    }

    /**
     * This method deletes a subject
     * @param subjectId The id of the Subject that should be deleted
     */
    @DeleteMapping("/subject/{subjectId}")
    fun deleteSubject(@PathVariable subjectId: Long) {
        subjectService.delete(subjectId)
    }

    @GetMapping("/subject/schoolClass/{schoolClassId}")
    fun getSubjectBySchoolClass(@PathVariable schoolClassId: Long): List<SubjectDto> {
        return subjectService.readAllBySchoolClass(schoolClassId)
    }

    @GetMapping("/subject/semester/{semesterId}")
    fun getSubjectBySemester(@PathVariable semesterId: Long): List<SubjectDto> {
        return subjectService.readAllBySemester(semesterId)
    }


    @GetMapping("/subject/schoolClass/{schoolClassId}/semester/{semesterId}")
    fun getSubjectBySchoolClassAndSemester(@PathVariable("schoolClassId") schoolClassId: Long,
                                           @PathVariable("semesterId") semesterId: Long): List<SubjectDto> {
        return subjectService.readAllBySchoolClassAndSemester(schoolClassId, semesterId)
    }
}