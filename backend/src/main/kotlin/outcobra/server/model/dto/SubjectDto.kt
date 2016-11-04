package outcobra.server.model.dto

import noutcobra.server.model.mapper.MappableDto
import outcobra.server.model.Subject
import outcobra.server.model.mapper.Mapper

/**
 * Created by Florian on 04.11.2016.
 */
class SubjectDto : MappableDto<SubjectDto, Subject> {
    override fun getMapper(): Mapper<SubjectDto, Subject> {
        throw UnsupportedOperationException("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun toEntity(): Subject {
        throw UnsupportedOperationException("not implemented") //To change body of created functions use File | Settings | File Templates.
    }
//TODO Implement
}