package outcobra.server.filter

import com.fasterxml.jackson.databind.ObjectMapper
import org.junit.After
import org.junit.Before
import org.junit.Ignore
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.Matchers.any
import org.mockito.Mockito.*
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Import
import org.springframework.context.annotation.Primary
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner
import outcobra.server.OutstandingCobraServerApplication
import outcobra.server.model.Institution
import outcobra.server.model.User
import outcobra.server.model.dto.InstitutionDto
import outcobra.server.model.dto.UserDto
import outcobra.server.model.mapper.InstitutionMapper
import outcobra.server.model.repository.InstitutionRepository
import outcobra.server.model.repository.UserRepository
import outcobra.server.service.UserService
import java.io.BufferedReader
import java.io.StringReader
import javax.inject.Inject
import javax.servlet.FilterChain
import javax.servlet.ServletRequest
import javax.servlet.ServletResponse
import javax.servlet.http.HttpServletRequest

@RunWith(SpringJUnit4ClassRunner::class)
@SpringBootTest(classes = arrayOf(AuthFilterTest.TestConfiguration::class))
@Ignore
class AuthFilterTest {
    @Inject
    lateinit var institutionRepository: InstitutionRepository
    @Inject
    lateinit var userRepository: UserRepository
    @Inject
    lateinit var authFilter: RequestAuthorizationFilter
    @Inject
    lateinit var institutionMapper: InstitutionMapper

    companion object {
        val INSTITUTION_NAME = "TestInstitution"

        val USER_AUTH0_ID = "test|1111111110"
        val USER_NICKNAME = "jmesserli"

        val USER2_AUTH0_ID = "saf123123"
        val USER2_NICKNAME = "needToRoll"

        lateinit var INSTITUTION: Institution
        lateinit var INSTITUTION2: Institution
        lateinit var INVALID_USER_INSTITUTION_DTO: InstitutionDto
        lateinit var USER2: User
        lateinit var USER: User

        lateinit var NOOP_FILTER_CHAIN: FilterChain
        lateinit var EMPTY_RESPONSE: ServletResponse
    }

    @Before
    fun setup() {
        USER = userRepository.save(User(null, USER_AUTH0_ID, USER_NICKNAME, null))
        USER2 = userRepository.save(User(null, USER2_AUTH0_ID, USER2_NICKNAME, null))

        INSTITUTION = institutionRepository.save(Institution(INSTITUTION_NAME, USER, null, null))
        INSTITUTION2 = institutionRepository.save(Institution(INSTITUTION_NAME, USER2, null, null))

        INVALID_USER_INSTITUTION_DTO = InstitutionDto(userId = USER.id, name = "invalid institution")

        USER = userRepository.findOne(USER.id)
        USER2 = userRepository.findOne(USER2.id)

        NOOP_FILTER_CHAIN = mock(FilterChain::class.java)
        EMPTY_RESPONSE = mock(ServletResponse::class.java)
    }

    @Test
    fun postFilter() {
        val mockRequest = makeMockRequest("POST", ObjectMapper().writeValueAsString(institutionMapper.toDto(INSTITUTION)), "/api/institution")

        authFilter.doFilter(mockRequest, EMPTY_RESPONSE, NOOP_FILTER_CHAIN)

        // Request should be passed on since it is valid
        verify(NOOP_FILTER_CHAIN).doFilter(any(HttpServletRequest::class.java), eq(EMPTY_RESPONSE))
    }

    @Test
    fun invalidPostFilter() {
        val mockRequest = makeMockRequest("POST", ObjectMapper().writeValueAsString(institutionMapper.toDto(INSTITUTION2)), "/api/institution")
        authFilter.doFilter(mockRequest, EMPTY_RESPONSE, NOOP_FILTER_CHAIN)
        // Request should be destroyed since it is invalid
        verifyZeroInteractions(NOOP_FILTER_CHAIN)
    }

    @Test
    fun invalidInstitutionPutUserId() {
        val mockRequest = makeMockRequest("PUT", ObjectMapper().writeValueAsString(INVALID_USER_INSTITUTION_DTO), "/api/institution")
        authFilter.doFilter(mockRequest, EMPTY_RESPONSE, NOOP_FILTER_CHAIN)

        // Request should have no interactions since the userid must be 0
        verifyZeroInteractions(NOOP_FILTER_CHAIN)
    }

    @Test
    fun getFilter() {
        val mockRequest = makeMockRequest("GET", "", "/api/institution/${INSTITUTION.id}")

        authFilter.doFilter(mockRequest, EMPTY_RESPONSE, NOOP_FILTER_CHAIN)

        // Request should be passed on since it is valid
        verify(NOOP_FILTER_CHAIN).doFilter(any(HttpServletRequest::class.java), eq(EMPTY_RESPONSE))
    }

    @Test
    fun invalidGetFilter() {
        val mockRequest = makeMockRequest("GET", "", "/api/institution/${INSTITUTION2.id}")
        authFilter.doFilter(mockRequest, EMPTY_RESPONSE, NOOP_FILTER_CHAIN)

        // Request should be destroyed since it is invalid
        verifyZeroInteractions(NOOP_FILTER_CHAIN)
    }

    @After
    fun teardown() {
        institutionRepository.delete(INSTITUTION.id)
        institutionRepository.delete(INSTITUTION2.id)
        userRepository.delete(USER.id)
        userRepository.delete(USER2.id)

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

            `when`(mockService.getCurrentUser()).then { UserDto(USER.id, USER_AUTH0_ID, USER_NICKNAME) }
            `when`(mockService.getTokenUserId()).then { USER_AUTH0_ID }

            return mockService
        }
    }
}