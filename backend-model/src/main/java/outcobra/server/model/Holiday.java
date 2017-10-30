package outcobra.server.model;

import outcobra.server.model.interfaces.ParentLinked;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Entity
public class Holiday extends AbstractEntity implements ParentLinked {
    @NotNull
    private String name;

    @NotNull
    private LocalDate validFrom, validTo;

    @ManyToOne
    private SchoolYear schoolYear;

    //region constructors
    public Holiday(String name, LocalDate validFrom, LocalDate validTo, SchoolYear schoolYear) {
        this.name = name;
        this.validFrom = validFrom;
        this.validTo = validTo;
        this.schoolYear = schoolYear;
    }

    public Holiday() {
    }
    //endregion

    //region default functions
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

    public SchoolYear getSchoolYear() {
        return schoolYear;
    }

    public void setSchoolYear(SchoolYear schoolYear) {
        this.schoolYear = schoolYear;
    }

    @SuppressWarnings("SimplifiableIfStatement")
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Holiday)) return false;

        Holiday holiday = (Holiday) o;

        if (!getId().equals(holiday.getId())) return false;
        if (getName() != null ? !getName().equals(holiday.getName()) : holiday.getName() != null)
            return false;
        if (getValidFrom() != null ? !getValidFrom().equals(holiday.getValidFrom()) : holiday.getValidFrom() != null)
            return false;
        if (getValidTo() != null ? !getValidTo().equals(holiday.getValidTo()) : holiday.getValidTo() != null)
            return false;
        return getSchoolYear() != null ? getSchoolYear().equals(holiday.getSchoolYear()) : holiday.getSchoolYear() == null;

    }

    @Override
    public int hashCode() {
        int result = getId().hashCode();
        result = 31 * result + (getName() != null ? getName().hashCode() : 0);
        result = 31 * result + (getValidFrom() != null ? getValidFrom().hashCode() : 0);
        result = 31 * result + (getValidTo() != null ? getValidTo().hashCode() : 0);
        result = 31 * result + (getSchoolYear() != null ? getSchoolYear().hashCode() : 0);
        return result;
    }

    @Override
    public ParentLinked getParent() {
        return schoolYear;
    }
    //endregion
}
