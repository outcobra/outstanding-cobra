package outcobra.server.model.mapper

import outcobra.server.model.MarkGroup
import outcobra.server.model.MarkValue
import outcobra.server.model.Subject
import outcobra.server.model.dto.MarkDto
import outcobra.server.model.dto.MarkGroupDto
import outcobra.server.model.interfaces.Mapper

/**
 * Created by fbbue on 20.05.2017.
 */
class MarkGroupDtoMapper(val markDtoMapper: Mapper<MarkValue, MarkDto>)
    : Mapper<MarkGroup, MarkGroupDto>, BaseMapper() {

    override fun fromDto(from: MarkGroupDto): MarkGroup {
        TODO("not implemented")
    }

    override fun toDto(from: MarkGroup): MarkGroupDto {
        val markValues = from.marks.filter { it is MarkValue }
        val nestedGroupIds = from.marks.filter { it is MarkGroup }.map { it.id }
        //Temporary solution: Does not work for nested groups;
        val parent = from.parent as Subject
        val parentGroupId = from.markGroup.id ?: 0
        var subjectId = 0L
        if (parent.markGroup.id == from.id) {
            subjectId = parent.id
        }
        validateChildren(markValues.map { it.id }, MarkValue::class, from.id, MarkGroup::class)
        validateChildren(nestedGroupIds, MarkGroup::class, from.id, MarkGroup::class)
        return MarkGroupDto(from.id, from.value, from.weight, from.description,
                from.marks.map { mark -> markDtoMapper.toDto(mark as MarkValue) },
                subjectId, parentGroupId, nestedGroupIds)
    }


}