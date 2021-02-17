package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.MarkValue
import outcobra.server.model.dto.MarkValueDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.ExamRepository
import outcobra.server.model.repository.MarkGroupRepository
import javax.inject.Inject


/**
 * @author Florian Bürgi
 * @since 1.2.0
 */
@Component
class MarkMapper @Inject constructor(val markGroupRepository: MarkGroupRepository,
                                     val examRepository: ExamRepository)
    : Mapper<MarkValue, MarkValueDto>, BaseMapper() {

    override fun fromDto(from: MarkValueDto): MarkValue {
        val markGroup = markGroupRepository.getOne(from.markGroupId)
        val exam = examRepository.getOne(from.examId)
        val mark = MarkValue(from.value, from.weight, markGroup, from.description, exam)
        mark.id = from.id
        return mark
    }

    override fun toDto(from: MarkValue): MarkValueDto {
        return MarkValueDto(from.id, from.getValue(), from.weight, from.description, from.exam?.id ?: 0L, from.markGroup?.id ?: 0)
    }
}
