package outcobra.server.model.domain

import com.querydsl.core.annotations.QueryInit
import javax.persistence.CascadeType
import javax.persistence.Entity
import javax.persistence.ManyToOne
import javax.persistence.OneToMany

@Entity
data class SchoolClassSemester(@ManyToOne
                               val schoolClass: SchoolClass = SchoolClass(),

                               @ManyToOne
                               @QueryInit("schoolYear", "timetable")
                               val semester: Semester = Semester(),

                               @OneToMany(mappedBy = "schoolClassSemester", cascade = [CascadeType.MERGE, CascadeType.PERSIST])
                               val subjects: List<SchoolClassSemesterSubject> = listOf()) : AbstractEntity()