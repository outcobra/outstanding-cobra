package outcobra.server.model.dto

import noutcobra.server.model.mapper.MappableDto
import outcobra.server.model.User
import outcobra.server.model.mapper.Mapper

data class UserDto(val userId: String, val username: String) : MappableDto<UserDto, User> {
    override fun getMapper(): Mapper<UserDto, User> {
        throw UnsupportedOperationException("not implemented")
    }

    override fun toEntity(): User {
        throw UnsupportedOperationException("not implemented")
    }
}