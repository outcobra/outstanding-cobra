package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.MarkValue
import outcobra.server.model.dto.MarkValueDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.MarkGroupRepository
import javax.inject.Inject


/**
 * @author Florian Bürgi
 * @since <since>
 */
@Component
class MarkMapper @Inject constructor(val markGroupRepository: MarkGroupRepository)
    : Mapper<MarkValue, MarkValueDto>, BaseMapper() {

    override fun fromDto(from: MarkValueDto): MarkValue {
        val markGroup = markGroupRepository.findOne(from.markGroupId)
        val mark = MarkValue(from.value, from.weight, markGroup, from.description, null)
        mark.id = from.id
        return mark
    }

    override fun toDto(from: MarkValue): MarkValueDto {
        return MarkValueDto(from.id, from.value, from.weight, from.description, from.markGroup.id)
    }
}