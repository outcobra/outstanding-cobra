package outcobra.server.model.mapper


import org.springframework.stereotype.Component
import outcobra.server.model.domain.SchoolClass
import outcobra.server.model.domain.SchoolClassSemester
import outcobra.server.model.dto.SchoolClassDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.SchoolClassRepository
import outcobra.server.model.repository.SchoolClassSemesterRepository
import outcobra.server.model.repository.SemesterRepository
import outcobra.server.model.repository.UserRepository
import java.util.*
import javax.inject.Inject

/**
 * @author Florian Bürgi
 * @since 1.0.0
 */
@Component
class SchoolClassMapper @Inject constructor(val schoolClassRepository: SchoolClassRepository,
                                            val schoolClassSemesterRepository: SchoolClassSemesterRepository,
                                            val userRepository: UserRepository,
                                            val semesterRepository: SemesterRepository) :
        Mapper<SchoolClass, SchoolClassDto>, BaseMapper() {

    override fun toDto(from: SchoolClass): SchoolClassDto {
        val semesterSubjects = from.schoolClassSemester.map {
            SchoolClassDto.SemesterSubjectDto(it.semester.id,
                    it.subjects.map { sub -> sub.id }
            )
        }
        return SchoolClassDto(from.id, from.user.id, from.normalizedName, semesterSubjects)
    }

    override fun fromDto(from: SchoolClassDto): SchoolClass {
        val user = userRepository.findOne(from.userId)
        val schoolClass = SchoolClass(from.normalizedName, user)

        schoolClass.schoolClassSemester = from.semesterSubjects.map { it.semesterId }
                .distinct()
                .map {
                    Optional.ofNullable(schoolClassSemesterRepository.findOne(it))
                            .orElseGet { SchoolClassSemester(
                                    schoolClassRepository.findOne(from.id) ?: schoolClass,
                                    semesterRepository.findOne(it)
                            ) }
                }.toMutableList()

        schoolClass.id = from.id
        return schoolClass
    }
}