package outcobra.server.data.loaders

import org.slf4j.LoggerFactory
import org.springframework.core.annotation.Order
import org.springframework.stereotype.Component
import outcobra.server.data.DataLoadOrder.MARK
import outcobra.server.data.loaders.SubjectDataLoader.Companion.SUBJECT1
import outcobra.server.data.loaders.SubjectDataLoader.Companion.SUBJECT2
import outcobra.server.data.loaders.SubjectDataLoader.Companion.SUBJECT3
import outcobra.server.data.loaders.SubjectDataLoader.Companion.SUBJECT4
import outcobra.server.data.loaders.SubjectDataLoader.Companion.SUBJECT5
import outcobra.server.data.loaders.SubjectDataLoader.Companion.SUBJECT6
import outcobra.server.data.loaders.SubjectDataLoader.Companion.SUBJECT7
import outcobra.server.data.loaders.SubjectDataLoader.Companion.SUBJECT8
import outcobra.server.data.loaders.SubjectDataLoader.Companion.SUBJECT9
import outcobra.server.model.Mark
import outcobra.server.model.MarkGroup
import outcobra.server.model.MarkValue
import outcobra.server.model.Subject
import outcobra.server.model.repository.MarkGroupRepository
import outcobra.server.model.repository.MarkValueRepository
import outcobra.server.model.repository.SubjectRepository
import java.util.*
import javax.inject.Inject

/**
 * @author Florian Bürgi
 * @since <since>
 */
@Component
@Order(MARK)
class MarkDataLoader @Inject constructor(val markValueRepository: MarkValueRepository,
                                         val markGroupRepository: MarkGroupRepository,
                                         val subjectRepository: SubjectRepository) : DataLoader {

    private val random = Random()


    companion object {
        lateinit var MARK1: Mark
        lateinit var MARK2: Mark
        lateinit var MARK3: Mark
        lateinit var SUBGROUP1: MarkGroup
        lateinit var MARK_GROUP_SUBJ: MarkGroup
        private val LOGGER = LoggerFactory.getLogger(MarkDataLoader::class.java)
    }

    override fun shouldLoad(): Boolean = true

    override fun load() {
        listOf(SUBJECT1, SUBJECT2, SUBJECT3, SUBJECT4, SUBJECT5, SUBJECT6, SUBJECT7, SUBJECT8, SUBJECT9)
                .forEach { saveMarksForSemester(it) }
    }

    private fun saveMarksForSemester(subject: Subject) {
        MARK_GROUP_SUBJ = MarkGroup(1.0, null, null, "${subject.name} mark", listOf<Mark>(), subject)
        MARK_GROUP_SUBJ = markGroupRepository.save(MARK_GROUP_SUBJ)
        subject.markGroup = MARK_GROUP_SUBJ
        subjectRepository.save(subject)
        SUBGROUP1 = markGroupRepository.save(MarkGroup(0.5, null, MARK_GROUP_SUBJ, "subgroup", listOf<Mark>(), subject))
        MARK1 = markValueRepository.save(MarkValue(getRandomMark(), getRandomWeight(), MARK_GROUP_SUBJ, "mark1", null))
        MARK2 = markValueRepository.save(MarkValue(getRandomMark(), getRandomWeight(), SUBGROUP1, "mark2", null))
        MARK3 = markValueRepository.save(MarkValue(getRandomMark(), getRandomWeight(), SUBGROUP1, "mark3", null))
        LOGGER.debug("saved marks for subject ${subject.name}")

    }

    private fun getRandomMark(): Double = getRandomDouble(1.0, 6)

    private fun getRandomWeight(): Double = getRandomDouble(0.2, 2, 4)

    private fun getRandomDouble(min: Double, max: Int, fraction: Int = 2): Double {
        val double = min + (max - min) * random.nextDouble()
        return Math.round(double * fraction).toDouble() / fraction
    }
}