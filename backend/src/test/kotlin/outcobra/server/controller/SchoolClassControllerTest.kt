package outcobra.server.controller

import org.junit.Ignore
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.HttpMethod
import org.springframework.test.context.junit4.SpringRunner
import org.springframework.test.web.client.ExpectedCount.manyTimes
import org.springframework.test.web.client.MockRestServiceServer
import org.springframework.test.web.client.match.MockRestRequestMatchers.method
import org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo
import org.springframework.web.client.RestTemplate
import java.net.URI

@RunWith(SpringRunner::class)
@SpringBootTest
class SchoolClassControllerTest {

    @Test
    @Ignore
    fun testCreateSchoolClass() {
        val restTemplate = RestTemplate()
        val serverMock = MockRestServiceServer.bindTo(restTemplate).build()
        serverMock.expect(manyTimes(), requestTo("/api/schoolClass")).andExpect(method(HttpMethod.PUT))
        restTemplate.requestFactory.createRequest(URI.create("/api/schoolClass"), HttpMethod.PUT)
    }
}