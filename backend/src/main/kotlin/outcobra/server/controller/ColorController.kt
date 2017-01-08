package outcobra.server.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import outcobra.server.model.dto.ColorDto
import outcobra.server.service.ColorService
import javax.inject.Inject

/**
 * @author Mario Kunz
 */
@RestController
@RequestMapping("/api/color")
class ColorController @Inject constructor(val service: ColorService) {

    @GetMapping(value = "")
    fun getColors(): List<ColorDto> {
        return service.getColorsWithIndex()
    }
}