package outcobra.server.service.internal

import org.springframework.stereotype.Service
import outcobra.server.model.MarkGroup
import outcobra.server.model.MarkValue
import outcobra.server.model.QMarkValue
import outcobra.server.model.dto.MarkDto
import outcobra.server.model.dto.MarkGroupDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.MarkRepository
import outcobra.server.service.MarkGroupService
import outcobra.server.service.MarkService
import outcobra.server.service.base.internal.DefaultBaseService
import outcobra.server.validator.RequestValidator
import javax.inject.Inject

/**
 * @author Florian Bürgi
 * @since <since>
 */
@Service
class DefaultMarkService
@Inject constructor(val markMapper: Mapper<MarkValue, MarkDto>,
                    val markRepository: MarkRepository,
                    val validator: RequestValidator<MarkDto>,
                    val markGroupService: MarkGroupService)
    : DefaultBaseService<MarkValue, MarkDto, MarkRepository>(markMapper, markRepository, validator, MarkValue::class), MarkService {

    override fun readAllByMarkGroup(markGroupId: Long): List<MarkDto> {
        validator.validateRequestById(markGroupId, MarkGroup::class)
        return markRepository.findAll(QMarkValue.markValue.markGroup.id.eq(markGroupId)).map { markMapper.toDto(it) }
    }

    override fun saveMarkAndGetChangedParent(dto: MarkDto): MarkGroupDto {
        super.save(dto)
        return markGroupService.readById(dto.markGroupId)
    }

}