package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.Teacher
import outcobra.server.model.dto.TeacherDto

/**
 * Created by Florian on 13.11.2016.
 */

@Component
open class TeacherDtoMapper : Mapper<Teacher,TeacherDto> {
    //TODO implement
    override fun fromDto(from: TeacherDto): Teacher {
        return Teacher()
    }

    override fun toDto(from: Teacher): TeacherDto {
        return TeacherDto()
    }
}
