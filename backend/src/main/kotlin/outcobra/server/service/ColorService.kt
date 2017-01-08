package outcobra.server.service

import outcobra.server.model.dto.ColorDto

interface ColorService {
    fun getColorsWithIndex(): List<ColorDto>
}