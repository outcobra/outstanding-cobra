package outcobra.server.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Semester {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private LocalDate validFrom, validTo;

    @ManyToOne
    @NotNull
    private SchoolYear schoolYear;

    @OneToMany(mappedBy = "semester")
    private List<Subject> subjects;

    @OneToMany(mappedBy = "semester")
    private List<MarkReport> markReports;

    @OneToOne
    private Timetable timetable;

    public Semester(String name, LocalDate validFrom, LocalDate validTo, SchoolYear schoolYear,
                    List<Subject> subjects, List<MarkReport> markReports, Timetable timetable) {
        this.name = name;
        this.validFrom = validFrom;
        this.validTo = validTo;
        this.schoolYear = schoolYear;
        this.subjects = subjects;
        this.markReports = markReports;
        this.timetable = timetable;
    }

    public Semester() {
        this.subjects = new ArrayList<>();
        this.markReports = new ArrayList<>();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Semester)) return false;

        Semester semester = (Semester) o;

        if (!id.equals(semester.id)) return false;
        if (name != null ? !name.equals(semester.name) : semester.name != null) return false;
        if (validFrom != null ? !validFrom.equals(semester.validFrom) : semester.validFrom != null)
            return false;
        if (validTo != null ? !validTo.equals(semester.validTo) : semester.validTo != null)
            return false;
        if (schoolYear != null ? !schoolYear.equals(semester.schoolYear) : semester.schoolYear != null)
            return false;
        if (subjects != null ? !subjects.equals(semester.subjects) : semester.subjects != null)
            return false;
        if (markReports != null ? !markReports.equals(semester.markReports) : semester.markReports != null)
            return false;
        return timetable != null ? timetable.equals(semester.timetable) : semester.timetable == null;

    }

    @Override
    public int hashCode() {
        int result = id.hashCode();
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (validFrom != null ? validFrom.hashCode() : 0);
        result = 31 * result + (validTo != null ? validTo.hashCode() : 0);
        result = 31 * result + (schoolYear != null ? schoolYear.hashCode() : 0);
        result = 31 * result + (subjects != null ? subjects.hashCode() : 0);
        result = 31 * result + (markReports != null ? markReports.hashCode() : 0);
        result = 31 * result + (timetable != null ? timetable.hashCode() : 0);
        return result;
    }
}
