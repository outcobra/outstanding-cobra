package outcobra.server.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import outcobra.server.model.interfaces.ParentLinked;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public abstract class Mark implements ParentLinked {
    @NotNull
    protected Double weight;
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    protected Long id;
    @OneToOne(mappedBy = "mark")
    protected Exam exam;
    @NotNull
    protected String description;

    @ManyToOne
    protected MarkGroup markGroup;

    //region constructors
    public Mark(Double weight, Exam exam, MarkGroup markGroup, String description) {
        this.weight = weight;
        this.exam = exam;
        this.markGroup = markGroup;
        this.description = description;
    }

    public Mark() {
        this.weight = 0.0;
    }
    //endregion

    //region default functions
    public abstract double getValue();

    public abstract double getWeight();

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Exam getExam() {
        return exam;
    }

    public void setExam(Exam exam) {
        this.exam = exam;
    }

    public MarkGroup getMarkGroup() {
        return markGroup;
    }

    public void setMarkGroup(MarkGroup markGroup) {
        this.markGroup = markGroup;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Mark)) return false;

        Mark mark = (Mark) o;

        if (getWeight() != mark.getWeight()) return false;
        if (!getId().equals(mark.getId())) return false;
        if (getExam() != null ? !getExam().equals(mark.getExam()) : mark.getExam() != null) return false;
        if (!getDescription().equals(mark.getDescription())) return false;
        return getMarkGroup() != null ? getMarkGroup().equals(mark.getMarkGroup()) : mark.getMarkGroup() == null;
    }

    @Override
    public int hashCode() {
        int result = Double.valueOf(getWeight()).hashCode();
        result = 31 * result + getId().hashCode();
        result = 31 * result + (getExam() != null ? getExam().hashCode() : 0);
        result = 31 * result + (getDescription() != null ? description.hashCode() : 0);
        result = 31 * result + (getMarkGroup() != null ? getMarkGroup().hashCode() : 0);
        return result;
    }

    //endregion
}
