package outcobra.server.model;

import outcobra.server.model.interfaces.ParentLinked;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Timetable extends AbstractEntity implements ParentLinked {
    @NotNull
    @OneToOne(mappedBy = "timetable")
    private Semester semester;

    @OneToMany(mappedBy = "timetable")
    private List<TimetableEntry> entries;

    //region constructors
    public Timetable(Semester semester, List<TimetableEntry> entries) {
        this.semester = semester;
        this.entries = entries;
    }

    public Timetable() {
        this.entries = new ArrayList<>();
    }
    //endregion

    //region default functions
    public Semester getSemester() {
        return semester;
    }

    public void setSemester(Semester semester) {
        this.semester = semester;
    }

    public List<TimetableEntry> getEntries() {
        return entries;
    }

    public void setEntries(List<TimetableEntry> entries) {
        this.entries = entries;
    }

    @SuppressWarnings("SimplifiableIfStatement")
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Timetable)) return false;

        Timetable timetable = (Timetable) o;

        if (!getId().equals(timetable.getId())) return false;
        if (getSemester() != null ? !getSemester().equals(timetable.getSemester()) : timetable.getSemester() != null)
            return false;
        return getEntries() != null ? getEntries().equals(timetable.getEntries()) : timetable.getEntries() == null;

    }

    @Override
    public int hashCode() {
        int result = getId().hashCode();
        result = 31 * result + (getSemester() != null ? getSemester().hashCode() : 0);
        result = 31 * result + (getEntries() != null ? getEntries().hashCode() : 0);
        return result;
    }

    @Override
    public ParentLinked getParent() {
        return semester;
    }
    //endregion
}
