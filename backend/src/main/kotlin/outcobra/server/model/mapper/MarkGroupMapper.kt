package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.Mark
import outcobra.server.model.MarkGroup
import outcobra.server.model.MarkValue
import outcobra.server.model.Subject
import outcobra.server.model.dto.MarkDto
import outcobra.server.model.dto.MarkGroupDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.MarkGroupRepository
import outcobra.server.model.repository.SubjectRepository
import javax.inject.Inject

/**
 * @author Florian Bürgi
 * @since <since>
 */
@Component
class MarkGroupMapper @Inject constructor(val subjectRepository: SubjectRepository,
                                          val markGroupRepository: MarkGroupRepository,
                                          val markMapper: Mapper<MarkValue, MarkDto>)
    : Mapper<MarkGroup, MarkGroupDto>, BaseMapper() {

    override fun fromDto(from: MarkGroupDto): MarkGroup {
        validateChildren(from.marks.map { it.id }, MarkValue::class, from.id, MarkGroup::class)
        validateChildren(from.markGroups, MarkGroup::class, from.id, MarkGroup::class)
        var subject: Subject? = null
        var parentGroup: MarkGroup? = null
        if (from.subjectId != 0L) {
            subject = subjectRepository.findOne(from.subjectId)
        } else if (from.parentGroupId != 0L) {
            parentGroup = markGroupRepository.findOne(from.parentGroupId)
        }
        val marks: List<Mark> = from.marks.map { markMapper.fromDto(it) }
        marks.plus(from.markGroups.map { markGroupRepository.findOne(it) })
        val result = MarkGroup(from.weight, null, parentGroup, from.description, marks, subject)
        result.id = from.id
        return result
    }

    override fun toDto(from: MarkGroup): MarkGroupDto {
        val markValues = from.marks.filter { it is MarkValue }
        val nestedGroupIds = from.marks.filter { it is MarkGroup }.map { it.id }
        val parent = from.parent as Subject
        val parentGroupId = from.markGroup.id ?: 0L
        var subjectId = 0L
        if (parent.markGroup.id == from.id) {
            subjectId = parent.id
        }
        validateChildren(markValues.map { it.id }, MarkValue::class, from.id, MarkGroup::class)
        validateChildren(nestedGroupIds, MarkGroup::class, from.id, MarkGroup::class)
        return MarkGroupDto(from.id, from.value, from.weight, from.description,
                from.marks.map { mark -> markMapper.toDto(mark as MarkValue) },
                subjectId, parentGroupId, nestedGroupIds)
    }


}