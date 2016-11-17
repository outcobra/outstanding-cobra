package outcobra.server.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import outcobra.server.model.interfaces.ParentLinked;

@Entity
public class SchoolYear implements ParentLinked {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private LocalDate validFrom, validTo;

    @ManyToOne
    private SchoolClass schoolClass;

    @OneToMany(mappedBy = "schoolYear")
    private List<Holiday> holidays;

    @OneToMany(mappedBy = "schoolYear")
    private List<Semester> semesters;

    //region constructors

    public SchoolYear(String name, LocalDate validFrom, LocalDate validTo, SchoolClass schoolClass,
                      List<Holiday> holidays, List<Semester> semesters) {
        this.name = name;
        this.validFrom = validFrom;
        this.validTo = validTo;
        this.schoolClass = schoolClass;
        this.holidays = holidays;
        this.semesters = semesters;
    }

    public SchoolYear() {
        this.semesters = new ArrayList<>();
        this.holidays = new ArrayList<>();
    }

    //endregion

    //region default functions

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getValidFrom() {
        return validFrom;
    }

    public void setValidFrom(LocalDate validFrom) {
        this.validFrom = validFrom;
    }

    public LocalDate getValidTo() {
        return validTo;
    }

    public void setValidTo(LocalDate validTo) {
        this.validTo = validTo;
    }

    public SchoolClass getSchoolClass() {
        return schoolClass;
    }

    public void setSchoolClass(SchoolClass schoolClass) {
        this.schoolClass = schoolClass;
    }

    public List<Holiday> getHolidays() {
        return holidays;
    }

    public void setHolidays(List<Holiday> holidays) {
        this.holidays = holidays;
    }

    public List<Semester> getSemesters() {
        return semesters;
    }

    public void setSemesters(List<Semester> semesters) {
        this.semesters = semesters;
    }

    @SuppressWarnings("SimplifiableIfStatement")
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof SchoolYear)) return false;

        SchoolYear that = (SchoolYear) o;

        if (!id.equals(that.id)) return false;
        if (name != null ? !name.equals(that.name) : that.name != null) return false;
        if (validFrom != null ? !validFrom.equals(that.validFrom) : that.validFrom != null)
            return false;
        if (validTo != null ? !validTo.equals(that.validTo) : that.validTo != null) return false;
        if (schoolClass != null ? !schoolClass.equals(that.schoolClass) : that.schoolClass != null)
            return false;
        if (holidays != null ? !holidays.equals(that.holidays) : that.holidays != null)
            return false;
        return semesters != null ? semesters.equals(that.semesters) : that.semesters == null;

    }

    @Override
    public int hashCode() {
        int result = id.hashCode();
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (validFrom != null ? validFrom.hashCode() : 0);
        result = 31 * result + (validTo != null ? validTo.hashCode() : 0);
        result = 31 * result + (schoolClass != null ? schoolClass.hashCode() : 0);
        result = 31 * result + (holidays != null ? holidays.hashCode() : 0);
        result = 31 * result + (semesters != null ? semesters.hashCode() : 0);
        return result;
    }

    @Override
    public ParentLinked getParent() {
        return schoolClass;
    }
    //endregion
}
