package outcobra.server.controller

import org.junit.Ignore
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.HttpMethod
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.junit4.SpringRunner
import org.springframework.test.web.client.ExpectedCount.manyTimes
import org.springframework.test.web.client.MockRestServiceServer
import org.springframework.test.web.client.match.MockRestRequestMatchers.method
import org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo
import org.springframework.web.client.RestTemplate
import outcobra.server.config.ProfileRegistry
import java.net.URI
import javax.transaction.Transactional

@SpringBootTest
@RunWith(SpringRunner::class)
@ActiveProfiles(ProfileRegistry.TEST)
@Transactional
@Ignore
class SchoolClassControllerTest {

    @Test
    fun testCreateSchoolClass() {
        val restTemplate = RestTemplate()
        val serverMock = MockRestServiceServer.bindTo(restTemplate).build()
        serverMock.expect(manyTimes(), requestTo("/api/schoolClass")).andExpect(method(HttpMethod.PUT))
        restTemplate.requestFactory.createRequest(URI.create("/api/schoolClass"), HttpMethod.PUT)
    }
}