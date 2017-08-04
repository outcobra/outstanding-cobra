package outcobra.server.service.internal

import org.springframework.stereotype.Service
import outcobra.server.model.dto.filter.SchoolClassSubjects
import outcobra.server.model.dto.filter.SubjectFilterDto
import outcobra.server.service.FilterService
import outcobra.server.service.SchoolClassService
import outcobra.server.service.SubjectService
import javax.inject.Inject

/**
 * @author Florian Bürgi
 * @since <since>
 */
@Service
class DefaultFilterService
@Inject constructor(val schoolClassService: SchoolClassService,
                    val subjectService: SubjectService) : FilterService {

    override fun getSubjectFilter(): SubjectFilterDto {
        return SubjectFilterDto(schoolClassService.readAllByUser().map {
            SchoolClassSubjects(it, subjectService.readAllBySchoolClass(it.id))
        })
    }
}