package outcobra.server.model.dto

import outcobra.server.model.mapper.MappableDto
import outcobra.server.model.Exam
import outcobra.server.model.mapper.Mapper

/**
 * Created by Florian on 04.11.2016.
 */
class ExamDto : MappableDto<ExamDto, Exam> {
    override fun toEntity(): Exam {
        throw UnsupportedOperationException("not implemented")
    }

    override fun getMapper(): Mapper<ExamDto, Exam> {
        throw UnsupportedOperationException("not implemented")
    }
    //TODO implement
}