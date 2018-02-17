package outcobra.server.model.mapper

import org.assertj.core.api.Assertions.assertThat
import org.assertj.core.api.Assertions.assertThatThrownBy
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.junit4.SpringRunner
import org.springframework.transaction.annotation.Transactional
import outcobra.server.config.ProfileRegistry
import outcobra.server.exception.ValidationKey
import outcobra.server.model.Color
import outcobra.server.model.dto.ColorDto
import outcobra.server.model.interfaces.Mapper
import javax.inject.Inject

/**
 * @author Florian Bürgi
 * @since 1.4.0
 */
@RunWith(SpringRunner::class)
@SpringBootTest
@Transactional
@ActiveProfiles(ProfileRegistry.TEST)
class ColorMapperTest {

    @Inject
    lateinit var colorMapper: Mapper<Color, ColorDto>

    @Test
    fun mapValidEntityToDto() {
        val colorDto = ColorDto(Color.RED.name, Color.RED.hex)
        val color = colorMapper.fromDto(colorDto)
        assertThat(color).isEqualTo(Color.RED)
    }

    @Test
    fun mapValidDtoToEntity() {
        val color = Color.BLUE
        val colorDto = colorMapper.toDto(color)
        assertThat(colorDto.hex).isEqualToIgnoringCase(color.hex)
        assertThat(colorDto.name).isEqualToIgnoringCase(color.name)
    }

    @Test
    fun tryMapInvalidDto() {
        val invalidColorDto = ColorDto("invalid", "qwertz")
        assertThatThrownBy {
            colorMapper.fromDto(invalidColorDto)
        }.isEqualTo(ValidationKey.INVALID_DTO.makeException())
    }

}