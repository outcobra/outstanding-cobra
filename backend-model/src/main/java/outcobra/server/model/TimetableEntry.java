package outcobra.server.model;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.time.LocalTime;

@Entity
public class TimetableEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    private WeekDay weekDay;

    @NotNull
    private LocalTime time;

    /**
     * value needs to be >=1
     * if a subject takes place more than once a week
     * there are multiples TimeTableEntries
     */
    @Min(1)
    @NotNull
    private int repeatEveryNWeeks;

    private String room;

    @ManyToOne
    private Timetable timetable;

    @ManyToOne
    private Subject subject;

    //region constructors
    public TimetableEntry(Long id, WeekDay weekDay, LocalTime time, int repeatEveryNWeeks,
                          String room, Timetable timetable, Subject subject) {
        this.id = id;
        this.weekDay = weekDay;
        this.time = time;
        this.repeatEveryNWeeks = repeatEveryNWeeks;
        this.room = room;
        this.timetable = timetable;
        this.subject = subject;
    }

    public TimetableEntry() {
    }

    //endregion

    //region default Functions

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public WeekDay getWeekDay() {
        return weekDay;
    }

    public void setWeekDay(WeekDay weekDay) {
        this.weekDay = weekDay;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public int getRepeatEveryNWeeks() {
        return repeatEveryNWeeks;
    }

    public void setRepeatEveryNWeeks(int repeatEveryNWeeks) {
        this.repeatEveryNWeeks = repeatEveryNWeeks;
    }

    public String getRoom() {
        return room;
    }

    public void setRoom(String room) {
        this.room = room;
    }

    public Timetable getTimetable() {
        return timetable;
    }

    public void setTimetable(Timetable timetable) {
        this.timetable = timetable;
    }

    public Subject getSubject() {
        return subject;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof TimetableEntry)) return false;

        TimetableEntry that = (TimetableEntry) o;

        if (getRepeatEveryNWeeks() != that.getRepeatEveryNWeeks()) return false;
        if (!getId().equals(that.getId())) return false;
        if (getWeekDay() != that.getWeekDay()) return false;
        if (getTime() != null ? !getTime().equals(that.getTime()) : that.getTime() != null)
            return false;
        if (getRoom() != null ? !getRoom().equals(that.getRoom()) : that.getRoom() != null)
            return false;
        if (getTimetable() != null ? !getTimetable().equals(that.getTimetable()) : that.getTimetable() != null)
            return false;
        return getSubject() != null ? getSubject().equals(that.getSubject()) : that.getSubject() == null;

    }

    @Override
    public int hashCode() {
        int result = getId().hashCode();
        result = 31 * result + (getWeekDay() != null ? getWeekDay().hashCode() : 0);
        result = 31 * result + (getTime() != null ? getTime().hashCode() : 0);
        result = 31 * result + getRepeatEveryNWeeks();
        result = 31 * result + (getRoom() != null ? getRoom().hashCode() : 0);
        result = 31 * result + (getTimetable() != null ? getTimetable().hashCode() : 0);
        result = 31 * result + (getSubject() != null ? getSubject().hashCode() : 0);
        return result;
    }

    //endregion
}
