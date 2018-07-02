package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.domain.SchoolClassSemester
import outcobra.server.model.domain.SchoolClassSemesterSubject
import outcobra.server.model.dto.*
import outcobra.server.model.interfaces.Mapper

@Component
class SchoolClassSubjectSemesterMapper(val schoolClassMapper: SchoolClassMapper,
                                       val subjectMapper: SubjectMapper,
                                       val semesterMapper: SemesterMapper) : Mapper<SchoolClassSemesterSubject, SchoolClassSemesterSubjectDto> {
    override fun fromDto(from: SchoolClassSemesterSubjectDto): SchoolClassSemesterSubject {
        return SchoolClassSemesterSubject(
                SchoolClassSemester(
                        schoolClassMapper.fromDto(from.schoolClass),
                        semesterMapper.fromDto(from.semester)
                ),
                subjectMapper.fromDto(from.subject)
        )
    }

    override fun toDto(from: SchoolClassSemesterSubject): SchoolClassSemesterSubjectDto {
        return SimpleSchoolClassSemesterSubjectDto(
                schoolClassMapper.toDto(from.schoolClassSemester.schoolClass),
                subjectMapper.toDto(from.subject),
                semesterMapper.toDto(from.schoolClassSemester.semester)
        )
    }

    fun toDtoTriple(from: SchoolClassSemesterSubject): Triple<SchoolClassDto, SubjectDto, SemesterDto> {
        return Triple(
                schoolClassMapper.toDto(from.schoolClassSemester.schoolClass),
                subjectMapper.toDto(from.subject),
                semesterMapper.toDto(from.schoolClassSemester.semester)
        )
    }
}