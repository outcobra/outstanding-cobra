package outcobra.server.model.dto.emptyDto

import outcobra.server.model.Institution
import outcobra.server.model.mapper.MappableDto
import outcobra.server.model.mapper.Mapper

class InstitutionDto : MappableDto<InstitutionDto, Institution> {
    override fun getMapper(): Mapper<InstitutionDto, Institution> {
        throw UnsupportedOperationException("not implemented")
    }

    override fun toEntity(): Institution {
        throw UnsupportedOperationException("not implemented")
    }
//TODO Implement
}