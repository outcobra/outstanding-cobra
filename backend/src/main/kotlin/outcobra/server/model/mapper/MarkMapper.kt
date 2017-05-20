package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.MarkValue
import outcobra.server.model.dto.MarkDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.MarkGroupRepository
import javax.inject.Inject


/**
 * @author Florian Bürgi
 * @since <since>
 */
@Component
class MarkMapper @Inject constructor(val markGroupRepository: MarkGroupRepository)
    : Mapper<MarkValue, MarkDto>, BaseMapper() {

    override fun fromDto(from: MarkDto): MarkValue {
        val markGroup = markGroupRepository.findOne(from.markGroupId)
        val mark = MarkValue(from.value, from.weight, markGroup, from.description, null)
        mark.id = from.id
        return mark
    }

    override fun toDto(from: MarkValue): MarkDto {
        return MarkDto(from.id, from.value, from.weight, from.description, from.markGroup.id)
    }
}