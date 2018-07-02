package outcobra.server.model.domain

import javax.persistence.CascadeType
import javax.persistence.Entity
import javax.persistence.ManyToOne

@Entity
data class SchoolClassSemesterSubject(
        @ManyToOne(cascade = [CascadeType.ALL])
        val schoolClassSemester: SchoolClassSemester = SchoolClassSemester(),

        @ManyToOne
        val subject: Subject = Subject()) : AbstractEntity()