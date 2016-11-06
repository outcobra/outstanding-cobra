package outcobra.server.model.dto

import noutcobra.server.model.mapper.MappableDto
import outcobra.server.model.Semester
import outcobra.server.model.mapper.Mapper

/**
 * Created by Florian on 04.11.2016.
 */
class SemesterDto : MappableDto<SemesterDto, Semester> {
    override fun getMapper(): Mapper<SemesterDto, Semester> {
        throw UnsupportedOperationException("not implemented")
    }

    override fun toEntity(): Semester {
        throw UnsupportedOperationException("not implemented")
    }
//TODO Implement
}