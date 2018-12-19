package outcobra.server.model.domain

import com.querydsl.core.annotations.QueryInit
import outcobra.server.model.interfaces.ParentLinked
import java.time.LocalDate
import javax.persistence.Entity
import javax.persistence.ManyToOne
import javax.validation.constraints.NotNull

@Entity
data class Task(@NotNull var name: String = "",
                var description: String = "",
                var todoDate: LocalDate = LocalDate.now(),
                var dueDate: LocalDate = LocalDate.now(),
                var effort: Int = 0,
                var progress: Int = 0,

                @ManyToOne
                @QueryInit("schoolClassSemester.semester", "subject.user")
                var schoolClassSemesterSubject: SchoolClassSemesterSubject = SchoolClassSemesterSubject())
    : ParentLinked, AbstractEntity() {

    override val parent: ParentLinked?
        get() = schoolClassSemesterSubject.subject
}