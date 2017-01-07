package outcobra.server.service.internal

import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import outcobra.server.model.QSemester
import outcobra.server.model.Semester
import outcobra.server.model.dto.SemesterDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.SemesterRepository
import outcobra.server.service.SemesterService
import outcobra.server.service.UserService
import java.time.LocalDate
import javax.inject.Inject

@Component
@Transactional
open class DefaultSemesterService @Inject constructor(val repository: SemesterRepository,
                                                      val userService: UserService,
                                                      val mapper: Mapper<Semester, SemesterDto>) : SemesterService {

    override fun createSemester(semesterDto: SemesterDto): SemesterDto {
        var semester = mapper.fromDto(semesterDto)
        semester = repository.save(semester)
        return mapper.toDto(semester)
    }

    override fun readSemesterById(id: Long): SemesterDto {
        return mapper.toDto(repository.getOne(id))
    }

    override fun readAllSemestersBySchoolYear(schoolYearId: Long): List<SemesterDto> {
        val filter = QSemester.semester.schoolYear.id.eq(schoolYearId)
        return repository.findAll(filter).map { mapper.toDto(it) }
    }

    override fun updateSemester(semesterDto: SemesterDto): SemesterDto {
        var semester = mapper.fromDto(semesterDto)
        semester = repository.save(semester)
        return mapper.toDto(semester)
    }

    override fun deleteSemester(id: Long) {
        repository.delete(id)
    }

    override fun getCurrentSemester(): SemesterDto? {
        val currentUserId = userService.getCurrentUser()?.id
        val today = LocalDate.now()
        val withCurrentUser = QSemester.semester.schoolYear.schoolClass.institution.user.id.eq(currentUserId)
        val todayBetweenValidFromAndTo = withCurrentUser.and(QSemester.semester.validFrom.loe(today).and(QSemester.semester.validTo.goe(today)))
        try {
            return mapper.toDto(repository.findOne(todayBetweenValidFromAndTo))
        } catch(ex: NullPointerException) {
            return null
        }
    }
}