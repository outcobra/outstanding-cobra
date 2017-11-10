package outcobra.server.model;


import outcobra.server.model.interfaces.ParentLinked;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

@Entity
public class MarkReportEntry extends AbstractEntity implements ParentLinked {
    @NotNull
    private Double weight;

    @NotNull
    @ManyToOne
    private Subject subject;

    @NotNull
    @ManyToOne
    private MarkReport report;

    //region constructors
    public MarkReportEntry(Long id, Double weight, Subject subject, MarkReport report) {
        this.id = id;
        this.weight = weight;
        this.subject = subject;
        this.report = report;
    }

    public MarkReportEntry() {
    }
    //endregion

    //region default functions
    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public Subject getSubject() {
        return subject;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }

    public MarkReport getReport() {
        return report;
    }

    public void setReport(MarkReport report) {
        this.report = report;
    }

    @SuppressWarnings("SimplifiableIfStatement")
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof MarkReportEntry)) return false;

        MarkReportEntry that = (MarkReportEntry) o;

        if (!getId().equals(that.getId())) return false;
        if (getWeight() != null ? !getWeight().equals(that.getWeight()) : that.getWeight() != null)
            return false;
        if (getSubject() != null ? !getSubject().equals(that.getSubject()) : that.getSubject() != null)
            return false;
        return getReport() != null ? getReport().equals(that.getReport()) : that.getReport() == null;

    }

    @Override
    public int hashCode() {
        int result = getId().hashCode();
        result = 31 * result + (getWeight() != null ? getWeight().hashCode() : 0);
        result = 31 * result + (getSubject() != null ? getSubject().hashCode() : 0);
        result = 31 * result + (getReport() != null ? getReport().hashCode() : 0);
        return result;
    }

    @Override
    public ParentLinked getParent() {
        return report;
    }
    //endregion
}
