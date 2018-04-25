package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.exception.ValidationKey
import outcobra.server.model.domain.Color
import outcobra.server.model.dto.ColorDto
import outcobra.server.model.interfaces.Mapper

/**
 * @author Mario Kunz
 * @since 1.0.0
 */
@Component
class ColorMapper : Mapper<Color, ColorDto> {
    override fun fromDto(from: ColorDto): Color = Color.getByHex(from.hex) ?: ValidationKey.INVALID_DTO.throwException()
    override fun toDto(from: Color): ColorDto = ColorDto(from.name, from.hex, 0)
}