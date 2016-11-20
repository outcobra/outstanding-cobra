package outcobra.server

import org.mockito.Mockito
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Primary
import org.springframework.context.annotation.Profile
import outcobra.server.model.Institution
import outcobra.server.model.User
import outcobra.server.model.dto.UserDto
import outcobra.server.model.repository.UserRepository
import outcobra.server.service.UserService
import java.util.*

@Configuration
@Profile("mock")
open class Mocker(userRepository: UserRepository) {

    init {
        USER = userRepository.save(User(null, Mocker.USER_AUTH0_ID, Mocker.USER_NICKNAME, null))
        USER2 = userRepository.save(User(null, Mocker.USER2_AUTH0_ID, Mocker.USER2_NICKNAME, null))
    }

    companion object {
        val USER_AUTH0_ID = "test|1111111110"
        val USER_NICKNAME = "jmesserli"

        val USER2_AUTH0_ID = "saf123123"
        val USER2_NICKNAME = "needToRoll"

        lateinit var USER2: User
        lateinit var USER: User
    }

    @Bean
    @Primary
    open fun mockUserService(): UserService {
        val mockService = Mockito.mock(UserService::class.java)

        Mockito.`when`(mockService.getCurrentUser()).then { User(USER.id, USER_AUTH0_ID, USER_NICKNAME) }
        Mockito.`when`(mockService.getTokenUserId()).then { USER_AUTH0_ID }

        return mockService
    }

}