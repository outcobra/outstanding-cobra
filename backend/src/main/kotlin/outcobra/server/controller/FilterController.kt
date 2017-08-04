package outcobra.server.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import outcobra.server.model.dto.filter.SubjectFilterDto
import outcobra.server.service.FilterService
import javax.inject.Inject

/**
 * @author Florian Bürgi
 * @since <since>
 */
@RestController
@RequestMapping("/api")
class FilterController @Inject constructor(val filterService: FilterService) {

    @GetMapping("/subject/filter")
    fun getSubjectFilter(): SubjectFilterDto {
        return filterService.getSubjectFilter()
    }
}