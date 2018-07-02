package outcobra.server.model.domain

import javax.persistence.Entity
import javax.persistence.ManyToOne
import javax.persistence.OneToMany

@Entity
data class SchoolClassSemester(@ManyToOne
                               val schoolClass: SchoolClass = SchoolClass(),

                               @ManyToOne
                               val semester: Semester = Semester(),

                               @OneToMany
                               val subjects: List<SchoolClassSemesterSubject> = listOf()) : AbstractEntity()