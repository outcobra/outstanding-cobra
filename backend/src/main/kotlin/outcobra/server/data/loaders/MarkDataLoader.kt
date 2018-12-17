package outcobra.server.data.loaders

import org.slf4j.LoggerFactory
import org.springframework.core.annotation.Order
import org.springframework.stereotype.Component
import outcobra.server.data.DataLoadOrder.MARK
import outcobra.server.data.loaders.SchoolClassSemesterSubjectDataLoader.Companion.BMS5A_GUP_2018_1
import outcobra.server.data.loaders.SchoolClassSemesterSubjectDataLoader.Companion.BMS5A_MATHS_2018_2
import outcobra.server.data.loaders.SchoolClassSemesterSubjectDataLoader.Companion.BMS5C_GERMAN_2017_1
import outcobra.server.data.loaders.SchoolClassSemesterSubjectDataLoader.Companion.BMS5C_PHYSICS_2017_1
import outcobra.server.data.loaders.SchoolClassSemesterSubjectDataLoader.Companion.INF5G_OOP_2016_2
import outcobra.server.data.loaders.SchoolClassSemesterSubjectDataLoader.Companion.INF5G_OOP_DESIGN_2016_2
import outcobra.server.data.loaders.SchoolClassSemesterSubjectDataLoader.Companion.INF5G_SCRUM_2016_1
import outcobra.server.data.loaders.SchoolClassSemesterSubjectDataLoader.Companion.INF5K_DATABASES_2016_2
import outcobra.server.data.loaders.SchoolClassSemesterSubjectDataLoader.Companion.INF5K_OOP_2016_2
import outcobra.server.data.loaders.SchoolClassSemesterSubjectDataLoader.Companion.INF5K_OOP_DESIGN_2016_2
import outcobra.server.data.loaders.SchoolClassSemesterSubjectDataLoader.Companion.INF5K_PROJECT_2017_2
import outcobra.server.data.loaders.SchoolClassSemesterSubjectDataLoader.Companion.INF5K_SCRUM_2016_1
import outcobra.server.model.domain.Mark
import outcobra.server.model.domain.MarkGroup
import outcobra.server.model.domain.MarkValue
import outcobra.server.model.domain.SchoolClassSemesterSubject
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

    override fun count(): Long = markGroupRepository.count()

    override fun load() {
        listOf(INF5G_SCRUM_2016_1,
                INF5K_SCRUM_2016_1,
                INF5G_OOP_2016_2,
                INF5K_OOP_2016_2,
                INF5G_OOP_DESIGN_2016_2,
                INF5K_OOP_DESIGN_2016_2,
                INF5K_PROJECT_2017_2,
                INF5K_DATABASES_2016_2,
                BMS5C_PHYSICS_2017_1,
                BMS5C_GERMAN_2017_1,
                BMS5A_GUP_2018_1,
                BMS5A_MATHS_2018_2)
                .forEach { saveMarksForSemester(it) }
    }

    private fun saveMarksForSemester(schoolClassSemesterSubject: SchoolClassSemesterSubject) {
        MARK_GROUP_SUBJ = MarkGroup("${schoolClassSemesterSubject.subject.name} mark", 1.0, null, mutableListOf(), schoolClassSemesterSubject)
        MARK_GROUP_SUBJ = markGroupRepository.save(MARK_GROUP_SUBJ)
        SUBGROUP1 = markGroupRepository.save(MarkGroup("subgroup", 0.5, MARK_GROUP_SUBJ, mutableListOf(), schoolClassSemesterSubject))
        MARK1 = markValueRepository.save(MarkValue(getRandomMark(), getRandomWeight(), MARK_GROUP_SUBJ, "mark1", null))
        MARK2 = markValueRepository.save(MarkValue(getRandomMark(), getRandomWeight(), SUBGROUP1, "mark2", null))
        MARK3 = markValueRepository.save(MarkValue(getRandomMark(), getRandomWeight(), SUBGROUP1, "mark3", null))
        LOGGER.debug("saved marks for subject ${schoolClassSemesterSubject.subject.name} of school class ${schoolClassSemesterSubject.schoolClassSemester.schoolClass.normalizedName} in semester ${schoolClassSemesterSubject.schoolClassSemester.semester.name}")

    }
}