package outcobra.server.model

import outcobra.server.model.interfaces.ParentLinked
import java.time.LocalTime
import javax.persistence.Entity
import javax.persistence.EnumType
import javax.persistence.Enumerated
import javax.persistence.ManyToOne
import javax.validation.constraints.Min
import javax.validation.constraints.NotNull



/**
 * @author Florian Bürgi
 * @since <since>
 * @param repeatEveryNWeeks value needs to be >=1
 * if a subject takes place more than once a week, there are multiples TimeTableEntries
 */
@Entity
data class TimetableEntry(@NotNull @Enumerated(EnumType.STRING) var weekDay: WeekDay = WeekDay.MONDAY,
                          @NotNull var time: LocalTime? = LocalTime.of(8, 0),
                          @Min(1) @NotNull var repeatEveryNWeeks: Int = 1,
                          var room: String? = "",
                          @ManyToOne var timetable: Timetable? = null,
                          @ManyToOne var subject: Subject? = null)
    : AbstractEntity(), ParentLinked {

    override val parent: ParentLinked?
        get() = timetable

}