package outcobra.server.model.dto.emptyDto

import outcobra.server.model.Semester
import outcobra.server.model.mapper.MappableDto
import outcobra.server.model.mapper.Mapper

class SemesterDto : MappableDto<SemesterDto, Semester> {
    override fun getMapper(): Mapper<SemesterDto, Semester> {
        throw UnsupportedOperationException("not implemented")
    }

    override fun toEntity(): Semester {
        throw UnsupportedOperationException("not implemented")
    }
//TODO Implement
}