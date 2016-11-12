package outcobra.server.filter

import com.fasterxml.jackson.databind.ObjectMapper
import org.junit.After
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.Mockito.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Import
import org.springframework.context.annotation.Primary
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner
import outcobra.server.OutstandingCobraServerApplication
import outcobra.server.model.Institution
import outcobra.server.model.User
import outcobra.server.model.dto.UserDto
import outcobra.server.model.repository.InstitutionRepository
import outcobra.server.model.repository.UserRepository
import outcobra.server.service.UserService
import java.io.BufferedReader
import java.io.StringReader
import javax.servlet.FilterChain
import javax.servlet.ServletRequest
import javax.servlet.ServletResponse
import javax.servlet.http.HttpServletRequest

@RunWith(SpringJUnit4ClassRunner::class)
@SpringBootTest(classes = arrayOf(AuthFilterTest.TestConfiguration::class))
class AuthFilterTest {
    @Autowired
    lateinit var institutionRepository: InstitutionRepository
    @Autowired
    lateinit var userRepository: UserRepository
    @Autowired
    lateinit var authFilter: RequestAuthorizationFilter

    companion object {
        val INSTITUTION_NAME = "TestInstitution"

        val USER_AUTH0_ID = "test|1111111110"
        val USER_NICKNAME = "jmesserli"

        lateinit var INSTITUTION: Institution
        lateinit var USER: User

        lateinit var NOOP_FILTER_CHAIN: FilterChain
        lateinit var EMPTY_RESPONSE: ServletResponse
    }

    @Before
    fun setup() {
        USER = userRepository.save(User(null, USER_AUTH0_ID, USER_NICKNAME, null))
        INSTITUTION = institutionRepository.save(Institution(INSTITUTION_NAME, USER, null, null))
        USER = userRepository.findOne(USER.id)

        NOOP_FILTER_CHAIN = mock(FilterChain::class.java)
        EMPTY_RESPONSE = mock(ServletResponse::class.java)
    }

    @Test
    fun testPostFilter() {
        val mockRequest = makeMockRequest("POST", ObjectMapper().writeValueAsString(INSTITUTION), "/api/institution")

        authFilter.doFilter(mockRequest, EMPTY_RESPONSE, NOOP_FILTER_CHAIN)

        // Request should be passed on since it is valid
        verify(NOOP_FILTER_CHAIN).doFilter(mockRequest, EMPTY_RESPONSE)
    }

    @Test
    fun testGetFilter() {
        val mockRequest = makeMockRequest("GET", "", "/api/institution/${INSTITUTION.id}")

        authFilter.doFilter(mockRequest, EMPTY_RESPONSE, NOOP_FILTER_CHAIN)

        // Request should be passed on since it is valid
        verify(NOOP_FILTER_CHAIN).doFilter(mockRequest, EMPTY_RESPONSE)
    }

    @After
    fun teardown() {
        institutionRepository.deleteAll()
        userRepository.deleteAll()
    }

    private fun makeMockRequest(method: String, postText: String, uri: String): ServletRequest {
        val mockRequest = mock(HttpServletRequest::class.java)

        `when`(mockRequest.method).then { method }
        `when`(mockRequest.reader).then { makeReaderForText(postText) }
        `when`(mockRequest.requestURI).then { uri }

        return mockRequest
    }

    private fun makeReaderForText(text: String) = BufferedReader(StringReader(text))

    @Configuration
    @Import(OutstandingCobraServerApplication::class)
    open class TestConfiguration {
        @Bean
        @Primary
        open fun mockUserService(): UserService {
            val mockService = mock(UserService::class.java)

            `when`(mockService.getCurrentUser()).then { UserDto(USER_AUTH0_ID, USER_NICKNAME) }
            `when`(mockService.getTokenUserId()).then { USER_AUTH0_ID }

            return mockService
        }
    }
}