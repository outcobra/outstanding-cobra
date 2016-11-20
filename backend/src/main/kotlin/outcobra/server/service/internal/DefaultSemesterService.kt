package outcobra.server.service.internal

import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import outcobra.server.model.QSemester
import outcobra.server.model.Semester
import outcobra.server.model.dto.SemesterDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.SemesterRepository
import outcobra.server.service.SemesterService
import javax.inject.Inject

@Component
@Transactional
open class DefaultSemesterService @Inject constructor(val repository: SemesterRepository,
                                                      val mapper: Mapper<Semester, SemesterDto>) : SemesterService {

    override fun createSemester(semesterDto: SemesterDto): SemesterDto {
        var semester = mapper.fromDto(semesterDto)
        semester = repository.save(semester)
        return mapper.toDto(semester)
    }

    override fun readSemesterById(id: Long): SemesterDto {
        return mapper.toDto(repository.findOne(id))
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
}