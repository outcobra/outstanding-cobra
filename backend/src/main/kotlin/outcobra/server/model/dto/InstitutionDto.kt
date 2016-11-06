package outcobra.server.model.dto

import noutcobra.server.model.mapper.MappableDto
import outcobra.server.model.Institution
import outcobra.server.model.mapper.Mapper

/**
 * Created by Florian on 04.11.2016.
 */
class InstitutionDto : MappableDto<InstitutionDto, Institution> {
    override fun getMapper(): Mapper<InstitutionDto, Institution> {
        throw UnsupportedOperationException("not implemented")
    }

    override fun toEntity(): Institution {
        throw UnsupportedOperationException("not implemented")
    }
//TODO Implement
}