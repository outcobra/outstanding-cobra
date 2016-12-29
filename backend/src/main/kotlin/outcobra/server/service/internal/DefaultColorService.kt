package outcobra.server.service.internal

import org.springframework.stereotype.Service
import outcobra.server.model.Color
import outcobra.server.model.dto.ColorDto
import outcobra.server.model.mapper.ColorMapper
import outcobra.server.service.ColorService
import kotlin.comparisons.compareBy

@Service
open class DefaultColorService(val mapper: ColorMapper) : ColorService {
    override fun getColorsWithIndex(): List<ColorDto> {
        val colors = Color.values().map { mapper.toDto(it) }
        return colors.map {
            val color = java.awt.Color.decode("#" + it.hex.toUpperCase())
            Pair(java.awt.Color.RGBtoHSB(color.red, color.green, color.blue, FloatArray(3)), it)
        }.sortedWith(compareBy({ it.first[0] }, { it.first[1] }, { it.first[2] }))
                .mapIndexed { i, pair ->
                    pair.second.index = i
                    pair.second
                }
    }
}
