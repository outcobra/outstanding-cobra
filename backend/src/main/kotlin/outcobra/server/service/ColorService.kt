package outcobra.server.service

import outcobra.server.model.dto.ColorDto

interface ColorService {
    /**
     * returns a list of [ColorDto]s which have an index according to a sorting
     * @return list of [ColorDto]s
     */
    fun getColorsWithIndex(): List<ColorDto>
}