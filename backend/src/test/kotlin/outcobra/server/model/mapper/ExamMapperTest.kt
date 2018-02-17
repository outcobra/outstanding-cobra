package outcobra.server.model.mapper

import org.assertj.core.api.Assertions.assertThat
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.junit4.SpringRunner
import org.springframework.transaction.annotation.Transactional
import outcobra.server.config.ProfileRegistry
import outcobra.server.model.Exam
import outcobra.server.model.QExam
import outcobra.server.model.dto.ExamDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.ExamRepository
import javax.inject.Inject


/**
 * @author Florian Bürgi
 * @since 1.4.0
 */
@RunWith(SpringRunner::class)
@SpringBootTest
@Transactional
@ActiveProfiles(ProfileRegistry.TEST)
class ExamMapperTest {

    @Inject
    lateinit var examRepository: ExamRepository

    @Inject
    lateinit var examMapper: Mapper<Exam, ExamDto>

    @Test
    fun mapExamToDto() {
        assert(examRepository.count() != 0L)
        val exam = examRepository.findAll().first()
        val dto = examMapper.toDto(exam)
        assertThat(dto.id).isEqualTo(exam.id)
        assertThat(dto.name).isEqualTo(exam.name)
        assertThat(dto.description).isEqualTo(exam.description)
        assertThat(dto.date).isEqualTo(exam.date)
        assertThat(dto.subject.id).isEqualTo(exam.subject?.id ?: 0L)
    }


    @Test
    fun mapDtoToExamWithExistingMark() {
        val examWithMarkPredicate = QExam.exam.mark.isNotNull
        val exam = examRepository.findAll(examWithMarkPredicate).first()
        val originalDto = examMapper.toDto(exam)
        val newName = originalDto.name + "Modified"
        val modifiedDto = ExamDto(originalDto.id, newName, originalDto.description, originalDto.date, null, originalDto.examTasks, originalDto.subject)
        val modifiedEntity = examMapper.fromDto(modifiedDto)
        assertThat(modifiedEntity.mark).isEqualToComparingFieldByField(exam.mark)
        assertThat(modifiedEntity.name).isEqualTo(newName)
    }

    @Test
    fun mapDtoToExamWithoutMark() {
        val examWithMarkPredicate = QExam.exam.mark.isNull
        val exam = examRepository.findAll(examWithMarkPredicate).first()
        val dto = examMapper.toDto(exam)
        assertThat(exam.mark).isNull()
        assertThat(exam.id).isEqualTo(dto.id)
        assertThat(exam.name).isEqualTo(dto.name)
        assertThat(exam.description).isEqualTo(dto.description)
        assertThat(exam.date).isEqualTo(dto.date)
        assertThat(exam.subject?.id ?: 0L).isEqualTo(dto.subject.id)
    }
}