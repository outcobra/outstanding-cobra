package outcobra.server.model;

import outcobra.server.model.interfaces.ParentLinked;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import java.util.List;


@Entity
public class MarkReport extends AbstractEntity implements ParentLinked {
    @NotNull
    private String name;

    @NotNull
    @ManyToOne
    private Semester semester;

    @OneToMany(mappedBy = "report")
    private List<MarkReportEntry> entries;

    //region constructors
    public MarkReport(String name, Semester semester, List<MarkReportEntry> entries) {
        this.name = name;
        this.semester = semester;
        this.entries = entries;
    }

    public MarkReport() {
    }
    //endregion

    //region default functions
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Semester getSemester() {
        return semester;
    }

    public void setSemester(Semester semester) {
        this.semester = semester;
    }

    public List<MarkReportEntry> getEntries() {
        return entries;
    }

    public void setEntries(List<MarkReportEntry> entries) {
        this.entries = entries;
    }

    @SuppressWarnings("SimplifiableIfStatement")
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof MarkReport)) return false;

        MarkReport that = (MarkReport) o;

        if (!id.equals(that.id)) return false;
        if (name != null ? !name.equals(that.name) : that.name != null) return false;
        if (semester != null ? !semester.equals(that.semester) : that.semester != null)
            return false;
        return entries != null ? entries.equals(that.entries) : that.entries == null;
    }

    @Override
    public int hashCode() {
        int result = id.hashCode();
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (semester != null ? semester.hashCode() : 0);
        result = 31 * result + (entries != null ? entries.hashCode() : 0);
        return result;
    }

    @Override
    public ParentLinked getParent() {
        return semester;
    }
    //endregion
}
