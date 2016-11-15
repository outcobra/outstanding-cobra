package outcobra.server.service.internal

import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import outcobra.server.model.QSchoolYear
import outcobra.server.model.Semester
import outcobra.server.model.dto.SemesterDto
import outcobra.server.model.mapper.Mapper
import outcobra.server.model.repository.SemesterRepository
import outcobra.server.service.SemesterService
import outcobra.server.service.UserService
import javax.inject.Inject

/**
 * Created by Florian on 13.11.2016.
 */
@Component
@Transactional
open class DefaultSemesterService @Inject constructor(val repository: SemesterRepository,
                                                      val mapper: Mapper<Semester, SemesterDto>,
                                                      val userService: UserService) : SemesterService {


    override fun createSemester(semesterDto: SemesterDto): SemesterDto {
        var semester = mapper.fromDto(semesterDto)
        semester = repository.save(semester)
        return mapper.toDto(semester)
    }

    override fun readSemesterById(id: Long): SemesterDto {
        return mapper.toDto(repository.findOne(id))
    }

    override fun readAllSemestersBySchoolYear(schoolYearId: Long): List<SemesterDto> {
        val qSchoolYear = QSchoolYear.schoolYear
        val qUserId = qSchoolYear.schoolClass.institution.user.auth0Id
        val filter = qSchoolYear.id.eq(schoolYearId).and(qUserId.eq(userService.getCurrentUserDto().userId))
        return repository.findAll(filter).map { entity -> mapper.toDto(entity) }
    }

    override fun updateSemester(semesterDto: SemesterDto): SemesterDto {
        var semester = mapper.fromDto(semesterDto)
        semester = repository.save(semester)
        return mapper.toDto(semester)
    }

    override fun deleteSemester(id: Long) {
        repository.delete(id)
    }

}