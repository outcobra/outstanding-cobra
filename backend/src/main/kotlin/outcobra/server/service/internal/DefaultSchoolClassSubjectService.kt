package outcobra.server.service.internal

import org.springframework.stereotype.Service
import outcobra.server.model.dto.SchoolClassSubjectDto
import outcobra.server.service.SchoolClassService
import outcobra.server.service.SchoolClassSubjectService
import outcobra.server.service.SubjectService
import javax.inject.Inject

/**
 * @author Florian Bürgi
 * @since 1.2.0
 */
@Service
class DefaultSchoolClassSubjectService
@Inject constructor(val schoolClassService: SchoolClassService,
                    val subjectService: SubjectService) : SchoolClassSubjectService {

    override fun getSchoolClassSubjects(): List<SchoolClassSubjectDto> {
        return schoolClassService.readAllByUser().map {
            SchoolClassSubjectDto(it, subjectService.readAllBySchoolClass(it.id))
        }
    }
}