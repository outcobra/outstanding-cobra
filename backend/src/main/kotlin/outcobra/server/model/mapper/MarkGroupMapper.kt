package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.*
import outcobra.server.model.dto.MarkGroupDto
import outcobra.server.model.dto.MarkValueDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.interfaces.ParentLinked
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
                                          val markValueMapper: Mapper<MarkValue, MarkValueDto>)
    : Mapper<MarkGroup, MarkGroupDto>, BaseMapper() {

    override fun fromDto(from: MarkGroupDto): MarkGroup {
        validateChildren(from.markValues.map { it.id }, MarkValue::class, from.id, MarkGroup::class)
        validateChildren(from.markGroups.map { it.id }, MarkGroup::class, from.id, MarkGroup::class)
        var subject: Subject? = null
        var parentGroup: MarkGroup? = null
        if (from.subjectId != 0L) {
            subject = subjectRepository.findOne(from.subjectId)
        } else if (from.parentGroupId != 0L) {
            parentGroup = markGroupRepository.findOne(from.parentGroupId)
        }
        val marks: List<Mark> = from.markValues.map { markValueMapper.fromDto(it) }
        if (subject != null) {
            marks.plus(from.markGroups.map { fromDto(it) })
        }
        val result = MarkGroup(from.weight, parentGroup, from.description, marks, subject)
        result.id = from.id
        return result
    }

    override fun toDto(from: MarkGroup): MarkGroupDto {
        val markValues = from.marks.filter { it is MarkValue }.map { it as MarkValue }
        val nestedGroups = from.marks.filter { it is MarkGroup }.map { toDto(it as MarkGroup) }
        val parent: ParentLinked = from.parent
        val parentGroupId: Long
        val subjectId: Long
        if (parent is Subject) {
            subjectId = from.parent.id
            parentGroupId = 0L
        } else {
            parentGroupId = from.parent.id
            subjectId = 0L
        }
        validateChildren(markValues.map { it.id }, MarkValue::class, from.id, MarkGroup::class)
        validateChildren(nestedGroups.map { it.id }, MarkGroup::class, from.id, MarkGroup::class)
        return MarkGroupDto(from.id, from.value, from.weight, from.description,
                markValues.map { mark -> markValueMapper.toDto(mark) },
                subjectId, parentGroupId, nestedGroups)
    }


}