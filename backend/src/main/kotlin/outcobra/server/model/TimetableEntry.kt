package outcobra.server.model

import outcobra.server.model.interfaces.ParentLinked
import java.time.LocalTime
import javax.persistence.*
import javax.validation.constraints.Min
import javax.validation.constraints.NotNull

@Entity
class TimetableEntry : ParentLinked {
    //endregion

    //region default Functions

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    override var id: Long? = null

    @NotNull
    @Enumerated(EnumType.STRING)
    var weekDay: WeekDay? = null

    @NotNull
    var time: LocalTime? = null

    /**
     * value needs to be >=1
     * if a subject takes place more than once a week
     * there are multiples TimeTableEntries
     */
    @Min(1)
    @NotNull
    var repeatEveryNWeeks: Int = 0

    var room: String? = null

    @ManyToOne
    var timetable: Timetable? = null

    @ManyToOne
    var subject: Subject? = null

    override val parent: ParentLinked?
        get() = timetable

    //region constructors
    constructor(id: Long?, weekDay: WeekDay, time: LocalTime, repeatEveryNWeeks: Int,
                room: String, timetable: Timetable, subject: Subject) {
        this.id = id
        this.weekDay = weekDay
        this.time = time
        this.repeatEveryNWeeks = repeatEveryNWeeks
        this.room = room
        this.timetable = timetable
        this.subject = subject
    }

    constructor()

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is TimetableEntry) return false

        val that = other as TimetableEntry?

        if (repeatEveryNWeeks != that!!.repeatEveryNWeeks) return false
        if (id != that.id) return false
        if (weekDay != that.weekDay) return false
        if (if (time != null) time != that.time else that.time != null)
            return false
        if (if (room != null) room != that.room else that.room != null)
            return false
        if (if (timetable != null) timetable != that.timetable else that.timetable != null)
            return false
        return if (subject != null) subject == that.subject else that.subject == null

    }

    override fun hashCode(): Int {
        var result = id!!.hashCode()
        result = 31 * result + if (weekDay != null) weekDay!!.hashCode() else 0
        result = 31 * result + if (time != null) time!!.hashCode() else 0
        result = 31 * result + repeatEveryNWeeks
        result = 31 * result + if (room != null) room!!.hashCode() else 0
        result = 31 * result + if (timetable != null) timetable!!.hashCode() else 0
        result = 31 * result + if (subject != null) subject!!.hashCode() else 0
        return result
    }
    //endregion
}
