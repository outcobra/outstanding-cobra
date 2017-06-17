package outcobra.server.service.internal

import org.springframework.stereotype.Service
import outcobra.server.model.MarkGroup
import outcobra.server.model.MarkValue
import outcobra.server.model.QMarkValue
import outcobra.server.model.dto.MarkGroupDto
import outcobra.server.model.dto.MarkValueDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.MarkValueRepository
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
@Inject constructor(val markValueMapper: Mapper<MarkValue, MarkValueDto>,
                    val markValueRepository: MarkValueRepository,
                    val validator: RequestValidator<MarkValueDto>,
                    val markGroupService: MarkGroupService)
    : DefaultBaseService<MarkValue, MarkValueDto, MarkValueRepository>(markValueMapper, markValueRepository, validator, MarkValue::class), MarkService {

    override fun readAllByMarkGroup(markGroupId: Long): List<MarkValueDto> {
        validator.validateRequestById(markGroupId, MarkGroup::class)
        return markValueRepository.findAll(QMarkValue.markValue.markGroup.id.eq(markGroupId)).map { markValueMapper.toDto(it) }
    }

    override fun saveMarkAndGetChangedParent(dto: MarkValueDto): MarkGroupDto {
        super.save(dto)
        return markGroupService.readById(dto.markGroupId)
    }

}