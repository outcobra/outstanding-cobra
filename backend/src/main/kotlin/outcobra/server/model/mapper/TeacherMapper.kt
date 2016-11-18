package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.Teacher
import outcobra.server.model.dto.TeacherDto

@Component
open class TeacherMapper : Mapper<Teacher, TeacherDto> {
    //TODO implement
    override fun fromDto(from: TeacherDto): Teacher {
        throw UnsupportedOperationException()
    }

    override fun toDto(from: Teacher): TeacherDto {
        throw UnsupportedOperationException()
    }
}
