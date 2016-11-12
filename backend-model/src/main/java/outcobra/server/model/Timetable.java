package outcobra.server.model;

import outcobra.server.model.dto.TimetableDto;
import outcobra.server.model.interfaces.Mapper;
import outcobra.server.model.interfaces.OutcobraEntity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Timetable implements OutcobraEntity<Timetable, TimetableDto> {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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
    public boolean verifyOwner(String owner) {
        return false;
    }

    @Override
    public TimetableDto toDto() {
        return getMapper().toDto(this);
    }

    @Override
    public Mapper<Timetable, TimetableDto> getMapper() {
        return null;
    }
    //endregion
}
