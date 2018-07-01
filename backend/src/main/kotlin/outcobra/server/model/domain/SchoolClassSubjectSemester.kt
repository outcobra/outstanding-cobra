package outcobra.server.model.domain

import javax.persistence.Entity
import javax.persistence.ManyToOne

@Entity
data class SchoolClassSubjectSemester(@ManyToOne
                                      val schoolClass: SchoolClass? = null,

                                      @ManyToOne
                                      val subject: Subject? = null,

                                      @ManyToOne
                                      val semester: Semester? = null) : AbstractEntity()