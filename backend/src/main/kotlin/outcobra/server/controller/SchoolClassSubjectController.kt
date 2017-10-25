package outcobra.server.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import outcobra.server.model.dto.SchoolClassSubjectDto
import outcobra.server.service.SchoolClassSubjectService
import javax.inject.Inject

/**
 * @author Florian Bürgi
 * @since 1.2.0
 */
@RestController
@RequestMapping("/api")
class SchoolClassSubjectController @Inject constructor(val schoolClassSubjectService: SchoolClassSubjectService) {

    @GetMapping("/schoolClassSubject")
    fun getSubjectFilter(): List<SchoolClassSubjectDto> {
        return schoolClassSubjectService.getSchoolClassSubjects()
    }
}