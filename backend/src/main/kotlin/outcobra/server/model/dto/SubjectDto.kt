package outcobra.server.model.dto

import outcobra.server.model.mapper.MappableDto
import outcobra.server.model.Subject
import outcobra.server.model.mapper.Mapper

class SubjectDto : MappableDto<SubjectDto, Subject> {
    override fun getMapper(): Mapper<SubjectDto, Subject> {
        throw UnsupportedOperationException("not implemented")
    }

    override fun toEntity(): Subject {
        throw UnsupportedOperationException("not implemented")
    }
//TODO Implement
}