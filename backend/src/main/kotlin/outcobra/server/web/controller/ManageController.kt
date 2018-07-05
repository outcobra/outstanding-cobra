package outcobra.server.web.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import outcobra.server.model.dto.SchoolClassDto
import outcobra.server.model.dto.SchoolYearDto
import outcobra.server.model.dto.SubjectDto
import outcobra.server.model.dto.manage.old.ManageDto
import outcobra.server.service.ManageService
import outcobra.server.service.SchoolClassService
import outcobra.server.service.SchoolYearService
import outcobra.server.service.SubjectService

@RestController
@RequestMapping("/api/manage")
class ManageController constructor(val manageService: ManageService,
                                   val schoolClassService: SchoolClassService,
                                   val schoolYearService: SchoolYearService,
                                   val subjectService: SubjectService) {

    @GetMapping
    fun getManageData(): ManageDto {
        return manageService.getManageData()
    }

    @GetMapping("/classes")
    fun getClasses(): List<SchoolClassDto> {
        return schoolClassService.readAllByUser()
    }

    @GetMapping("/schoolYearsSemesters")
    fun getSchoolYearsAndSemesters(): List<SchoolYearDto> {
        return schoolYearService.readAllByUser()
    }

    @GetMapping("/subjects")
    fun getSubjects(): List<SubjectDto> {
        return subjectService.readAllByUser()
    }
}