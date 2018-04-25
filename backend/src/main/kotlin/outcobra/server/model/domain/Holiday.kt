package outcobra.server.model.domain

import outcobra.server.model.interfaces.ParentLinked
import java.time.LocalDate
import javax.persistence.Entity
import javax.persistence.ManyToOne
import javax.validation.constraints.NotNull

@Entity
data class Holiday(@NotNull var name: String? = null,
                   @NotNull var validFrom: LocalDate = LocalDate.now(),
                   @NotNull var validTo: LocalDate = LocalDate.now(),
                   @ManyToOne var schoolYear: SchoolYear? = null)
    : ParentLinked, AbstractEntity() {

    override val parent: ParentLinked?
        get() = schoolYear
}