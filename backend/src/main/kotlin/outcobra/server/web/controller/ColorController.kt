package outcobra.server.web.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import outcobra.server.model.dto.ColorDto
import outcobra.server.service.ColorService
import javax.inject.Inject

/**
 * @author Mario Kunz
 * @since 1.0.0
 */
@RestController
@RequestMapping("/api/color")
class ColorController @Inject constructor(val service: ColorService) {

    @GetMapping
    fun getColors(): List<ColorDto> {
        return service.getColorsWithIndex()
    }
}