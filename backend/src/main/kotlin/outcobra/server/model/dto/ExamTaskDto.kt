package outcobra.server.model.dto

import outcobra.server.model.mapper.MappableDto
import outcobra.server.model.ExamTask
import outcobra.server.model.mapper.Mapper

class ExamTaskDto : MappableDto<ExamTaskDto,ExamTask> {
    override fun getMapper(): Mapper<ExamTaskDto, ExamTask> {
        throw UnsupportedOperationException("not implemented")
    }

    override fun toEntity(): ExamTask {
        throw UnsupportedOperationException("not implemented")
    }
}