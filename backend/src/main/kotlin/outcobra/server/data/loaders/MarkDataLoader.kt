package outcobra.server.data.loaders

import org.slf4j.LoggerFactory
import org.springframework.core.annotation.Order
import org.springframework.stereotype.Component
import outcobra.server.data.DataLoadOrder.MARK
import outcobra.server.data.loaders.SubjectDataLoader.Companion.DATABASES
import outcobra.server.data.loaders.SubjectDataLoader.Companion.GERMAN
import outcobra.server.data.loaders.SubjectDataLoader.Companion.GUP
import outcobra.server.data.loaders.SubjectDataLoader.Companion.MATHS
import outcobra.server.data.loaders.SubjectDataLoader.Companion.OOP
import outcobra.server.data.loaders.SubjectDataLoader.Companion.OOP_DESIGN
import outcobra.server.data.loaders.SubjectDataLoader.Companion.PHYSICS
import outcobra.server.data.loaders.SubjectDataLoader.Companion.PROJECT
import outcobra.server.data.loaders.SubjectDataLoader.Companion.SCRUM
import outcobra.server.model.domain.Mark
import outcobra.server.model.domain.MarkGroup
import outcobra.server.model.domain.MarkValue
import outcobra.server.model.domain.Subject
import outcobra.server.model.repository.MarkGroupRepository
import outcobra.server.model.repository.MarkValueRepository
import outcobra.server.model.repository.SubjectRepository
import java.util.*
import javax.inject.Inject

/**
 * @author Florian Bürgi
 * @since 1.2.0
 */
@Component
@Order(MARK)
class MarkDataLoader @Inject constructor(val markValueRepository: MarkValueRepository,
                                         val markGroupRepository: MarkGroupRepository,
                                         val subjectRepository: SubjectRepository) : DataLoader {

    private val LOGGER = LoggerFactory.getLogger(MarkDataLoader::class.java)

    companion object {
        lateinit var MARK1: Mark
        lateinit var MARK2: Mark
        lateinit var MARK3: Mark
        lateinit var SUBGROUP1: MarkGroup

        lateinit var MARK_GROUP_SUBJ: MarkGroup
        private val random = Random()

        fun getRandomWeight(): Double = getRandomDouble(0.2, 2, 4)

        fun getRandomMark(): Double {
            var mark = getRandomDouble(1.0, 6)
            if (mark <= 4.0) {
                mark += 1
            }
            return mark
        }

        private fun getRandomDouble(min: Double, max: Int, fraction: Int = 2): Double {
            val double = min + (max - min) * random.nextDouble()
            return Math.round(double * fraction).toDouble() / fraction
        }
    }

    override fun shouldLoad(): Boolean = true

    override fun load() {
        listOf(SCRUM, OOP, GUP, PHYSICS, OOP_DESIGN, PROJECT, MATHS, GERMAN, DATABASES)
                .forEach { saveMarksForSemester(it) }
    }

    private fun saveMarksForSemester(subject: Subject) {
        MARK_GROUP_SUBJ = MarkGroup("${subject.name} mark", 1.0, null, mutableListOf(), subject)
        MARK_GROUP_SUBJ = markGroupRepository.save(MARK_GROUP_SUBJ)
        subject.markGroup = MARK_GROUP_SUBJ
        subjectRepository.save(subject)
        SUBGROUP1 = markGroupRepository.save(MarkGroup("subgroup", 0.5, MARK_GROUP_SUBJ, mutableListOf(), subject))
        MARK1 = markValueRepository.save(MarkValue(getRandomMark(), getRandomWeight(), MARK_GROUP_SUBJ, "mark1", null))
        MARK2 = markValueRepository.save(MarkValue(getRandomMark(), getRandomWeight(), SUBGROUP1, "mark2", null))
        MARK3 = markValueRepository.save(MarkValue(getRandomMark(), getRandomWeight(), SUBGROUP1, "mark3", null))
        LOGGER.debug("saved marks for subject ${subject.name}")

    }
}