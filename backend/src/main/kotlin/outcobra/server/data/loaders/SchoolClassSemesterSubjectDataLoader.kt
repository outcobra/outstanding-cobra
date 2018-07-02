package outcobra.server.data.loaders

import org.slf4j.LoggerFactory
import org.springframework.core.annotation.Order
import org.springframework.stereotype.Component
import outcobra.server.data.DataLoadOrder.SCHOOL_CLASS_SEMESTER_SUBJECT
import outcobra.server.data.loaders.SchoolClassDataLoader.Companion.BMSI2014_5A
import outcobra.server.data.loaders.SchoolClassDataLoader.Companion.BMSI2014_5C
import outcobra.server.data.loaders.SchoolClassDataLoader.Companion.INF2014_5G
import outcobra.server.data.loaders.SchoolClassDataLoader.Companion.INF2014_5K
import outcobra.server.data.loaders.SemesterDataLoader.Companion.SEMESTER2016_1
import outcobra.server.data.loaders.SemesterDataLoader.Companion.SEMESTER2016_2
import outcobra.server.data.loaders.SemesterDataLoader.Companion.SEMESTER2017_1
import outcobra.server.data.loaders.SemesterDataLoader.Companion.SEMESTER2017_2
import outcobra.server.data.loaders.SemesterDataLoader.Companion.SEMESTER2018_1
import outcobra.server.data.loaders.SemesterDataLoader.Companion.SEMESTER2018_2
import outcobra.server.data.loaders.SubjectDataLoader.Companion.DATABASES
import outcobra.server.data.loaders.SubjectDataLoader.Companion.GERMAN
import outcobra.server.data.loaders.SubjectDataLoader.Companion.GUP
import outcobra.server.data.loaders.SubjectDataLoader.Companion.MATHS
import outcobra.server.data.loaders.SubjectDataLoader.Companion.OOP
import outcobra.server.data.loaders.SubjectDataLoader.Companion.OOP_DESIGN
import outcobra.server.data.loaders.SubjectDataLoader.Companion.PHYSICS
import outcobra.server.data.loaders.SubjectDataLoader.Companion.PROJECT
import outcobra.server.data.loaders.SubjectDataLoader.Companion.SCRUM
import outcobra.server.model.domain.*
import outcobra.server.model.repository.SchoolClassSemesterSubjectRepository

@Component
@Order(SCHOOL_CLASS_SEMESTER_SUBJECT)
class SchoolClassSemesterSubjectDataLoader(val schoolClassSemesterSubjectRepository: SchoolClassSemesterSubjectRepository) : DataLoader {
    companion object {
        lateinit var INF5G_SCRUM_2016_1: SchoolClassSemesterSubject
        lateinit var INF5K_SCRUM_2016_1: SchoolClassSemesterSubject
        lateinit var INF5G_OOP_2016_2: SchoolClassSemesterSubject
        lateinit var INF5K_OOP_2016_2: SchoolClassSemesterSubject
        lateinit var INF5G_OOP_DESIGN_2016_2: SchoolClassSemesterSubject
        lateinit var INF5K_OOP_DESIGN_2016_2: SchoolClassSemesterSubject
        lateinit var INF5K_PROJECT_2017_2: SchoolClassSemesterSubject
        lateinit var INF5K_DATABASES_2016_2: SchoolClassSemesterSubject
        lateinit var BMS5C_PHYSICS_2017_1: SchoolClassSemesterSubject
        lateinit var BMS5C_GERMAN_2017_1: SchoolClassSemesterSubject
        lateinit var BMS5A_GUP_2018_1: SchoolClassSemesterSubject
        lateinit var BMS5A_MATHS_2018_2: SchoolClassSemesterSubject

        private val LOGGER = LoggerFactory.getLogger(SchoolClassSemesterSubjectDataLoader::class.java)
    }

    override fun shouldLoad() = true

    override fun load() {
        INF5G_SCRUM_2016_1 = save(INF2014_5G, SCRUM, SEMESTER2016_1)
        INF5K_SCRUM_2016_1 = save(INF2014_5K, SCRUM, SEMESTER2016_1)

        INF5G_OOP_2016_2 = save(INF2014_5G, OOP, SEMESTER2016_2)
        INF5K_OOP_2016_2 = save(INF2014_5K, OOP, SEMESTER2016_2)

        INF5G_OOP_DESIGN_2016_2 = save(INF2014_5G, OOP_DESIGN, SEMESTER2016_2)
        INF5K_OOP_DESIGN_2016_2 = save(INF2014_5K, OOP_DESIGN, SEMESTER2016_2)

        INF5K_PROJECT_2017_2 = save(INF2014_5K, PROJECT, SEMESTER2017_2)

        INF5K_DATABASES_2016_2 = save(INF2014_5K, DATABASES, SEMESTER2018_2)

        BMS5C_PHYSICS_2017_1 = save(BMSI2014_5C, PHYSICS, SEMESTER2017_1)

        BMS5C_GERMAN_2017_1 = save(BMSI2014_5C, GERMAN, SEMESTER2017_1)

        BMS5A_GUP_2018_1 = save(BMSI2014_5A, GUP, SEMESTER2018_1)
        BMS5A_MATHS_2018_2 = save(BMSI2014_5A, MATHS,  SEMESTER2018_2)
    }

    private fun save(schoolClass: SchoolClass, subject: Subject, semester: Semester): SchoolClassSemesterSubject {
        val scss = SchoolClassSemesterSubject(SchoolClassSemester(schoolClass, semester), subject)

        LOGGER.debug("Saved SchoolClassSemesterSubject for subject ${scss.subject.name} and school class ${scss.schoolClassSemester.schoolClass.normalizedName} and semester ${scss.schoolClassSemester.semester.name}")
        return schoolClassSemesterSubjectRepository.save(scss)
    }
}