package outcobra.server.model.dto

import noutcobra.server.model.mapper.MappableDto
import outcobra.server.model.ExamTask
import outcobra.server.model.mapper.Mapper

/**
 * Created by Florian on 04.11.2016.
 */
class ExamTaskDto : MappableDto<ExamTaskDto,ExamTask> {
    override fun getMapper(): Mapper<ExamTaskDto, ExamTask> {
        throw UnsupportedOperationException("not implemented")
    }

    override fun toEntity(): ExamTask {
        throw UnsupportedOperationException("not implemented")
    }
}