package outcobra.server.model.domain

import com.querydsl.core.annotations.QueryInit
import javax.persistence.CascadeType
import javax.persistence.Entity
import javax.persistence.ManyToOne

@Entity
data class SchoolClassSemesterSubject(
        @ManyToOne(cascade = [CascadeType.ALL]) @QueryInit("semester")
        val schoolClassSemester: SchoolClassSemester = SchoolClassSemester(),
        @ManyToOne @QueryInit("user") val subject: Subject = Subject()) : AbstractEntity()