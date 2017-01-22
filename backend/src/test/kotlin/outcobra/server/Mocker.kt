package outcobra.server

import org.mockito.Matchers
import org.mockito.Mockito
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Primary
import org.springframework.context.annotation.Profile
import outcobra.server.annotation.DefaultImplementation
import outcobra.server.model.User
import outcobra.server.model.dto.UserDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.mapper.UserDtoMapper
import outcobra.server.model.repository.UserRepository
import outcobra.server.service.UserService
import javax.inject.Inject

@Configuration
@Profile(ProfileRegistry.PROFILE_MOCK_SERVICES)
open class Mocker(userRepository: UserRepository) {

    var USER: User
    var USER2: User

    @Inject
    @DefaultImplementation
    lateinit var userService: UserService
    @Inject
    lateinit var mapper: UserDtoMapper

    init {
        USER = userRepository.save(User(null, USER_AUTH0_ID, USER_NICKNAME, null))
        USER2 = userRepository.save(User(null, USER2_AUTH0_ID, USER2_NICKNAME, null))
    }

    companion object {
        val USER_AUTH0_ID = "test|1111111110"
        val USER_NICKNAME = "jmesserli"

        val USER2_AUTH0_ID = "saf123123"
        val USER2_NICKNAME = "needToRoll"
    }

    @Bean
    @Primary
    open fun mockUserService(): UserService {
        val mockService = Mockito.mock(UserService::class.java)


        Mockito.`when`(mockService.getCurrentUser()).then { USER }
        Mockito.`when`(mockService.getTokenUserId()).then { USER_AUTH0_ID }
        Mockito.`when`(mockService.readById(Matchers.anyLong())).then {
            var id = it.arguments[0] as Long
            userService.readById(id)
        }
    return mockService
}

}