package outcobra.server.model.dto

import outcobra.server.exception.ValidationKey
import outcobra.server.model.domain.MarkGroup
import outcobra.server.model.domain.Subject
import outcobra.server.model.dto.mark.BaseMarkDto
import outcobra.server.model.interfaces.ParentLink

/**
 * @author Florian Bürgi
 * @since 1.2.0
 */
data class MarkGroupDto(override val id: Long = 0,
                        override val value: Double = 0.0,
                        override val weight: Double = 0.0,
                        override val description: String = "",
                        val markValues: List<MarkValueDto> = listOf(),
                        val subjectId: Long = 0,
                        val parentGroupId: Long = 0,
                        val markGroups: List<MarkGroupDto> = listOf(),
                        override val schoolClass: SchoolClassDto = SchoolClassDto(),
                        override val subject: SubjectDto = SubjectDto(),
                        override val semester: SemesterDto = SemesterDto()) : SchoolClassSemesterSubjectDto, BaseMarkDto {
    override val parentLink: ParentLink
        get() {
            if (subjectId == 0L && parentGroupId == 0L) {
                ValidationKey.INVALID_DTO.throwException()
            } else if (parentGroupId != 0L) {
                return ParentLink.make(parentGroupId, MarkGroup::class.java)
            }
            return ParentLink.make(subjectId, Subject::class.java)
        }

    override val identifier: Long get() = id


}