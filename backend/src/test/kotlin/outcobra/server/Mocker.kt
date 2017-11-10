package outcobra.server

import org.mockito.Matchers
import org.mockito.Mockito
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Primary
import org.springframework.context.annotation.Profile
import outcobra.server.annotation.DefaultImplementation
import outcobra.server.config.ProfileRegistry.Companion.MOCK_SERVICES
import outcobra.server.model.User
import outcobra.server.model.repository.UserRepository
import outcobra.server.service.UserService
import javax.inject.Inject

@Configuration
@Profile(MOCK_SERVICES)
class Mocker(userRepository: UserRepository) {

    val USER: User
    val USER2: User

    @Inject
    @DefaultImplementation
    lateinit var userService: UserService

    init {
        USER = userRepository.save(User(USER_AUTH0_ID, USER_NICKNAME, listOf()))
        USER2 = userRepository.save(User(USER2_AUTH0_ID, USER2_NICKNAME, listOf()))
    }

    companion object {
        val USER_AUTH0_ID = "test|1111111110"
        val USER_NICKNAME = "jmesserli"

        val USER2_AUTH0_ID = "saf123123"
        val USER2_NICKNAME = "needToRoll"
    }

    @Bean
    @Primary
    fun mockUserService(): UserService {
        val mockService = Mockito.mock(UserService::class.java)

        Mockito.`when`(mockService.getCurrentUser()).then { userService.readUserById(USER.id) }
        Mockito.`when`(mockService.getTokenUserId()).then { USER_AUTH0_ID }
        Mockito.`when`(mockService.readUserById(Matchers.anyLong())).then { userService.readUserById(it.arguments[0] as Long) }
        return mockService
    }

}