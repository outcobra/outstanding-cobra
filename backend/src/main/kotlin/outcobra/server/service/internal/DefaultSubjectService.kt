package outcobra.server.service.internal

import com.querydsl.jpa.JPAExpressions
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import outcobra.server.model.domain.*
import outcobra.server.model.dto.SubjectDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.interfaces.OutcobraDto
import outcobra.server.model.repository.MarkGroupRepository
import outcobra.server.model.repository.SubjectRepository
import outcobra.server.service.SemesterService
import outcobra.server.service.SubjectService
import outcobra.server.service.UserService
import outcobra.server.service.base.internal.DefaultBaseService
import outcobra.server.validator.RequestValidator
import javax.inject.Inject


@Service
@Transactional
class DefaultSubjectService
@Inject constructor(mapper: Mapper<Subject, SubjectDto>,
                    repository: SubjectRepository,
                    requestValidator: RequestValidator<OutcobraDto>,
                    val userService: UserService,
                    val semesterService: SemesterService,
                    val markGroupRepository: MarkGroupRepository) : SubjectService,
        DefaultBaseService<Subject, SubjectDto, SubjectRepository>(mapper,
                repository,
                requestValidator,
                Subject::class) {

    override fun readAllByCurrentSemester(): List<SubjectDto> {
        val currentSemesters = semesterService.getCurrentSemester()
        return currentSemesters.flatMap { readAllBySemester(it.id) }
    }

    override fun readAllByUser(): List<SubjectDto> {
        val userId = userService.getCurrentUser().id
        val filter = QSubject.subject.user.id.eq(userId)
        return repository.findAll(filter).map { mapper.toDto(it) }
    }

    override fun readAllBySemester(semesterId: Long): List<SubjectDto> {
        requestValidator.validateRequestById(semesterId, Semester::class)
        val filter = QSubject.subject.schoolClassSemesterSubjects.any().schoolClassSemester.semester.id.eq(semesterId)
        return repository.findAll(filter).map { mapper.toDto(it) }
    }

    override fun readAllBySchoolClass(schoolClassId: Long): List<SubjectDto> {
        requestValidator.validateRequestById(schoolClassId, SchoolClass::class)
        val filter = QSubject.subject.schoolClassSemesterSubjects.any().schoolClassSemester.schoolClass.id.eq(schoolClassId)
        return repository.findAll(filter).map { mapper.toDto(it) }
    }

    override fun readAllBySchoolClassAndSemester(schoolClassId: Long, semesterId: Long): List<SubjectDto> {
        requestValidator.validateRequestById(schoolClassId, SchoolClass::class)
        requestValidator.validateRequestById(semesterId, Semester::class)

        val qSchoolClassSemester = QSchoolClassSemester.schoolClassSemester


        val filter = QSubject.subject.schoolClassSemesterSubjects.any().schoolClassSemester
                .`in`(JPAExpressions.selectFrom(qSchoolClassSemester)
                        .where(
                                qSchoolClassSemester.schoolClass.id.eq(schoolClassId)
                                        .and(qSchoolClassSemester.semester.id.eq(semesterId))
                        )
                )

        return repository.findAll(filter)
                .map { mapper.toDto(it) }
    }

    override fun save(dto: SubjectDto): SubjectDto {
        requestValidator.validateRequestByDto(dto)
        var subject = mapper.fromDto(dto)
        subject = repository.save(subject)

        if (dto.id == 0L) {
            /*val markGroup = MarkGroup(schoolClassSemesterSubject = subject.schoolClassSemesterSubjects) TODO create Mark Group but for which semester/schoolClass or do we even need to create a mark group here?
            markGroupRepository.save(markGroup)
            subject.markGroups = listOf(markGroup)*/
        }
        return mapper.toDto(subject)
    }
}