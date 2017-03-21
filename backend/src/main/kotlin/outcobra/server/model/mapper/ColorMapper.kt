package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.Color
import outcobra.server.model.dto.ColorDto
import outcobra.server.model.interfaces.Mapper

/**
 * @author Mario Kunz
 */
@Component
class ColorMapper : Mapper<Color, ColorDto> {
    override fun fromDto(from: ColorDto): Color? = Color.getByHex(from.hex)
    override fun toDto(from: Color): ColorDto = ColorDto(from.name, from.hex, 0)
}